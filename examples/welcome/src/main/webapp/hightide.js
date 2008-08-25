dojo.require("dojox.cometd");
var cometd = dojox.cometd;


var hightide = 
{     
  _logStart:-1,
  _logEnd:-1,
  _logEntries: new Array(100),
  _subscribed: false,
  

  _isPinned: function(element)
  {
    if (element == undefined)
        return false;
    if (element.pin == undefined)
        return false;
    if (element.pin == "true")
        return true;
    return false;
  },

  _pin: function(element)
  {
    if (element == undefined)
      return;
    element.pin = "true";
  },

  _unPin: function(element)
  {
    if (element == undefined)
      return;
    element.pin = undefined;
  },

  _log: function(message) 
  {
    hightide._addlog(message.data);
    hightide._printFifo();
  },

  _init: function()
  {
      if (!hightide._subscribed)
      {
          cometd.subscribe("/log", hightide, "_log");
          hightide._ready();
      }
      hightide._subscribed=true;
  },

  _ready: function ()
  {
    var welcomeEntry = { "logDate": "",
                         "millis": "0",
                         "sequence": "0",
                         "logger": "",
                         "level": "INFO",
                         "message": "Live log viewer ready"
                        };
                      
    hightide._addlog(welcomeEntry);
    hightide._printFifo();
  },

  _addlog: function (log)
  {
    //if no entries, update to first spot
    if (hightide._logStart < 0)
    {
        hightide._logStart = 0;
        hightide._logEnd = 0;
    }
    else 
    {
      //if at end of array, loop back to beginning
      if (hightide._logEnd +1 == hightide._logEntries.length)
      {
        //inc start taking account of looping past bottom of array
        hightide._logStart = (hightide._logStart+1==hightide._logEntries.length?0:hightide._logStart+1);
        hightide._logEnd = 0;
      }
      //if already looped
      else if (hightide._logEnd < hightide._logStart)
      {
        //inc start, taking account of looping past bottom of array
        hightide._logStart = (hightide._logStart+1==hightide._logEntries.length?0:hightide._logStart+1);
        hightide._logEnd++;
      }
      //otherwise just add at end
      else
      {
        hightide._logEnd++;
      }
   }

        
    hightide._logEntries[hightide._logEnd] = log; 
  },

  _decorateLogEntry: function (log, row)
  {
      row.seq=log.logseq;
      //row.setAttribute("class", log.level);
	  row.className = log.level;

      var seqcell = document.createElement("td");
      //seqcell.setAttribute("class", "seq");
	  seqcell.className = "seq";
      seqcell.innerHTML=log.sequence;
      row.appendChild(seqcell);

      var datecell = document.createElement("td");
      //datecell.setAttribute("class", "date");
	  datecell.className = "date";
      datecell.innerHTML=log.logDate;
      row.appendChild(datecell);

      var threadcell = document.createElement("td");
      //threadcell.setAttribute("class", "thread");
	  threadcell.className = "thread";
      threadcell.innerHTML=(log.thread==undefined?"&nbsp;":log.thread);
      row.appendChild(threadcell);

      var loggercell = document.createElement("td");
      //loggercell.setAttribute("class", "logger");
	  loggercell.className = "logger";
      loggercell.innerHTML=(log.logger==undefined?"&nbsp":log.logger);
      row.appendChild(loggercell);

      var messagecell = document.createElement("td");
      //messagecell.setAttribute("class", "message");
	  messagecell.className = "message";
      var messagetable = document.createElement("table");
      messagecell.appendChild(messagetable);
      var messagebody = document.createElement("tbody");
      messagetable.appendChild(messagebody);
      var messagerow1 = document.createElement("tr");
      var messagerow2 = document.createElement("tr");
      messagebody.appendChild(messagerow1);
      messagebody.appendChild(messagerow2);
      messagerow2.style.display="none";
      messagerow2.style.visibility="hidden";
  
      if (log.exception != undefined)
      {
        var iconcell = document.createElement("td");
        //iconcell.setAttribute("class", "excepticon");
		iconcell.className = "excepticon";
        messagerow1.appendChild(iconcell);
        var button = document.createElement("button");
        iconcell.appendChild(button);
        var icon = document.createElement("img");
        icon.src = "images/warning.gif";
        button.appendChild(icon);
        button.onmouseup = function(event)
                             {
                                 if (hightide._isPinned(iconcell))
                                 {
                                     hightide._unPin(iconcell);
                                     messagerow2.style.visibility="hidden";
                                     messagerow2.style.display="none";
                                 }
                                 else
                                 {
                                     hightide._pin(iconcell);
                                     messagerow2.style.visibility="visible";
                                     messagerow2.style.display="table-row";
                                 }
                              }
         var emptycell = document.createElement("td");
         messagerow2.appendChild(emptycell);
         var exceptmsgcell = document.createElement("td");
         //exceptmsgcell.setAttribute("class", "except");
		 exceptmsgcell.className = "except";
         messagerow2.appendChild(exceptmsgcell);
         var exception = log.exception.message+"</br> ";
         for (i=0;log.exception.frames!=null && i<log.exception.frames.length;i++)
         {
             var line = "";
             line = line + log.exception.frames[i].sourceClass +"&nbsp; ";
             line = line + log.exception.frames[i].sourceMethod +"&nbsp; ";
             line = line + log.exception.frames[i].line +"&nbsp; ";
             line = line + "</br>";
             exception += line;
          }
          exceptmsgcell.innerHTML=exception;

      }
      var message = document.createElement("td");
      message.innerHTML=log.message;
      messagerow1.appendChild(message);
      row.appendChild(messagecell);

  },

  
  _printFifo: function ()
  {
     var t = true;
     var i = hightide._logStart;
	 var log = $('log');
     while(log.hasChildNodes())
	 	log.removeChild(log.firstChild);     
     while (t)
     {
       var row = document.createElement("tr");
       log.appendChild(row);
       var entry = hightide._decorateLogEntry(hightide._logEntries[i], row); 
       if (i == hightide._logEnd)
         t=false;
       else 
       {
         if (i==(hightide._logEntries.length-1))
         {
          i=0;
         }
         else
         {
          i++;
         }
       }

     }
  }
};

Behaviour.addLoadEvent(hightide._init);
