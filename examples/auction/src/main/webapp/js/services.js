dojo.require("dojox.cometd");
var Services = {
    _initialized: false,
    isInitialized: function() {
        return Services._initialized;
    },
    _errorHandlers: [],
    addErrorHandler: function(errorHandler) {
        Services._errorHandlers.push(errorHandler);
    },
    _handleErrorMsg: function(msg) {
        var handlers = Services._errorHandlers;
        for(var i=0; i<handlers.length; i++)
            handlers[i](msg);
    },
    init: function() {
        if(Services._initialized)
            return;
        var path = new String(document.location).replace(/http:\/\/[^\/]*/, "");
        var idx = path.lastIndexOf("/");
        if(path.length>1 && path.length-1!=idx)
            path = path.substring(0, idx+1);
        dojox.cometd.init(path+"cometd");
        dojox.cometd.startBatch();

        AuctionManager.init();
        Catalog.init();
        Chat.init();
        dojox.cometd.endBatch();
        Services._initialized = true;
    },
    destroy: function() {
        AuctionManager.destroy();
        Catalog.destroy();
        Chat.destroy();
    }
};

var AuctionManager = {
    init: function() {
        //dojox.cometd.startBatch();
        dojox.cometd.subscribe("/service/auction/bidders/new", AuctionManager, "onRegisterBidder");
        dojox.cometd.subscribe("/service/auction/items/id/bids/new", AuctionManager, "onAddBid");
        dojox.cometd.subscribe("/service/auction/items/id/bids/highest", AuctionManager, "onGetHighestBid");
        //dojox.cometd.endBatch();
    },
    destroy: function() {
    
    },
    handlers: {
        onRegisterBidder: {},
        onAddBid: {},
        onGetHighestBid: {}
    },    
    registerHandler: function(name, handler) {
        var id = name + new Date().getTime();        
        AuctionManager.handlers[name][id] = handler;
        return id;
    },
    removeHandler: function(name, id) {        
        var handler = AuctionManager.handlers[name][id];
        AuctionManager.handlers[name][id] = null;
        return handler;
    },
    
    registerBidder: function(username, handler) {
        dojox.cometd.publish("/service/auction/bidders/new", {
            username: username,
            handlerId: AuctionManager.registerHandler("onRegisterBidder", handler)
        });
    },
    onRegisterBidder: function(message) {
        var handler = AuctionManager.removeHandler("onRegisterBidder", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.bidder);
    },
    
    addBid: function(itemId, bidAmount, username, handler) {
        dojox.cometd.publish("/service/auction/items/id/bids/new", {
            itemId: itemId,
            bidAmount: bidAmount,
            username: username,
            handlerId: AuctionManager.registerHandler("onAddBid", handler)
        });
    },
    onAddBid: function(message) {        
        var handler = AuctionManager.removeHandler("onAddBid", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.bid);
    },
    
    getHighestBid: function(itemId, handler) {
        dojox.cometd.publish("/service/auction/items/id/bids/highest", {
            itemId: itemId,
            handlerId: AuctionManager.registerHandler("onGetHighestBid", handler)
        });
    },
    onGetHighestBid: function(message) {
        var handler = AuctionManager.removeHandler("onGetHighestBid", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.bid);
    }    
};

