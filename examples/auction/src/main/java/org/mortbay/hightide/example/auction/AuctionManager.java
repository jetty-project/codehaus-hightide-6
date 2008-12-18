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
import javax.jms.TopicPublisher;
import javax.jms.TopicSession;
import javax.jms.TopicSubscriber;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.transaction.UserTransaction;

import org.mortbay.hightide.example.auction.dao.AuctionDao;
import org.mortbay.hightide.example.auction.dao.BidderDao;
import org.mortbay.hightide.example.auction.util.DBUtil;
import org.cometd.Bayeux;
import org.cometd.Client;

/**
 * @author Nigel Canonizado
 *         <p/>
 *         Apr 19, 2006
 */
public class AuctionManager implements MessageListener
{
    public static final String BID_TOPIC_ROOT = "/auction/";
    private final Object lock = new Object();
    private final Map<Integer, TopicConnection> connections = new HashMap<Integer, TopicConnection>();
    private final Map<Integer, TopicSession> sessions = new HashMap<Integer, TopicSession>();
    private final Map<Integer, TopicPublisher> publishers = new HashMap<Integer, TopicPublisher>();
    
    private Bayeux _bayeux;
    private Client _client;
    
    public AuctionManager(Bayeux bayeux)
    {
        _bayeux = bayeux;
        _client = _bayeux.newClient("auction-manager");
    }

    public Bidder registerBidder(String username) throws Exception
    {
        BidderDao bidderDao = new BidderDao();
        bidderDao.addBidder(username);
        //if(bidderDao.addBidder(username))
        //    throw new Exception("Existing user, please choose another username");
        return bidderDao.getBidder(username);
    }

    public Bid addBid(Integer itemId, Double bidAmount, String userName) throws Exception
    {
        AuctionDao auctionDao = new AuctionDao();
        Bid bid = new Bid();
        bid.setAmount(bidAmount);
        bid.setItemId(itemId);
        bid.setBidder(userName);
        UserTransaction ut = null;
        try
        {
            //Atomikos does not do XA for Topics yet, so this won't be atomic
            ut = DBUtil.getUserTransaction();
            ut.begin();

            Bid highestBid = auctionDao.getHighestBid(itemId);
            if ((highestBid != null) && (highestBid.getAmount().compareTo(bidAmount) >= 0))
                throw new Exception("Your bid must be higher than the current bid=" + highestBid.getFormattedAmount());

            // Save the bid in the database
            auctionDao.saveAuctionBid(bid);
            // Publish the bid onto the topic
            publishBidMessage(bid);

            ut.commit();
            return bid;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            if (ut != null) ut.rollback();
            throw e;
        }
    }

    public List getAllBids(Integer itemId) throws Exception
    {
        return new AuctionDao().getAllBids(itemId);
    }

    public Bid getHighestBid(Integer itemId) throws Exception
    {
        return new AuctionDao().getHighestBid(itemId);
    }

    private void publishBidMessage(Bid bid) throws Exception
    {
        Integer itemId = bid.getItemId();
        synchronized (lock)
        {
            TopicConnection connection = connections.get(itemId);
            if (connection == null) initBidTopic(itemId);
        }

        Map<String, Object> message = new HashMap<String, Object>();
        message.put("item", itemId);
        message.put("from", bid.getBidder());
        message.put("amount", bid.getFormattedAmount());
        bayeuxPublish(itemId, message);
        jmsPublish(itemId, message);
    }

    private void initBidTopic(Integer itemId)
    {
        // There is no cleanup of JMS connections, as the demo does not support closing an auction.
        InitialContext ctx = null;
        try
        {
            ctx = openInitialContext();
            TopicConnectionFactory tcf = (TopicConnectionFactory)ctx.lookup("java:comp/env/jms/connectionFactory");
            TopicConnection connection = tcf.createTopicConnection();
            connections.put(itemId, connection);
            // No transactions, auto acknowledge
            TopicSession session = connection.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);
            sessions.put(itemId, session);
            Topic topic = session.createTopic(BID_TOPIC_ROOT + itemId);
            TopicPublisher publisher = session.createPublisher(topic);
            publishers.put(itemId, publisher);
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

    private void bayeuxPublish(Integer itemId, Map<String, Object> message)
    {
        _bayeux.getChannel(BID_TOPIC_ROOT + itemId, true).publish(_client, message, null);
    }

    private void jmsPublish(Integer itemId, Map<String, Object> message)
    {
        try
        {
            TopicSession session = sessions.get(itemId);
            TopicPublisher publisher = publishers.get(itemId);
            MapMessage jmsMessage = session.createMapMessage();
            for (Map.Entry<String, Object> entry : message.entrySet())
                jmsMessage.setObject(entry.getKey(), entry.getValue());
            publisher.publish(jmsMessage);
        }
        catch (JMSException x)
        {
            x.printStackTrace();
        }
    }

    public void onMessage(Message jmsMessage)
    {
        try
        {
            MapMessage mapMessage = (MapMessage)jmsMessage;
            Map<String, Object> message = new HashMap<String, Object>();
            Enumeration<String> e = mapMessage.getMapNames();
            while (e.hasMoreElements())
            {
                String name = e.nextElement();
                message.put(name, mapMessage.getObject(name));
            }
            Integer itemId = mapMessage.getInt("itemId");
            bayeuxPublish(itemId, message);
        }
        catch (JMSException x)
        {
            x.printStackTrace();
        }
    }
}
