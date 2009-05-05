package org.mortbay.hightide.example.log;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;

import org.cometd.Bayeux;

public class BayeuxListener implements ServletContextAttributeListener
{
    private static LogPublisher __publisher = null;
    
    public void attributeAdded(ServletContextAttributeEvent event)
    {

        if (event.getName().equals(Bayeux.ATTRIBUTE) && __publisher==null)
        {      
            Bayeux bayeux=(Bayeux)event.getValue();
            String logChannelName = event.getServletContext().getInitParameter("logChannel");
            String logTopicName = event.getServletContext().getInitParameter("logTopic");
            __publisher = new LogPublisher(bayeux, logChannelName, logTopicName);
        }
    }

    public void attributeRemoved(ServletContextAttributeEvent arg0)
    {
        
    }

    public void attributeReplaced(ServletContextAttributeEvent arg0)
    {
        
    }

}