var Catalog = {
    init: function() {
        //dojox.cometd.startBatch();
        dojox.cometd.subscribe("/service/auction/categories", Catalog, "onGetCategories");        
        dojox.cometd.subscribe("/service/auction/categories/find", Catalog, "onFindItems");
        dojox.cometd.subscribe("/service/auction/categories/id/items", Catalog, "onGetItemsInCategory");
        //dojox.cometd.endBatch();
    },
    destroy: function() {
    
    },
    handlers: {
        onGetCategories: {},
        onFindItems: {},
        onGetItemsInCategory: {}
    },    
    registerHandler: function(name, handler) {
        var id = name + new Date().getTime();
        Catalog.handlers[name][id] = handler;
        return id;
    },
    removeHandler: function(name, id) {
        var handler = Catalog.handlers[name][id];
        Catalog.handlers[name][id] = null;
        return handler;
    },
    
    getCategories: function(handler) {
        dojox.cometd.publish("/service/auction/categories", {
            handlerId: Catalog.registerHandler("onGetCategories", handler)
        });
    },
    onGetCategories: function(message) {
        var handler = Catalog.removeHandler("onGetCategories", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.categories);
    },
    
    findItems: function(expression, handler) {
        dojox.cometd.publish("/service/auction/categories/find", {
            expression: expression,
            handlerId: Catalog.registerHandler("onFindItems", handler)
        });
    },
    onFindItems: function(message) {
        var handler = Catalog.removeHandler("onFindItems", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.auctionItems);
    },
    
    getItemsInCategory: function(categoryId, handler) {
        dojox.cometd.publish("/service/auction/categories/id/items", {
            categoryId: categoryId,
            handlerId: Catalog.registerHandler("onGetItemsInCategory", handler)
        });
    },
    onGetItemsInCategory: function(message) {
        var handler = Catalog.removeHandler("onGetItemsInCategory", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.auctionItems);
    }    
};

var Chat = {
    init: function() {
        //dojox.cometd.startBatch();
        dojox.cometd.subscribe("/service/auction/chat/join", Chat, "onJoin");        
        dojox.cometd.subscribe("/service/auction/chat/leave", Chat, "onLeave");
        dojox.cometd.subscribe("/service/auction/chat/messages/new", Chat, "onSendMessage");
        dojox.cometd.subscribe("/service/auction/chat/members", Chat, "onGetMembers");
        //dojox.cometd.endBatch();
    },
    destroy: function() {
    
    },
    handlers: {
        onJoin: {},
        onLeave: {},
        onSendMessage: {},
        onGetMembers: {}
    },    
    registerHandler: function(name, handler) {
        var id = name + new Date().getTime();
        Chat.handlers[name][id] = handler;
        return id;
    },
    removeHandler: function(name, id) {
        var handler = Chat.handlers[name][id];
        Chat.handlers[name][id] = null;
        return handler;
    },
    
    join: function(roomId, username, handler) {
        dojox.cometd.publish("/service/auction/chat/join", {
            roomId: roomId,
            username: username,
            handlerId: Chat.registerHandler("onJoin", handler)
        });
    },
    onJoin: function(message) {
        var handler = Chat.removeHandler("onJoin", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            ;//handler(message.data.successful && true);
    },
    
    leave: function(roomId, username, handler) {
        dojox.cometd.publish("/service/auction/chat/leave", {
            roomId: roomId,
            username: username,
            handlerId: Chat.registerHandler("onLeave", handler)
        });
    },
    onLeave: function(message) {
        var handler = Chat.removeHandler("onLeave", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            ;//handler(message.data.successful && true);
    },
    
    sendMessage: function(roomId, username, message, handler) {
        dojox.cometd.publish("/service/auction/chat/messages/new", {
            roomId: roomId,
            message: message,
            username: username,
            handlerId: Chat.registerHandler("onSendMessage", handler)
        });        
    },
    onSendMessage: function(message) {        
        var handler = Chat.removeHandler("onSendMessage", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            ;//handler(message.data.successful && true);
    },
    
    getMembers: function(roomId, handler) {
        dojox.cometd.publish("/service/auction/chat/members", {
            roomId: roomId,
            handlerId: Chat.registerHandler("onGetMembers", handler)
        });
    },
    onGetMembers: function(message) {
        var handler = Chat.removeHandler("onGetMembers", message.data.handlerId);
        if(message.data.errorMsg)
            Services._handleErrorMsg(message.data.errorMsg);
        else if(handler)
            handler(message.data.members);
    }
};