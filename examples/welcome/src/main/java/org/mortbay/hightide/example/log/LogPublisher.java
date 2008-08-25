package org.mortbay.hightide.example.log;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.util.ajax.JSON;

public class LogPublisher
{
    private Bayeux _bayeux;
    private Client _client;
    private String _channelName;
    private String _topicName;

    public class LogMessageListener implements MessageListener
    {
        public void onMessage(Message message)
        {
            //pull out the message text and then forward it on to bayeux
            try
            {
                if (message instanceof TextMessage)
                {
                    send(((TextMessage)message).getText());
                }
            }
            catch (JMSException e)
            {
                e.printStackTrace();
            }
        }
    }


    public LogPublisher(Bayeux bayeux, String logChannelName, String logTopicName)
    {
        _bayeux = bayeux;
        _client=bayeux.newClient("logPublisher");
        _channelName = logChannelName;
        _topicName = logTopicName;

        //open the topic connection factory
        try
        {
            InitialContext ctx = new InitialContext();
            TopicConnectionFactory tcf =
                (TopicConnectionFactory) ctx.lookup("java:comp/env/jms/loggingTopicConnectionFactory");
            TopicConnection connection = tcf.createTopicConnection();
            TopicSession session = connection.createTopicSession(false,
                    Session.AUTO_ACKNOWLEDGE);
            Topic topic = session.createTopic(_topicName);
            TopicSubscriber subscriber = session.createSubscriber(topic);
            subscriber.setMessageListener(new LogMessageListener());
            connection.start();
        }
        catch (JMSException e)
        {
            e.printStackTrace();
        }
        catch (NamingException e)
        {
            e.printStackTrace();
        }
    }

    public void send (String message)
    {
        JSON.Literal literal = new JSON.Literal(message);
        _bayeux.getChannel(_channelName, true).publish(_client,literal,null);
    }
}
