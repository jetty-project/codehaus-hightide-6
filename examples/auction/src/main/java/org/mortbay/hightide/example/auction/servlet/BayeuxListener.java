package org.mortbay.hightide.example.auction.servlet;

import javax.servlet.ServletContextAttributeEvent;
import javax.servlet.ServletContextAttributeListener;

import org.cometd.Bayeux;
import org.mortbay.hightide.example.auction.AuctionManager;
import org.mortbay.hightide.example.auction.service.AuctionItemService;
import org.mortbay.hightide.example.auction.service.BidService;
import org.mortbay.hightide.example.auction.service.BidderService;
import org.mortbay.hightide.example.auction.service.CategoryService;
import org.mortbay.hightide.example.auction.service.ChatService;

public class BayeuxListener implements ServletContextAttributeListener
{
    public void attributeAdded(ServletContextAttributeEvent event)
    {
        if (event.getName().equals(Bayeux.ATTRIBUTE))
            init((Bayeux)event.getValue());
    }
    
    protected void init(Bayeux bayeux)
    {
        AuctionManager auctionManager = new AuctionManager(bayeux);
        new BidderService(bayeux, auctionManager);
        new BidService(bayeux, auctionManager);
        new CategoryService(bayeux);
        new ChatService(bayeux);
        new AuctionItemService(bayeux);
    }

    public void attributeRemoved(ServletContextAttributeEvent event)
    {
    }

    public void attributeReplaced(ServletContextAttributeEvent event)
    {
    }   
    
}
