
dojo.require("dojox.cometd");
var cometd = dojox.cometd;

var room = {
    _topicRoot: "/chat/",
    _roomId: null,
    _waitingToJoin: false,
    _userId:null,

     join: function (roomid, username) {
        cometd.subscribe(room._topicRoot+roomid, chatDisplay, "displayMessage");
        this._waitingToJoin = true;
        this._roomId = roomid;
        this._userId = username;
        //find out how to wait until you know you are successfully subscribed
        this.finishJoin();
     },

     finishJoin: function () {
        if (this._waitingToJoin) { 
          Chat.join(this._roomId, this._userId, chatDisplay.ignore);
          this._waitingToJoin=false;
        }
     },

    leave: function (roomid, username) {
        cometd.unsubscribe(room._topicRoot+roomid, chatDisplay, "displayMessage");
        //take the current registered bidder out of the room
        Chat.leave(roomid, username, chatDisplay.ignore);
        this._roomId=null;
        this._userId=null;
    },
 
    sendMessage: function (roomid, username, message) {
        Chat.sendMessage (roomid, username, message, chatDisplay.ignore);
    },


    getMembers: function (roomid) {
        Chat.getMembers(roomid, chatDisplay.displayMembers);
    }
};

var bidHandler = {
    _username : null,
    _topicRoot: "/auction/",
    _subscriptions: new Array(),
    
	registerBidder : function(name) {
	    if (name == null || name.length == 0) {
	    	return false;
	    } else {
	    	AuctionManager.registerBidder(name, bidHandler.handleRegistration);
	    	return true;
	    }
	},
	
	bid : function(amount, itemid, itemname) {
	    var validAmount = displayUtil.validateCash(amount);
	    if (validAmount!=null) {
	        if (bidHandler._subscriptions[itemid]==null) {
	            bidHandler._subscriptions[itemid] = "true";
                    cometd.subscribe(bidHandler._topicRoot+itemid, bidDisplay, "displayBidByMessage");
	        } 
	        amount = amount.replace(/\,/g,"");
  	        AuctionManager.addBid(itemid, amount, bidHandler._username, displayUtil.ignore);
  	    }
  	    return validAmount != null;
	},
	
	watch: function (itemid) {
	    if (bidHandler._subscriptions[itemid]==null) {
	        bidHandler._subscriptions[itemid] = "true";
                cometd.subscribe(bidHandler._topicRoot+itemid, bidDisplay, "displayBidByMessage");
	    } 
	},
	
	unwatch: function (itemid) {
	    if (bidHandler._subscriptions[itemid]!=null) {
                cometd.unsubscribe(bidHandler._topicRoot+itemid, bidDisplay, "displayBidByMessage");
	        bidHandler._subscriptions[itemid]=null;
	    }
	},
	
	handleRegistration: function (bidder) {
	    if (bidder == null) {
	        bidDisplay.showRegistration("User name invalid, please try again");
	    }
	    else {
    	    displayUtil.hide($('toptext'),true);
	        bidHandler._username = bidder.username;
	        bidDisplay.showRegisteredUser();
            Catalog.getCategories(catalogDisplay.displayCategories);
            
            var path = new String(document.location).replace(/http:\/\/[^\/]*/, "");
            var idx = path.lastIndexOf("/");
            if(path.length>1 && path.length-1!=idx)
                path = path.substring(0, idx+1);
            dojox.cometd.init(path+"cometd");
	    }
	}
};

