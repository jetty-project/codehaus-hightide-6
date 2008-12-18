package org.mortbay.hightide.example.auction.service;

import java.util.HashMap;
import java.util.Map;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.cometd.BayeuxService;
import org.mortbay.hightide.example.auction.AuctionManager;



public class BidService extends BayeuxService
{
    
    private AuctionManager _auctionManager;

    public BidService(Bayeux bayeux, AuctionManager auctionManager)
    {
        super(bayeux, "bid");
        _auctionManager = auctionManager;
        subscribe("/service/auction/items/id/bids/new", "addBid");
        subscribe("/service/auction/items/id/bids/highest", "getHighestBid");
    }    
    
    public void addBid(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        Integer itemId = new Integer(((Number)data.get("itemId")).intValue());
        Double bidAmount = new Double(data.get("bidAmount").toString());
        String username = (String)data.get("username");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("bid", _auctionManager.addBid(itemId, bidAmount, username));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    
    public void getHighestBid(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        Integer itemId = new Integer(((Number)data.get("itemId")).intValue());
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("bid", _auctionManager.getHighestBid(itemId));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    
}
