package org.mortbay.hightide.example.auction.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.cometd.BayeuxService;
import org.mortbay.hightide.example.auction.dao.CategoryDao;



public class CategoryService extends BayeuxService
{
    
    private List _categories;
    
    public CategoryService(Bayeux bayeux)
    {
        super(bayeux, "category");
        
        subscribe("/service/auction/categories", "getCategories");        
    }    
    
    /* ================================================================ */
    
    public void getCategories(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        if(_categories==null)
            _categories = new CategoryDao().getAllCategories();        
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            response.put("categories", _categories);
        }
        catch(Exception e)
        {
            response.put("errorMsg", e.getMessage());
        }
        source.deliver(getClient(), channel, response, null);
    }
    

    

    

}