var displayUtil = {

    init: function () {
        $('username').focus();
       //hack hack hack. This allows us to know when our amq subscriptions
       //have been fully processed. This is necessary because we need to
       //be able to subscribe to a chat room, and then once we're subscribed
       //for messages, we can join it. 
//       var realEndBatch=amq.endBatch
//       amq.endBatch=function() {
//         realEndBatch();
         // if we are in fact waiting for an ack of a chat room subscription,
         // now we can proceed
//         room.finishJoin();
//       }
    },

    show : function (element, displayStyle)  {
       
    	$(element).style.visibility="visible";
    	if (displayStyle != null)
    	    $(element).style.display=displayStyle;
    },

    hide: function (element, displayNone) {
        $(element).style.visibility="hidden";
        if (displayNone)
            $(element).style.display="none";
    },
    
    reveal: function (element, options) {
        new Effect.BlindDown(element, options);
    },
    
    unreveal: function (element, options) {
        new Effect.BlindUp(element, options);
    },
    
    formatCash : function (amount) {
        var str = displayUtil.validateCash(amount);
        if (str != null) {
            //ensure 2 decimal points
            //if (/\.\d$/.test(str))
            //    str += "0";
            //else if (! /\.\d{2}$/.test(str))
            //    str += ".00";
            if(! /^\$\d*/.test(str))
              str = "$"+str;
        }
        return str;
    },

    validateCash: function (amountStr) {
        var ok = true;
        if (amountStr==null || amountStr=="")
          return "0";       
        var str = amountStr.replace (/^\$/,"");
        
        var strNoCommas = str.replace(/\,/g,"");
        if(/^\d+(\.\d{1,2})?$/.test(strNoCommas)){            
            return str;
        }
        return null;
    },
    
    
    ignore : function (data) {
        //ignore return from AuctionManager.addBid and wait for topic message instead
    },
        
    displayError : function(errorString, exception) {
	    alert(errorString);
	},
	
	replace : function(string, text, by) {
	    var strLength = string.length, txtLength = text.length;
	    if ((strLength == 0) || (txtLength == 0)) return string;
	
	    var i = string.indexOf(text);
	    if ((!i) && (text != string.substring(0,txtLength))) return string;
	    if (i == -1) return string;
	
	    var newstr = string.substring(0,i) + by;
	
	    if (i+txtLength < strLength)
	        newstr += displayUtil.replace(string.substring(i+txtLength,strLength),text,by);
	
	    return newstr;
	}	
	
};


