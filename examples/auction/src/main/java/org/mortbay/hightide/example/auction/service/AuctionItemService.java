package org.mortbay.hightide.example.auction.service;

import java.util.HashMap;
import java.util.Map;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.cometd.BayeuxService;
import org.mortbay.hightide.example.auction.dao.CategoryDao;



public class AuctionItemService extends BayeuxService
{

    public AuctionItemService(Bayeux bayeux)
    {
        super(bayeux, "auction-item");
        
        subscribe("/service/auction/categories/id/items", "getItemsByCategory");
        subscribe("/service/auction/categories/find", "findItems");
        subscribe("/service/auction/items/id", "getItemById");        
    }
    
    public void getItemsByCategory(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        Integer categoryId = new Integer(((Number)data.get("categoryId")).intValue());
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("auctionItems", new CategoryDao().getItemsInCategory(categoryId));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    
    public void findItems(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        String expression = (String)data.get("expression");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("auctionItems", new CategoryDao().findItems(expression));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    
    public void getItemById(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        Integer itemId = new Integer(((Number)data.get("itemId")).intValue());
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("auctionItem", new CategoryDao().getItem(itemId));
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    

}
