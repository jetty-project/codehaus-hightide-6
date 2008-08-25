package org.mortbay.hightide.example.auction.servlet;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;
import org.cometd.Bayeux;

import org.mortbay.hightide.example.auction.AuctionManager;
import org.mortbay.hightide.example.auction.Chat;

public class BayeuxListener implements ServletContextAttributeListener
{
    public void attributeAdded(ServletContextAttributeEvent event)
    {
        if (event.getName().equals(Bayeux.DOJOX_COMETD_BAYEUX))
        {
            Bayeux bayeux=(Bayeux)event.getValue();
            AuctionManager.setBayeux(bayeux);
            Chat.setBayeux(bayeux);
        }
    }

    public void attributeRemoved(ServletContextAttributeEvent event)
    {
    }

    public void attributeReplaced(ServletContextAttributeEvent event)
    {
    }   
    
}