var bidDisplay = {

   _bidItemDisplay: [
       function (bid) { 
             thename = document.createElement("p");
             thename.id="Itm"+bid.itemId;
             thename.innerHTML=bid.itemName;
             return thename;
       },
       function (bid) { return (bid.amount==null?"":displayUtil.formatCash(bid.amount)); },
       function (bid) { return bid.bidder; },
       function (bid) {
            var thisbid = bid;
                       
            //create a bid button to reveal an input box
            var bidButton = document.createElement("button");
	        bidButton.id="Btn"+thisbid.itemId;
	        bidButton.itemId=thisbid.itemId;
	        bidButton.itemName=thisbid.itemName;
	        bidButton.innerHTML="bid";	        
	     return bidButton;
       },
       function (bid) {
             var chatButton = document.createElement("button");
             chatButton.id="Chat"+bid.itemId;
             chatButton.itemId=bid.itemId;
             chatButton.itemName=bid.itemName;
             chatButton.innerHTML="chat";
             chatButton.setAttribute("class", "chat");
             chatButton.onclick = function (event) {
                //close any previous chat
                chatDisplay.leaveRoom();
                //enter the new room
                chatDisplay.enterRoom(chatButton.id, bid.itemId, bidHandler._username);
             }
             return chatButton;
       }
   ],
   


    showRegistration: function (message) {
        if (message != null) {
	      alert(message);
	    }
    },

    showRegisteredUser: function () {
        //show a welcome message
        var logindiv = document.getElementById("login");
        while (logindiv.hasChildNodes()) {
          logindiv.removeChild(logindiv.firstChild);
	    }
    	welcome = document.createElement("span");
    	welcome.appendChild(document.createTextNode("welcome "));
        username = document.createElement("b");
        username.appendChild(document.createTextNode(bidHandler._username));
        welcome.appendChild(username);
    	logindiv.appendChild(welcome); 
    	//show all parts of the application now except for the chat
    	displayUtil.show("catalogstuff", "block");
    	displayUtil.show("auction", "block");
    },

 
	undisplayBid : function(itemId) {
	    var bidTr = document.getElementById(itemId);
	    var contents = $("contents");
	    contents.removeChild(bidTr);
	},
	
	displayBidByMessage : function(message) {
               if (message != null) {
                        if (message.data != null) {
                            var item = message.data.item;
                            var from = message.data.from;
                            var amount = message.data.amount;
			    if (item != null) {
			        bidDisplay.displayBidByDetails(item, name, amount, from);	    		
	                    }
                        }
    	       }
       },
	
	displayBidByDetails : function (itemId, itemName, amount, bidder) {
	  
        var bidList = $("contents");
	    var bidTr = document.getElementById(itemId);
	    if (bidTr == null)
	    {
	        var bid = new Object();
	        bid.itemId = itemId;
	        bid.itemName = itemName,
	        bid.amount = amount;
	        bid.bidder = bidder; 
	        var bids = new Array();
	        bids[0]=bid;
	        DWRUtil.addRows ("contents", bids, bidDisplay._bidItemDisplay, {
	           rowCreator : function (options) {
                       var row = document.createElement("tr");
                       var thedata = options.rowData;
                       row.id = thedata.itemId;
                       return row;
                   },
   
                   cellCreator : function (options) {
                       var cell = document.createElement("td");
                       var thedata = options.rowData;
                       if (options.cellNum == 1) {
                           cell.id = "Amnt"+thedata.itemId;
                           cell.className="amountcell";
                       } else if (options.cellNum == 2) {
                           cell.id = "Bidder"+thedata.itemId;
                           cell.className="biddercell";
                       } else if (options.cellNum == 3 ) {
                           cell.className="bidcell";
                       } else if (options.cellNum == 4) {
                           cell.className="chatcell";
                       }           
                       return cell;
                   }
               });
             
               //add an inplace editor on the Bid button
               new NonAjax.InPlaceEditor("Btn"+itemId, null, 
                                       {callback: function (form, val){
                                                     if (!bidHandler.bid(val, bid.itemId, bid.itemName))
                                                       alert('Please enter a decimal amount without a leading $');
                                                   },
                                        onStartEdit: function(textElement) {
                                                     dollars = DWRUtil.getValue("Amnt"+bid.itemId);             
                                                     //textElement.value=displayUtil.validateCash(dollars);
                                                     dollars = dollars.replace (/^\$/,"").replace(/\,/g,"");
                                                     textElement.value = dollars;
                                                  }
                                       }
                                      );
	    }
	    else
	    {
	      //update existing current bid and bidder in the row
	      dollarValue = "";
	      if (amount != null && amount != "")
	          dollarValue = displayUtil.formatCash(amount);
	      DWRUtil.setValue("Amnt"+itemId,dollarValue);
	      
	      highBidder = "";
	      if (bidder != null)
	          highBidder = bidder;
	      DWRUtil.setValue("Bidder"+itemId,highBidder);
	      
	      if (bidder != null && bidder != "") {
	          if (highBidder==bidHandler._username){
	              new Effect.Highlight("Amnt"+itemId, {startcolor:'#ffffff', endcolor:'#ccffcc', restorecolor:'#ccffcc'});
	          }
	          else{
	              new Effect.Highlight("Amnt"+itemId, {startcolor:'#ffffff', endcolor:'#ffcccc', restorecolor:'#ffcccc'});
	          }
	       }
	    }
	},
	
	displayBidByBid : function (bid) {
	        if (bid != null) {
	            bidDisplay.displayBidByDetails(bid.itemId, "", bid.formattedAmount, bid.bidder);
	        }
	}
	
};



