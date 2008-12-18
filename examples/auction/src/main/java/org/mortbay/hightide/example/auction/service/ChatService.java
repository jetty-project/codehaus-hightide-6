package org.mortbay.hightide.example.auction.service;

import java.util.HashMap;
import java.util.Map;

import org.cometd.Bayeux;
import org.cometd.Client;
import org.mortbay.cometd.BayeuxService;
import org.mortbay.hightide.example.auction.Chat;


public class ChatService extends BayeuxService
{
    
    private Chat _chat;

    public ChatService(Bayeux bayeux)
    {
        super(bayeux, "auction-chat");
        _chat = new Chat(bayeux, getClient());
        
        subscribe("/service/auction/chat/join", "join");
        subscribe("/service/auction/chat/leave", "leave");
        subscribe("/service/auction/chat/messages/new", "sendMessage");
        subscribe("/service/auction/chat/members", "getMembers");
    }
    
    public void join(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        String roomId = data.get("roomId").toString();
        String username = (String)data.get("username");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            _chat.join(roomId, username);
            response.put("successful", Boolean.TRUE);
        }
        catch(Exception e)
        {
            response.put("errMsg", e.getMessage());
        }
        source.deliver(source, channel, response, null);        
    }
    
    public void leave(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        String roomId = data.get("roomId").toString();
        String username = (String)data.get("username");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            _chat.leave(roomId, username);
            response.put("successful", Boolean.TRUE);
        }
        catch(Exception e)
        {
            response.put("errMsg", e.getMessage());
        }
        source.deliver(source, channel, response, null);
    }
    
    public void sendMessage(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        String roomId = data.get("roomId").toString();
        String username = (String)data.get("username");
        String message = (String)data.get("message");
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {
            _chat.sendMessage(roomId, username, message);
            response.put("successful", Boolean.TRUE);
        }
        catch(Exception e)
        {
            response.put("errMsg", e.getMessage());
        }
        source.deliver(source, channel, response, null);        
    }
    
    public void getMembers(Client source, String channel, Map<String, Object> data, 
            String messageId)
    {
        String roomId = data.get("roomId").toString();        
        
        Map<String,Object> response = new HashMap<String,Object>();
        response.put("handlerId", data.get("handlerId"));
        try
        {            
            response.put("members", _chat.getMembers(roomId));
        }
        catch(Exception e)
        {
            response.put("errMsg", e.getMessage());
        }
        source.deliver(source, channel, response, null);
    }
    

}
