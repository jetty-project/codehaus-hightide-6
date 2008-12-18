package org.mortbay.hightide.example.auction.service;

import java.util.HashMap;
import java.util.Map;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.cometd.BayeuxService;
import org.mortbay.hightide.example.auction.AuctionManager;


public class BidderService extends BayeuxService
{
    
    private AuctionManager _auctionManager;

    public BidderService(Bayeux bayeux, AuctionManager auctionManager)
    {
        super(bayeux, "bidder");
        _auctionManager = auctionManager;
        
        subscribe("/service/auction/bidders/new", "registerBidder");
    }
    
    public void registerBidder(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {        
        String username = (String)data.get("username");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("bidder", _auctionManager.registerBidder(username));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }        
        source.deliver(getClient(), channel, response, null);
    }

}