var catalogDisplay = {
        _categorySelected: null,

	_auctionItemsDisplay : [
		
		function(auctionitem) {
			var div = document.createElement("div");
			div.appendChild(document.createElement("br"));
			div.align = "center";
			var img = div.appendChild(document.createElement("img"));
			img.src = "images/" + auctionitem.id + ".jpg";
			div.appendChild(document.createElement("br"));
			
			return div;
		},
		
		function(auctionitem) {
			var div = document.createElement("div");
			div.align = "left";
			
			div.appendChild(document.createElement("br"));
			
			var bname = div.appendChild(document.createElement("b"));
			var fname = bname.appendChild(document.createElement("font"));
			fname.color = "#FF0000";
			fname.innerHTML = auctionitem.itemName;
			
			//div.appendChild(document.createElement("br"));
			div.appendChild(document.createElement("br"));
			
			var desc = div.appendChild(document.createElement("span"));
			desc.innerHTML = auctionitem.description;
			
			div.appendChild(document.createElement("br"));
			div.appendChild(document.createElement("br"));
			
	 	    //put on a "watch/bid" button if we aren't already watching	    
	 	     var btn = div.appendChild(document.createElement("button"));
	 	     btn.id="watch"+auctionitem.id;
	 	     btn.innerHTML="watch";
	 	     if (document.getElementById(auctionitem.id) != null) { 
	 	         btn.style.visibility="hidden"; //hide ourselves if item shown in auction
	 	     } 
	 	     btn.onclick = function(event) {
	 	         //add to my auction, getting the highest bid
	 	         bidDisplay.displayBidByDetails(auctionitem.id, auctionitem.itemName, null, "");
	 	         AuctionManager.getHighestBid (auctionitem.id, bidDisplay.displayBidByBid);
	 	         //make sure we watch for all messages on the item's topic
	 	         bidHandler.watch(auctionitem.id);	 	            
	 	         btn.style.visibility="hidden"; //hide ourselves once pressed
				 //document.getElementById('phrase').focus();
	 	     }
	 	     
			div.appendChild(document.createElement("br"));
			
			return div;
		}
	],
	
	_categoryItemDisplay : [
	    function(categoryitem) {
	        var link = document.createElement("span");
	        link.itemId=categoryitem.id;
	        link.innerHTML=categoryitem.categoryName;
	        
	        return link;
	    }
	],
	
	searchFormSubmitHandler : function() {
		var searchExp = $("searchbox").value;
		DWRUtil.setValue("searchbox", "");
		Catalog.findItems(searchExp, catalogDisplay.displayItems);
	},


	displayItems : function(auctionitems) {
		DWRUtil.removeAllRows("auctionitems");
		if (auctionitems.length == 0) {
		    DWRUtil.setValue("itemhdr","Items");
		} else {
			DWRUtil.addRows("auctionitems", auctionitems, catalogDisplay._auctionItemsDisplay);
		}
	},
    
    displayCategories : function(categoryList) {
        DWRUtil.removeAllRows("categories");
    	DWRUtil.addRows("categories", categoryList, catalogDisplay._categoryItemDisplay, {
    	    rowCreator: function(options) { return document.createElement("tr");},
    	    cellCreator: function(options) {
    	        var cell = document.createElement("td");
    	        var categoryData = options.rowData;
                cell.id="cat"+categoryData.id;
                cell.setAttribute("class", "noselect");
    	        cell.onclick = function(event) {
                    if (catalogDisplay._categorySelected != null) {
                      $(catalogDisplay._categorySelected).setAttribute("class", "noselect");
                      $(catalogDisplay._categorySelected).className="noselect";
                    }
                    catalogDisplay._categorySelected=cell.id;
                    cell.setAttribute("class", "catselect");
                    cell.className="catselect";
    	            catalogDisplay.displayItemsByCategory(categoryData.id, categoryData.categoryName);
    	        }
    	        cell.onmouseover = function(event){
    	        	if(cell.className != "catselect"){
	    	        	cell.className = "hovered";
	    	        }
    	        }
    	        cell.onmouseout = function(event){
    	        	if(cell.className == "hovered"){
    	        		cell.className = "noselect";
    	        	}
    	        }
    	        return cell;
    	    }
    	}); 	
    	displayUtil.show('searchbox', "inline");
    	displayUtil.show('searchbtn', "inline");
    },
    
    displayItemsByCategory : function(categoryId, categoryName) {
        if (bidHandler._username == null) {
            alert("Please login");
        } else {
            DWRUtil.removeAllRows("auctionitems");
    	    DWRUtil.setValue("itemhdr",categoryName);
    	    Catalog.getItemsInCategory(categoryId, catalogDisplay.displayItems);
    	}
    }
    
};

