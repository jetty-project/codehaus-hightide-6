// ========================================================================
// Copyright 2006 Webtide LLC
// ------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ========================================================================


package org.mortbay.hightide.example.auction;


import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jms.JMSException;
import javax.jms.MapMessage;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.cometd.Bayeux;
import org.cometd.Client;

/**
 * Manages chat rooms and chat message delivery.
 * The working of this class is this: for every request issued by a remote client (join, chat or leave), a message
 * is formatted and sent both to the jms topic corrispondent to the chat root and to the bayeux client.
 * The topic subscriber is configured to <strong>not receive</strong> local messages (but only remote ones), and
 * forwards the message to the bayeux client.
 * <br />
 * An alternative solution could have been designed so that for every request issued by a client, a message is
 * sent only to the jms topic, and have the topic subscriber configured to receive local messages.
 * The subscriber is then in charge to send the message to the bayeux client.
 * However, this solution has a race condition during leave: on leave of the last member of room, the subscriber
 * is closed and cannot receive its own message to send to the bayeux client.
 * <br />
 * Further improvements to this implementation are to use a single connection and a single session for all topics.
 */
public class Chat implements MessageListener
{
    private static final String CHAT_TOPIC_ROOT = "/chat/";
    private static volatile Bayeux bayeux;
    private static volatile Client client;
    private final Object lock = new Object();
    private final Map<String, List<String>> roomMembers = new HashMap<String, List<String>>();
    private final Map<String, TopicConnection> connections = new HashMap<String, TopicConnection>();
    private final Map<String, TopicSession> sessions = new HashMap<String, TopicSession>();
    private final Map<String, Topic> topics = new HashMap<String, Topic>();

    public static void setBayeux(Bayeux bayeux)
    {
        Chat.bayeux = bayeux;
        client = bayeux.newClient("chat");
    }

    public void join(String roomId, String username)
    {
        synchronized (lock)
        {
            List<String> members = roomMembers.get(roomId);
            if (members == null)
            {
                members = new ArrayList<String>();
                roomMembers.put(roomId, members);
                // Initialize a JMS topic for the given chat room
                initChatTopic(roomId);
            }
            members.add(username);
            publishJoinMessage(roomId, username);
        }
    }

    private void initChatTopic(String roomId)
    {
        InitialContext ctx = null;
        try
        {
            ctx = openInitialContext();
            TopicConnectionFactory tcf = (TopicConnectionFactory)ctx.lookup("java:comp/env/jms/connectionFactory");
            TopicConnection connection = tcf.createTopicConnection();
            connections.put(roomId, connection);
            // No transactions, auto acknowledge
            TopicSession session = connection.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);
            sessions.put(roomId, session);
            Topic topic = session.createTopic(CHAT_TOPIC_ROOT + roomId);
            topics.put(roomId, topic);
            // The subscriber will not receive messages sent by itself
            TopicSubscriber subscriber = session.createSubscriber(topic, null, true);
            subscriber.setMessageListener(this);
            connection.start();
        }
        catch (Exception x)
        {
            x.printStackTrace();
        }
        finally
        {
            closeInitialContext(ctx);
        }
    }

    private void destroyChatTopic(String roomId)
    {
        try
        {
            topics.remove(roomId);
            sessions.remove(roomId);
            TopicConnection connection = connections.remove(roomId);
            connection.close();
        }
        catch (JMSException x)
        {
            x.printStackTrace();
        }
    }

    private InitialContext openInitialContext() throws NamingException
    {
        return new InitialContext();
    }

    private void closeInitialContext(InitialContext ctx)
    {
        try
        {
            if (ctx != null) ctx.close();
        }
        catch (NamingException ignored)
        {
        }
    }

    private void publishJoinMessage(String roomId, String username)
    {
        Map<String, Object> message = new HashMap<String, Object>();
        message.put("join", "join");
        message.put("roomId", roomId);
        message.put("userId", username);
        bayeuxPublish(roomId, message);
        jmsPublish(roomId, message);
    }

    public void leave(String roomId, String username)
    {
        synchronized (lock)
        {
            List<String> members = roomMembers.get(roomId);
            if (members != null)
            {
                publishLeaveMessage(roomId, username);
                members.remove(username);
                if (members.isEmpty())
                {
                    roomMembers.remove(roomId);
                    destroyChatTopic(roomId);
                }
            }
        }
    }

    private void publishLeaveMessage(String roomId, String username)
    {
        Map<String, Object> message = new HashMap<String, Object>();
        message.put("leave", "leave");
        message.put("roomId", roomId);
        message.put("userId", username);
        bayeuxPublish(roomId, message);
        jmsPublish(roomId, message);
    }

    private void jmsPublish(String roomId, Map<String, Object> message)
    {
        try
        {
            TopicSession session = sessions.get(roomId);
            Topic topic = topics.get(roomId);
            MapMessage jmsMessage = session.createMapMessage();
            for (Map.Entry<String, Object> entry : message.entrySet())
                jmsMessage.setObject(entry.getKey(), entry.getValue());
            session.createPublisher(topic).publish(jmsMessage);
        }
        catch (JMSException x)
        {
            x.printStackTrace();
        }
    }

    public List<String> getMembers (String roomId) throws Exception
    {
        synchronized (lock)
        {
            return new ArrayList<String>(roomMembers.get(roomId));
        }
    }

    public void sendMessage(String roomId, String username, String chatMessage)
    {
        synchronized (lock)
        {
            List<String> members = roomMembers.get(roomId);
            // Perform lazy join if the member does not exist yet
            if (members == null || !members.contains(username)) join(roomId, username);
            publishChatMessage(roomId, username, chatMessage);
        }
    }

    private void publishChatMessage(String roomId, String username, String chatMessage)
    {
        Map<String, Object> message = new HashMap<String, Object>();
        message.put("roomId", roomId);
        message.put("userId", username);
        message.put("chat", chatMessage);
        bayeuxPublish(roomId, message);
        jmsPublish(roomId, message);
    }

    public void onMessage(Message jmsMessage)
    {
        try
        {
            MapMessage mapMessage = (MapMessage)jmsMessage;
            Map<String, Object> message = new HashMap<String, Object>();
            String roomId = mapMessage.getString("roomId");
            if (roomId != null)
            {
                Enumeration<String> e = mapMessage.getMapNames();
                while (e.hasMoreElements())
                {
                    String name = e.nextElement();
                    message.put(name, mapMessage.getObject(name));
                }
                bayeuxPublish(roomId, message);
            }
        }
        catch (JMSException x)
        {
            x.printStackTrace();
        }
    }

    private void bayeuxPublish(String roomId, Map<String, Object> message)
    {
        bayeux.getChannel(CHAT_TOPIC_ROOT + roomId, true).publish(client, message, null);
    }
}
