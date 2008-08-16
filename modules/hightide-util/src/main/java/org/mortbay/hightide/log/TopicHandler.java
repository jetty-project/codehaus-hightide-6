//========================================================================
//$Id: TopicHandler.java 861 2006-11-26 16:21:38Z janb $
//Copyright 2006 WebTide LLC
//------------------------------------------------------------------------
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//http://www.apache.org/licenses/LICENSE-2.0
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//========================================================================


package org.mortbay.hightide.log;

import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.LogRecord;
import java.util.logging.XMLFormatter;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;
import javax.jms.DeliveryMode;
import javax.jms.JMSException;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.jms.Topic;
import javax.jms.TopicConnection;
import javax.jms.TopicConnectionFactory;
import javax.jms.TopicPublisher;
import javax.jms.TopicSession;
import javax.naming.InitialContext;
import javax.naming.NameNotFoundException;




/**
 * TopicHandler
 * 
 * Publishes log messages onto an ActiveMQ topic.
 *
 */
public class TopicHandler extends Handler
{
    private String topicName;
    private String brokerUrl;
    private String jndiName;
    private TopicSession session;
    private Topic destination;
    private TopicConnection connection;
    volatile private TopicPublisher publisher;
    private boolean running = false;
    
    public TopicHandler ()
    throws JMSException
    {
        configure();
        start();
    }
    
    public TopicHandler (String topicName, String brokerUrl)
    throws JMSException
    {
        this.topicName = topicName;
        this.brokerUrl = brokerUrl;
        start();
    }

    public TopicHandler (String topicName)
    throws JMSException
    {
        this(topicName, "vm://localhost");
    }
    
    public void publish(LogRecord record)
    {
        
        if (!isRunning() || !isLoggable(record) || publisher==null)
            return;
        
        try
        {
            if (record.getLoggerName().equals("org.mortbay.log"))
            {
                //blank out the source class name and method as they will be meaningless
                record.setSourceClassName("");
                record.setSourceMethodName("");
            }
            publishToTopic(getFormatter().format(record));
        }
        catch (JMSException e)
        {
            throw new RuntimeException (e);
        }
    }
    
    public void flush()
    {
    }

 
    public void close() throws SecurityException
    {
        try
        {
            running = false;
            publisher.close();
            session.close();
            connection.close();
        }
        catch (JMSException e)
        {
            //TODO investigate way to ensure queue closes last
            //throw new RuntimeException(e);
        }
        finally
        {
            publisher = null;
            session = null;
            connection = null;
            destination = null;
        }
    }

    public void publishToTopic(String message)
    throws JMSException
    {
        try
        {
            if (!isRunning())
            {
                return;
            }          
            TextMessage textMessage = session.createTextMessage(message);
            if (publisher != null)
                publisher.publish(textMessage);
            
        }
        catch (JMSException e)
        {
            //TODO workaround for ActiveMQ bug
            if (!e.getMessage().startsWith("Peer disconnected"))
                throw e;
        }
    }
    
    public boolean isRunning()
    {
        return running;
    }
    
    private void configure ()
    {
        SystemPropertyLogManager manager = (SystemPropertyLogManager)LogManager.getLogManager();
        
        //get each configuration property we support
        String className = getClass().getName();

        topicName = manager.getStringProperty(className+".topic", "");
        brokerUrl = manager.getStringProperty(className+".brokerUrl", "");
        jndiName = manager.getStringProperty(className+".jndiName", "");
        
        setLevel(manager.getLevelProperty(className + ".level", Level.ALL));
        setFilter(manager.getFilterProperty(className + ".filter", null));
        setFormatter(manager.getFormatterProperty(className + ".formatter", new JSONFormatter()));
    }
    
    private void start ()
    throws JMSException
    {     
        new Thread() {
            public void run ()
            {
                while (!running) 
                {
                    try
                    {
                        TopicConnectionFactory topicConnectionFactory = null;
                        if (!jndiName.equals(""))
                        {
                            try
                            {
                                InitialContext ic = new InitialContext();
                                topicConnectionFactory = (TopicConnectionFactory)ic.lookup(jndiName);
                            }
                            catch (NameNotFoundException e)
                            {
                                //go around the loop again until name is found
                            }
                        }
                        else if (!brokerUrl.equals(""))
                        {
                            topicConnectionFactory = new ActiveMQConnectionFactory(brokerUrl);
                        }
                        
                        if (topicConnectionFactory != null)
                        { 
                            // Create a Connection
                            connection = topicConnectionFactory.createTopicConnection();
                            connection.start();
                            
                            // Create a Session
                            session = connection.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);
                            
                            // Create the destination topic
                            destination = session.createTopic(topicName);
                            
                            // Create a publisher for the Topic
                            TopicPublisher p = session.createPublisher(destination);
                            p.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
                            publisher=p;
                            
                            running = true;
                        }
                        else
                            sleep (2000L);
                    }
                    catch (Exception e)
                    {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }
}