var chatDisplay = {
    ignore: function (msg) {       
          if (msg != null) {
              if (msg.data != null) {
                roomId = msg.data.roomId;
                userId = msg.data.userId;
                  alert("Unexpected message from "+userId+" for room "+roomId);
              }
          }
           
    },
    
    displayMembers: function (memberList) {
        membersHTML = "";
        if (memberList != null) {
          for (i=0; i< memberList.length; i++) {
             membersHTML += "<p>"+memberList[i]+"</p>"; 
          }
        }
        $("members").innerHTML=membersHTML;
    },
    
    displayImage: function(itemId) {
    	var imageSrc = "images/" + itemId + ".jpg";
    	var imageHTML = "<center><img src='" + imageSrc + "'/></center>";
    	
    	$("chatitem").innerHTML = imageHTML;
    },

    displayMessage: function (message) {
       chatArea = $('chat');
       if (message != null) {
            roomId = message.data.roomId;
            userId = message.data.userId;
            if (message.data.join) {
              //show the new joiner
              chatArea.innerHTML+="<p><i> .... "+userId+" has joined</i></p>";
              //get fresh member list
              Chat.getMembers(roomId, chatDisplay.displayMembers);
              chatDisplay.displayImage(roomId);
          }
          else if (message.data.leave) {
              //show the leaver
              chatArea.innerHTML+="<p><i> .... "+userId+" has left</i></p>";
              //get fresh member list
              Chat.getMembers(roomId, chatDisplay.displayMembers);
          }
          else if (message.data.chat != null) {
            msg = message.data.chat;
            chatArea.innerHTML+="<p>"+userId+": "+msg+"</p>";//show the message
          }
          chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
        }
    },

    enterRoom: function (buttonId, roomId, userId) {
        displayUtil.show("chatcontainer", "block");
        displayUtil.hide (buttonId, false);
        $('chatclose').chatId=buttonId;
        $('chatclose').roomId=roomId;
        $('chattitle').innerHTML="Chat: "+$(buttonId).itemName;
        room.join(roomId,userId);
		document.getElementById('phrase').focus();
    },

    leaveRoom: function () {
        if  (room._roomId != null) {
          room.leave(room._roomId, bidHandler._username);
          displayUtil.hide('chatcontainer');
          displayUtil.show($('chatclose').chatId, "inline");
          $('chatclose').roomId="";
          $('chatclose').chatId="";
          $('chat').innerHTML="";
          $('members').innerHTML="";
          $('chattitle').innerHTML="Chat";
        }
    }
};

var EvUtil =
{
    getKeyCode : function(ev)
    {
        var keyc;
        if (window.event)
            keyc=window.event.keyCode;
        else
            keyc=ev.keyCode;
        return keyc;
    }
};


var auctionBehaviour = {

  '#username' : function(element) {
      element.setAttribute("autocomplete","OFF");       
      element.onkeyup = function(ev) {
          var keyc=EvUtil.getKeyCode(ev);
          if (keyc==13 || keyc==10) {
            	var name = $('username').value;
              if (!bidHandler.registerBidder(name))
                bidDisplay.showRegistration("Please enter a user name");
              Behaviour.apply();
          }
          return true;
      }      
  },
  
  '#phrase' : function(element){
      element.setAttribute("autocomplete","OFF");       
      element.onkeyup = function(ev) {          
          var keyc=EvUtil.getKeyCode(ev);
          if (keyc==13 || keyc==10) {
              room.sendMessage($('chatclose').roomId, bidHandler._username, $('phrase').value);
              $('phrase').value="";
              $('phrase').focus();
          }
      }
  },

  '#joinbtn' : function(element) {
      element.onclick = function(event) {
        	var name = $('username').value;
          if (!bidHandler.registerBidder(name))
            bidDisplay.showRegistration("Please enter a user name");
          Behaviour.apply();
          return true;
      }
  },
  
  '#chatclose' : function (element) {
      element.onclick = function(event) {
          chatDisplay.leaveRoom();
      }
  },
  
  '#searchbtn' : function (element) {
      element.onclick = function (event) {
          catalogDisplay.searchFormSubmitHandler();
      }
  },

  '#sendChat' : function (element) {      
      element.onclick = function (event) {
          room.sendMessage($('chatclose').roomId, bidHandler._username, $('phrase').value);
          $('phrase').value="";
          $('phrase').focus();
      }
  }


};

DWREngine.setErrorHandler(displayUtil.displayError);
Behaviour.register(auctionBehaviour);
Behaviour.addLoadEvent(displayUtil.init);


