/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){(function(){if(typeof this["djConfig"]=="undefined"){this.djConfig={};}if((!this["console"])||(!console["firebug"])){this.console={};}var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn"];var i=0,tn;while(tn=cn[i++]){if(!console[tn]){console[tn]=function(){};}}if(typeof this["dojo"]=="undefined"){this.dojo={};}dojo.global=this;var _4={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",preventBackButtonFix:true,delayMozLoadingFix:false};for(var _5 in _4){if(typeof djConfig[_5]=="undefined"){djConfig[_5]=_4[_5];}}var _6=["Browser","Rhino","Spidermonkey","Mobile"];var t;while(t=_6.shift()){dojo["is"+t]=false;}})();dojo.locale=djConfig.locale;dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 1263 $".match(/[0-9]+/)[0]),toString:function(){with(dojo.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}};dojo._getProp=function(_8,_9,_a){var _b=_a||dojo.global;for(var i=0,p;_b&&(p=_8[i]);i++){_b=(p in _b?_b[p]:(_9?_b[p]={}:undefined));}return _b;};dojo.setObject=function(_e,_f,_10){var _11=_e.split("."),p=_11.pop(),obj=dojo._getProp(_11,true,_10);return (obj&&p?(obj[p]=_f):undefined);};dojo.getObject=function(_14,_15,_16){return dojo._getProp(_14.split("."),_15,_16);};dojo.exists=function(_17,obj){return Boolean(dojo.getObject(_17,false,obj));};dojo["eval"]=function(_19){return dojo.global.eval?dojo.global.eval(_19):eval(_19);};dojo.deprecated=function(_1a,_1b,_1c){var _1d="DEPRECATED: "+_1a;if(_1b){_1d+=" "+_1b;}if(_1c){_1d+=" -- will be removed in version: "+_1c;}console.debug(_1d);};dojo.experimental=function(_1e,_1f){var _20="EXPERIMENTAL: "+_1e;_20+=" -- Not yet ready for use.  APIs subject to change without notice.";if(_1f){_20+=" "+_1f;}console.debug(_20);};dojo._getText=function(uri){};(function(){var _22={_pkgFileName:djConfig["packageFileName"]||"__package__",_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_23){var mp=this._modulePrefixes;return Boolean(mp[_23]&&mp[_23].value);},_getModulePrefix:function(_25){var mp=this._modulePrefixes;if(this._moduleHasPrefix(_25)){return mp[_25].value;}return _25;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false};for(var _27 in _22){dojo[_27]=_22[_27];}})();dojo._loadPath=function(_28,_29,cb){var uri=(((_28.charAt(0)=="/"||_28.match(/^\w+:/)))?"":this.baseUrl)+_28;if(djConfig.cacheBust&&dojo.isBrowser){uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");}try{return !_29?this._loadUri(uri,cb):this._loadUriAndCheck(uri,_29,cb);}catch(e){console.debug(e);return false;}};dojo._loadUri=function(uri,cb){if(this._loadedUrls[uri]){return true;}var _2e=this._getText(uri,true);if(!_2e){return false;}this._loadedUrls[uri]=true;this._loadedUrls.push(uri);if(cb){_2e="("+_2e+")";}var _2f=dojo["eval"]("//@ sourceURL="+uri+"\r\n"+_2e);if(cb){cb(_2f);}return true;};dojo._loadUriAndCheck=function(uri,_31,cb){var ok=false;try{ok=this._loadUri(uri,cb);}catch(e){console.debug("failed loading ",uri," with error: ",e);}return Boolean(ok&&this._loadedModules[_31]);};dojo.loaded=function(){this._loadNotifying=true;this._postLoad=true;var mll=this._loaders;for(var x=0;x<mll.length;x++){mll[x]();}this._loaders=[];this._loadNotifying=false;};dojo.unloaded=function(){var mll=this._unloaders;while(mll.length){(mll.pop())();}};dojo.addOnLoad=function(obj,_38){var d=dojo;if(arguments.length==1){d._loaders.push(obj);}else{if(arguments.length>1){d._loaders.push(function(){obj[_38]();});}}if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}};dojo.addOnUnload=function(obj,_3b){var d=dojo;if(arguments.length==1){d._unloaders.push(obj);}else{if(arguments.length>1){d._unloaders.push(function(){obj[_3b]();});}}};dojo._modulesLoaded=function(){if(this._postLoad){return;}if(this._inFlightCount>0){console.debug("files still in flight!");return;}dojo._callLoaded();};dojo._callLoaded=function(){if(typeof setTimeout=="object"||(djConfig["useXDomain"]&&dojo.isOpera)){setTimeout("dojo.loaded();",0);}else{dojo.loaded();}};dojo._getModuleSymbols=function(_3d){var _3e=_3d.split(".");for(var i=_3e.length;i>0;i--){var _40=_3e.slice(0,i).join(".");if((i==1)&&!this._moduleHasPrefix(_40)){_3e[0]="../"+_3e[0];}else{var _41=this._getModulePrefix(_40);if(_41!=_40){_3e.splice(0,i,_41);break;}}}return _3e;};dojo._global_omit_module_check=false;dojo._loadModule=function(_42,_43,_44){_44=this._global_omit_module_check||_44;var _45=this._loadedModules[_42];if(_45){return _45;}var _46=_42.split(".");var _47=this._getModuleSymbols(_42);var _48=((_47[0].charAt(0)!="/")&&!_47[0].match(/^\w+:/));var _49=_47[_47.length-1];var _4a;if(_49=="*"){_42=_46.slice(0,-1).join(".");_47.pop();_4a=_47.join("/")+"/"+this._pkgFileName+".js";if(_48&&_4a.charAt(0)=="/"){_4a=_4a.slice(1);}}else{_4a=_47.join("/")+".js";_42=_46.join(".");}var _4b=(!_44)?_42:null;var ok=this._loadPath(_4a,_4b);if((!ok)&&(!_44)){throw new Error("Could not load '"+_42+"'; last tried '"+_4a+"'");}if((!_44)&&(!this["_isXDomain"])){_45=this._loadedModules[_42];if(!_45){throw new Error("symbol '"+_42+"' is not defined after loading '"+_4a+"'");}}return _45;};dojo.require=dojo._loadModule;dojo.provide=function(_4d){var _4e=String(_4d);var _4f=_4e;var _50=_4d.split(/\./);if(_50[_50.length-1]=="*"){_50.pop();_4f=_50.join(".");}var _51=dojo.getObject(_4f,true);this._loadedModules[_4e]=_51;this._loadedModules[_4f]=_51;return _51;};dojo.platformRequire=function(_52){var _53=_52["common"]||[];var _54=_53.concat(_52[dojo._name]||_52["default"]||[]);for(var x=0;x<_54.length;x++){var _56=_54[x];if(_56.constructor==Array){dojo._loadModule.apply(dojo,_56);}else{dojo._loadModule(_56);}}};dojo.requireIf=function(_57,_58){if(_57===true){var _59=[];for(var i=1;i<arguments.length;i++){_59.push(arguments[i]);}dojo.require.apply(dojo,_59);}};dojo.requireAfterIf=dojo.requireIf;dojo.registerModulePath=function(_5b,_5c){this._modulePrefixes[_5b]={name:_5b,value:_5c};};if(djConfig["modulePaths"]){for(var param in djConfig["modulePaths"]){dojo.registerModulePath(param,djConfig["modulePaths"][param]);}}dojo.requireLocalization=function(_5d,_5e,_5f,_60){dojo.require("dojo.i18n");dojo.i18n._requireLocalization.apply(dojo.hostenv,arguments);};(function(){var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");var ire=new RegExp("^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$");dojo._Url=function(){var n=null;var _a=arguments;var uri=_a[0];for(var i=1;i<_a.length;i++){if(!_a[i]){continue;}var _67=new dojo._Url(_a[i]+"");var _68=new dojo._Url(uri+"");if((_67.path=="")&&(!_67.scheme)&&(!_67.authority)&&(!_67.query)){if(_67.fragment!=null){_68.fragment=_67.fragment;}_67=_68;}else{if(_67.scheme==null){_67.scheme=_68.scheme;if(_67.authority==null){_67.authority=_68.authority;if(_67.path.charAt(0)!="/"){var _69=_68.path.substring(0,_68.path.lastIndexOf("/")+1)+_67.path;var _6a=_69.split("/");for(var j=0;j<_6a.length;j++){if(_6a[j]=="."){if(j==_6a.length-1){_6a[j]="";}else{_6a.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_6a[0]=="")&&_6a[j]==".."&&_6a[j-1]!=".."){if(j==(_6a.length-1)){_6a.splice(j,1);_6a[j-1]="";}else{_6a.splice(j-1,2);j-=2;}}}}_67.path=_6a.join("/");}}}}uri="";if(_67.scheme!=null){uri+=_67.scheme+":";}if(_67.authority!=null){uri+="//"+_67.authority;}uri+=_67.path;if(_67.query!=null){uri+="?"+_67.query;}if(_67.fragment!=null){uri+="#"+_67.fragment;}}this.uri=uri.toString();var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":null);this.authority=r[4]||(r[3]?"":null);this.path=r[5];this.query=r[7]||(r[6]?"":null);this.fragment=r[9]||(r[8]?"":null);if(this.authority!=null){r=this.authority.match(ire);this.user=r[3]||null;this.password=r[4]||null;this.host=r[5];this.port=r[7]||null;}};dojo._Url.prototype.toString=function(){return this.uri;};})();dojo.moduleUrl=function(_6d,url){var loc=dojo._getModuleSymbols(_6d).join("/");if(!loc){return null;}if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}var _70=loc.indexOf(":");if(loc.charAt(0)!="/"&&(_70==-1||_70>loc.indexOf("/"))){loc=dojo.baseUrl+loc;}return new dojo._Url(loc,url);};if(typeof window!="undefined"){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var _72=document.getElementsByTagName("script");var _73=/dojo(\.xd)?\.js([\?\.]|$)/i;for(var i=0;i<_72.length;i++){var src=_72[i].getAttribute("src");if(!src){continue;}var m=src.match(_73);if(m){if(!djConfig["baseUrl"]){djConfig["baseUrl"]=src.substring(0,m.index);}var cfg=_72[i].getAttribute("djConfig");if(cfg){var _78=eval("({ "+cfg+" })");for(var x in _78){djConfig[x]=_78[x];}}break;}}}d.baseUrl=djConfig["baseUrl"];var n=navigator;var dua=n.userAgent;var dav=n.appVersion;var tv=parseFloat(dav);d.isOpera=(dua.indexOf("Opera")>=0)?tv:0;d.isKhtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0)?tv:0;d.isSafari=(dav.indexOf("Safari")>=0)?tv:0;var _7e=dua.indexOf("Gecko");d.isMozilla=d.isMoz=((_7e>=0)&&(!d.isKhtml))?tv:0;d.isFF=0;d.isIE=0;d.isGears=0;try{if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1].split(" ")[0]);}if((document.all)&&(!d.isOpera)){d.isIE=parseFloat(dav.split("MSIE ")[1].split(";")[0]);}}catch(e){}d._gearsObject=function(){var _7f;var _80;var _81=d.getObject("google.gears");if(_81){return _81;}if(typeof GearsFactory!="undefined"){_7f=new GearsFactory();}else{if(d.isIE){try{_7f=new ActiveXObject("Gears.Factory");}catch(e){}}else{if(navigator.mimeTypes["application/x-googlegears"]){_7f=document.createElement("object");_7f.setAttribute("type","application/x-googlegears");_7f.setAttribute("width",0);_7f.setAttribute("height",0);_7f.style.display="none";document.documentElement.appendChild(_7f);}}}if(!_7f){return null;}dojo.setObject("google.gears.factory",_7f);return dojo.getObject("google.gears");};var _82=d._gearsObject();if(_82){d.isGears=true;}var cm=document["compatMode"];d.isQuirks=(cm=="BackCompat")||(cm=="QuirksMode")||(d.isIE<6);d.locale=djConfig.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._println=console.debug;d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];d._xhrObj=function(){var _84=null;var _85=null;try{_84=new XMLHttpRequest();}catch(e){}if(!_84){for(var i=0;i<3;++i){var _87=dojo._XMLHTTP_PROGIDS[i];try{_84=new ActiveXObject(_87);}catch(e){_85=e;}if(_84){dojo._XMLHTTP_PROGIDS=[_87];break;}}}if(!_84){throw new Error("XMLHTTP not available: "+_85);}return _84;};d._isDocumentOk=function(_88){var _89=_88.status||0;return ((_89>=200)&&(_89<300))||(_89==304)||(_89==1223)||(!_89&&(location.protocol=="file:"||location.protocol=="chrome:"));};d._getText=function(uri,_8b){var _8c=this._xhrObj();if(dojo._Url){uri=(new dojo._Url(window.location,uri)).toString();}_8c.open("GET",uri,false);try{_8c.send(null);if(!d._isDocumentOk(_8c)){var err=Error("Unable to load "+uri+" status:"+_8c.status);err.status=_8c.status;err.responseText=_8c.responseText;throw err;}}catch(e){if(_8b){return null;}throw e;}return _8c.responseText;};})();dojo._handleNodeEvent=function(_8e,_8f,fp){var _91=_8e["on"+_8f]||function(){};_8e["on"+_8f]=function(){fp.apply(_8e,arguments);_91.apply(_8e,arguments);};return true;};dojo._initFired=false;dojo._loadInit=function(e){dojo._initFired=true;var _93=(e&&e.type)?e.type.toLowerCase():"load";if(arguments.callee.initialized||(_93!="domcontentloaded"&&_93!="load")){return;}arguments.callee.initialized=true;if(typeof dojo["_khtmlTimer"]!="undefined"){clearInterval(dojo._khtmlTimer);delete dojo._khtmlTimer;}if(dojo._inFlightCount==0){dojo._modulesLoaded();}};if(document.addEventListener){if(dojo.isOpera||(dojo.isMoz&&(djConfig["enableMozDomContentLoaded"]===true))){document.addEventListener("DOMContentLoaded",dojo._loadInit,null);}window.addEventListener("load",dojo._loadInit,null);}if(dojo.isIE){document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){dojo._loadInit();}\">"+"</scr"+"ipt>");}if(/(WebKit|khtml)/i.test(navigator.userAgent)){dojo._khtmlTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){dojo._loadInit();}},10);}if(dojo.isIE){dojo._handleNodeEvent(window,"beforeunload",function(){dojo._unloading=true;window.setTimeout(function(){dojo._unloading=false;},0);});}dojo._handleNodeEvent(window,"unload",function(){if((!dojo.isIE)||(dojo.isIE&&dojo._unloading)){dojo.unloaded();}});try{if(dojo.isIE){document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");}}catch(e){}dojo._writeIncludes=function(){};dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];};dojo.setContext=function(_94,_95){dojo.global=_94;dojo.doc=_95;};dojo._fireCallback=function(_96,_97,_98){if((_97)&&((typeof _96=="string")||(_96 instanceof String))){_96=_97[_96];}return (_97?_96.apply(_97,_98||[]):_96());};dojo.withGlobal=function(_99,_9a,_9b,_9c){var _9d;var _9e=dojo.global;var _9f=dojo.doc;try{dojo.setContext(_99,_99.document);_9d=dojo._fireCallback(_9a,_9b,_9c);}finally{dojo.setContext(_9e,_9f);}return _9d;};dojo.withDoc=function(_a0,_a1,_a2,_a3){var _a4;var _a5=dojo.doc;try{dojo.doc=_a0;_a4=dojo._fireCallback(_a1,_a2,_a3);}finally{dojo.doc=_a5;}return _a4;};}if(djConfig.isDebug){if(!console.firebug){dojo.require("dojo._firebug.firebug");}}}if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");dojo.isString=function(it){return (typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return (it&&it instanceof Array||typeof it=="array"||((typeof dojo["NodeList"]!="undefined")&&(it instanceof dojo.NodeList)));};if(dojo.isBrowser&&dojo.isSafari){dojo.isFunction=function(it){if((typeof (it)=="function")&&(it=="[object NodeList]")){return false;}return (typeof it=="function"||it instanceof Function);};}else{dojo.isFunction=function(it){return (typeof it=="function"||it instanceof Function);};}dojo.isObject=function(it){if(typeof it=="undefined"){return false;}return (it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));};dojo.isArrayLike=function(it){var d=dojo;if((!it)||(typeof it=="undefined")){return false;}if(d.isString(it)){return false;}if(d.isFunction(it)){return false;}if(d.isArray(it)){return true;}if((it.tagName)&&(it.tagName.toLowerCase()=="form")){return false;}if(isFinite(it.length)){return true;}return false;};dojo.isAlien=function(it){if(!it){return false;}return !dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo._mixin=function(obj,_af){var _b0={};for(var x in _af){if((typeof _b0[x]=="undefined")||(_b0[x]!=_af[x])){obj[x]=_af[x];}}if(dojo.isIE&&(typeof (_af["toString"])=="function")&&(_af["toString"]!=obj["toString"])&&(_af["toString"]!=_b0["toString"])){obj.toString=_af.toString;}return obj;};dojo.mixin=function(obj,_b3){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(obj,arguments[i]);}return obj;};dojo.extend=function(_b6,_b7){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(_b6.prototype,arguments[i]);}return _b6;};dojo._hitchArgs=function(_ba,_bb){var pre=dojo._toArray(arguments,2);var _bd=dojo.isString(_bb);return function(){var _be=dojo._toArray(arguments);var f=(_bd?(_ba||dojo.global)[_bb]:_bb);return (f)&&(f.apply(_ba||this,pre.concat(_be)));};};dojo.hitch=function(_c0,_c1){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments);}if(!_c1){_c1=_c0;_c0=null;}if(dojo.isString(_c1)){_c0=_c0||dojo.global;if(!_c0[_c1]){throw (["dojo.hitch: scope[\"",_c1,"\"] is null (scope=\"",_c0,"\")"].join(""));}return function(){return _c0[_c1].apply(_c0,arguments||[]);};}else{return (!_c0?_c1:function(){return _c1.apply(_c0,arguments||[]);});}};dojo._delegate=function(obj,_c3){function TMP(){};TMP.prototype=obj;var tmp=new TMP();if(_c3){dojo.mixin(tmp,_c3);}return tmp;};dojo.partial=function(_c5){var arr=[null];return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));};dojo._toArray=function(obj,_c8){var arr=[];for(var x=_c8||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};}if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");dojo.declare=function(_cb,_cc,_cd,_ce){if(dojo.isFunction(_ce)||(!_ce&&!dojo.isFunction(_cd))){var t=_ce;_ce=_cd;_cd=t;}var _d0=function(){this._construct(arguments);};var dd=dojo.declare,p=_ce||{},_d3=[],pc;if(dojo.isArray(_cc)){_d3=_cc;_cc=_d3.shift();}var scp=_cc?_cc.prototype:null;if(scp){_d0.prototype=dojo._delegate(scp);}dojo.mixin(_d0,{superclass:scp,mixins:_d3,extend:dd._extend});for(var i=0,m;(m=_d3[i]);i++){dojo.extend(_d0,m.prototype);}_cd=_cd||(pc=p.constructor)&&(pc!=Object)&&pc||null;dojo.extend(_d0,{declaredClass:_cb,_initializer:_cd,preamble:null},p,dd._core);_d0.prototype.constructor=_d0;return dojo.setObject(_cb,_d0);};dojo.mixin(dojo.declare,{_extend:function(_d8,_d9){dojo.extend(this,_d8);this.mixins.push(!_d9?_d8:function(){_d8.apply(this,_d9.apply(this,arguments)||arguments);});},_core:{_construct:function(_da){var c=_da.callee,s=c.superclass,ct=s&&s.constructor,a=_da,ii;if(fn=c.prototype.preamble){a=fn.apply(this,a)||a;}if(ct&&ct.apply){ct.apply(this,a);}for(var i=0,m;(m=c.mixins[i]);i++){if(m.apply){m.apply(this,a);}}var ii=c.prototype._initializer;if(ii){ii.apply(this,_da);}},inherited:function(_e2,_e3,_e4){var c=_e3.callee,p=this.constructor.prototype,a=_e4||_e3,fn;if(this[_e2]!=c||p[_e2]==c){while(p&&(p[_e2]!==c)){p=p.constructor.superclass;}if(!p){throw (this.toString()+": name argument (\""+_e2+"\") to inherited must match callee (declare.js)");}while(p&&(p[_e2]==c)){p=p.constructor.superclass;}}return (fn=p&&p[_e2])&&(fn.apply(this,a));}}});}if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ls=arguments.callee.listeners;for(var i in ls){if(!(i in Array.prototype)){ls[i].apply(this,arguments);}}};},add:function(_eb,_ec,_ed){_eb=_eb||dojo.global;var f=_eb[_ec];if(!f||!f.listeners){var d=dojo._listener.getDispatcher();d.listeners=(f?[f]:[]);f=_eb[_ec]=d;}return f.listeners.push(_ed);},remove:function(_f0,_f1,_f2){var f=(_f0||dojo.global)[_f1];if(f&&f.listeners&&_f2--){delete f.listeners[_f2];}}};dojo.connect=function(obj,_f5,_f6,_f7,_f8){var a=arguments,_fa=[],i=0;_fa.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];_fa.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){_fa.push(a[i]);}return dojo._connect.apply(this,_fa);};dojo.disconnect=function(_fe){if(_fe&&_fe[0]!==undefined){dojo._disconnect.apply(this,_fe);delete _fe[0];}};dojo._disconnect=function(obj,_100,_101,_102){_102.remove(obj,_100,_101);};dojo._topics={};dojo.subscribe=function(_103,_104,_105){return [_103,dojo._listener.add(dojo._topics,_103,dojo.hitch(_104,_105))];};dojo.unsubscribe=function(_106){dojo._listener.remove(dojo._topics,_106[0],_106[1]);};dojo.publish=function(_107,args){var f=dojo._topics[_107];(f)&&(f.apply(this,args||[]));};}if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");dojo.Deferred=function(_10a){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=_10a;this.silentlyCancelled=false;};dojo.extend(dojo.Deferred,{_getFunctionFromArgs:function(){var a=arguments;if((a[0])&&(!a[1])){if(dojo.isFunction(a[0])){return a[0];}else{if(dojo.isString(a[0])){return dojo.global[a[0]];}}}else{if((a[0])&&(a[1])){return dojo.hitch(a[0],a[1]);}}return null;},makeCalled:function(){var _10c=new dojo.Deferred();_10c.callback();return _10c;},toString:function(){var _10d;if(this.fired==-1){_10d="unfired";}else{if(this.fired==0){_10d="success";}else{_10d="error";}}return "Deferred("+this.id+", "+_10d+")";},_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){if(this.fired==-1){if(this.canceller){this.canceller(this);}else{this.silentlyCancelled=true;}if(this.fired==-1){this.errback(new Error(this.toString()));}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel();}}},_pause:function(){this.paused++;},_unpause:function(){this.paused--;if((this.paused==0)&&(this.fired>=0)){this._fire();}},_continue:function(res){this._resback(res);this._unpause();},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}this._resback(res);},addBoth:function(cb,cbfn){var _115=this._getFunctionFromArgs(cb,cbfn);if(arguments.length>2){_115=dojo.partial(_115,arguments,2);}return this.addCallbacks(_115,_115);},addCallback:function(cb,cbfn){var _118=this._getFunctionFromArgs(cb,cbfn);if(arguments.length>2){_118=dojo.partial(_118,arguments,2);}return this.addCallbacks(_118,null);},addErrback:function(cb,cbfn){var _11b=this._getFunctionFromArgs(cb,cbfn);if(arguments.length>2){_11b=dojo.partial(_11b,arguments,2);}return this.addCallbacks(null,_11b);return this.addCallbacks(null,cbfn);},addCallbacks:function(cb,eb){this.chain.push([cb,eb]);if(this.fired>=0){this._fire();}return this;},_fire:function(){var _11e=this.chain;var _11f=this.fired;var res=this.results[_11f];var self=this;var cb=null;while((_11e.length>0)&&(this.paused==0)){var pair=_11e.shift();var f=pair[_11f];if(f==null){continue;}try{res=f(res);_11f=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._continue(res);};this._pause();}}catch(err){_11f=1;res=err;}}this.fired=_11f;this.results[_11f]=res;if((cb)&&(this.paused)){res.addBoth(cb);}}});}if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){try{return eval("("+json+")");}catch(e){console.debug(e);return json;}};dojo._escapeString=function(str){return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};dojo.toJsonIndentStr="\t";dojo.toJson=function(it,_129,_12a){_12a=_12a||"";var _12b=(_129?_12a+dojo.toJsonIndentStr:"");var _12c=(_129?"\n":"");var _12d=typeof (it);if(_12d=="undefined"){return "undefined";}else{if((_12d=="number")||(_12d=="boolean")){return it+"";}else{if(it===null){return "null";}}}if(_12d=="string"){return dojo._escapeString(it);}var _12e=arguments.callee;var _12f;if(typeof it.__json__=="function"){_12f=it.__json__();if(it!==_12f){return _12e(_12f,_129,_12b);}}if(typeof it.json=="function"){_12f=it.json();if(it!==_12f){return _12e(_12f,_129,_12b);}}if(dojo.isArray(it)){var res=[];for(var i=0;i<it.length;i++){var val=_12e(it[i],_129,_12b);if(typeof (val)!="string"){val="undefined";}res.push(_12c+_12b+val);}return "["+res.join(", ")+_12c+_12a+"]";}if(_12d=="function"){return null;}var _133=[];for(var key in it){var _135;if(typeof (key)=="number"){_135="\""+key+"\"";}else{if(typeof (key)=="string"){_135=dojo._escapeString(key);}else{continue;}}val=_12e(it[key],_129,_12b);if(typeof (val)!="string"){continue;}_133.push(_12c+_12b+_135+": "+val);}return "{"+_133.join(", ")+_12c+_12a+"}";};}if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var d=dojo;if(Array.forEach){var tn=["indexOf","lastIndexOf","every","some","forEach","filter","map"];for(var x=0;x<tn.length;x++){d[tn[x]]=Array[tn[x]];}}else{var _139=function(arr,obj){return [(d.isString(arr)?arr.split(""):arr),(obj||d.global)];};d.mixin(d,{indexOf:function(_13c,_13d,_13e,_13f){if(_13f){var step=-1,i=(_13e||_13c.length-1),end=-1;}else{var step=1,i=(_13e||0),end=_13c.length;}for(;i!=end;i+=step){if(_13c[i]==_13d){return i;}}return -1;},lastIndexOf:function(_143,_144,_145){return d.indexOf(_143,_144,_145,true);},map:function(arr,func,obj){var _p=_139(arr,obj);arr=_p[0];obj=_p[1];var _14a=[];for(var i=0;i<arr.length;++i){_14a.push(func.call(obj,arr[i],i,arr));}return _14a;},forEach:function(arr,_14d,obj){if((!arr)||(!arr.length)){return;}var _p=_139(arr,obj);arr=_p[0];obj=_p[1];for(var i=0,l=arr.length;i<l;i++){_14d.call(obj,arr[i],i,arr);}},_everyOrSome:function(_152,arr,_154,obj){var _p=_139(arr,obj);arr=_p[0];obj=_p[1];for(var i=0,l=arr.length;i<l;i++){var _159=_154.call(obj,arr[i],i,arr);if(_152&&!_159){return false;}else{if((!_152)&&(_159)){return true;}}}return (!!_152);},every:function(arr,_15b,_15c){return this._everyOrSome(true,arr,_15b,_15c);},some:function(arr,_15e,_15f){return this._everyOrSome(false,arr,_15e,_15f);},filter:function(arr,_161,obj){var _p=_139(arr,obj);arr=_p[0];obj=_p[1];var _164=[];for(var i=0;i<arr.length;i++){if(_161.call(obj,arr[i],i,arr)){_164.push(arr[i]);}}return _164;}});}})();}if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");}if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;dojo.provide("dojo._base.event");(function(){var del={add:function(node,_168,fp){if(!node){return;}_168=del._normalizeEventName(_168);fp=del._fixCallback(_168,fp);node.addEventListener(_168,fp,false);return fp;},remove:function(node,_16b,_16c){(node)&&(node.removeEventListener(del._normalizeEventName(_16b),_16c,false));},_normalizeEventName:function(name){return (name.slice(0,2)=="on"?name.slice(2):name);},_fixCallback:function(name,fp){return (name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));});},_fixEvent:function(evt,_172){switch(evt.type){case "keypress":del._setKeyChar(evt);break;}return evt;},_setKeyChar:function(evt){evt.keyChar=(evt.charCode?String.fromCharCode(evt.charCode):"");}};dojo.fixEvent=function(evt,_175){return del._fixEvent(evt,_175);};dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};var _177=dojo._listener;dojo._connect=function(obj,_179,_17a,_17b,_17c){var _17d=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var l=(!_17d?dojo._listener:(!_17c?del:_177));var h=l.add(obj,_179,dojo.hitch(_17a,_17b));return [obj,_179,h,l];};dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};if(dojo.isIE){_trySetKeyCode=function(e,code){try{return e.keyCode=code;}catch(e){return 0;}};var ap=Array.prototype;var iel=dojo._listener;if((dojo.isIE<7)&&(!djConfig._allow_leaks)){_177=iel=dojo._ie_listener={handlers:[],add:function(_184,_185,_186){_184=_184||dojo.global;var f=d=_184[_185];if(!d||!d.listeners){d=_184[_185]=dojo._getIeDispatcher();d.listeners=(f?[ieh.push(f)-1]:[]);}return d.listeners.push(ieh.push(_186)-1);},remove:function(_189,_18a,_18b){var f=(_189||dojo.global)[_18a],l=f&&f.listeners;if(f&&l&&_18b--){delete ieh[l[_18b]];delete l[_18b];}}};var ieh=iel.handlers;}dojo.mixin(del,{add:function(node,_18f,fp){if(!node){return;}_18f=del._normalizeEventName(_18f);if(_18f=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd.listeners||!kd._stealthKeydown){del.add(node,"onkeydown",del._stealthKeyDown);node.onkeydown._stealthKeydown=true;}}return iel.add(node,_18f,del._fixCallback(fp,node));},remove:function(node,_193,_194){iel.remove(node,del._normalizeEventName(_193),_194);},_normalizeEventName:function(_195){return (_195.slice(0,2)!="on"?"on"+_195:_195);},_nop:function(){},_fixCallback:function(fp,_197){return function(e){return fp.call(this,del._fixEvent(e,_197));};},_fixEvent:function(evt,_19a){if(!evt){var w=(_19a)&&((_19a.ownerDocument||_19a.document||_19a).parentWindow)||window;evt=w.event;}if(!evt){return (evt);}evt.target=evt.srcElement;evt.currentTarget=(_19a||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var _19e=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;evt.pageX=evt.clientX+(_19e.scrollLeft||0);evt.pageY=evt.clientY+(_19e.scrollTop||0);if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}evt.stopPropagation=this._stopPropagation;evt.preventDefault=this._preventDefault;return this._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case "keypress":var c=("charCode" in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else{if(c==13||c==27){c=0;}else{if(c==3){c=99;}}}evt.charCode=c;del._setKeyChar(evt);break;}return evt;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp.listeners){return;}var k=evt.keyCode;var _1a4=(k!=13)&&(k!=32)&&(k!=27)&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_1a4||evt.ctrlKey){var c=(_1a4?0:k);if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_trySetKeyCode(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){_trySetKeyCode(this,0);this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);};}del._synthesizeEvent=function(evt,_1a9){var faux=dojo.mixin({},evt,_1a9);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;};if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,_1ac){switch(evt.type){case "keypress":var c=evt.which;if(c==3){c=99;}c=((c<41)&&(!evt.shiftKey)?0:c);if((evt.ctrlKey)&&(!evt.shiftKey)&&(c>=65)&&(c<=90)){c+=32;}return del._synthesizeEvent(evt,{charCode:c});}return evt;}});}if(dojo.isSafari){dojo.mixin(del,{_fixEvent:function(evt,_1af){switch(evt.type){case "keypress":var c=evt.charCode,s=evt.shiftKey;if(evt.keyIdentifier=="Enter"){c=0;}else{if((evt.ctrlKey)&&(c>0)&&(c<27)){c+=96;}else{if(c==dojo.keys.SHIFT_TAB){c=dojo.keys.TAB;s=true;}else{c=(c>=32&&c<63232?c:0);}}}return del._synthesizeEvent(evt,{charCode:c,shiftKey:s});}return evt;}});dojo.mixin(dojo.keys,{SHIFT_TAB:25,UP_ARROW:63232,DOWN_ARROW:63233,LEFT_ARROW:63234,RIGHT_ARROW:63235,F1:63236,F2:63237,F3:63238,F4:63239,F5:63240,F6:63241,F7:63242,F8:63243,F9:63244,F10:63245,F11:63246,F12:63247,PAUSE:63250,DELETE:63272,HOME:63273,END:63275,PAGE_UP:63276,PAGE_DOWN:63277,INSERT:63302,PRINT_SCREEN:63248,SCROLL_LOCK:63249,NUM_LOCK:63289});}})();if(dojo.isIE<7){dojo._getIeDispatcher=function(){return function(){var ap=Array.prototype,ls=arguments.callee.listeners,h=dojo._ie_listener.handlers;for(var i in ls){if(!(i in ap)){h[ls[i]].apply(this,arguments);}}};};}}if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}dojo.createElement=function(obj,_1b7,_1b8){};if(dojo.isIE&&(dojo.isIE<7)){dojo.byId=function(id,doc){if(dojo.isString(id)){var _d=(doc||dojo.doc);var te=_d.getElementById(id);if((te)&&(te.id==id)){return te;}else{var eles=_d.all[id];if(!eles){return;}if(!eles.length){return eles;}var i=0;while(te=eles[i++]){if(te.id==id){return te;}}}}else{return id;}};}else{dojo.byId=function(id,doc){if(dojo.isString(id)){return (doc||dojo.doc).getElementById(id);}else{return id;}};}(function(){var _1c1=function(node,ref){ref.parentNode.insertBefore(node,ref);return true;};var _1c4=function(node,ref){var pn=ref.parentNode;if(ref==pn.lastChild){pn.appendChild(node);}else{return _1c1(node,ref.nextSibling);}return true;};dojo.place=function(node,_1c9,_1ca){if((!node)||(!_1c9)||(typeof _1ca=="undefined")){return false;}if(typeof _1ca=="number"){var cn=_1c9.childNodes;if(((_1ca==0)&&(cn.length==0))||(cn.length==_1ca)){_1c9.appendChild(node);return true;}if(_1ca==0){return _1c1(node,_1c9.firstChild);}return _1c4(node,cn[_1ca-1]);}switch(_1ca.toLowerCase()){case "before":return _1c1(node,_1c9);case "after":return _1c4(node,_1c9);case "first":if(_1c9.firstChild){return _1c1(node,_1c9.firstChild);}else{_1c9.appendChild(node);return true;}break;default:_1c9.appendChild(node);return true;}};dojo.boxModel="content-box";if(dojo.isIE){var _dcm=document.compatMode;dojo.boxModel=(_dcm=="BackCompat")||(_dcm=="QuirksMode")||(dojo.isIE<6)?"border-box":"content-box";}if(!dojo.isIE){var dv=document.defaultView;dojo.getComputedStyle=((dojo.isSafari)?function(node){var s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}return s||{};}:function(node){return dv.getComputedStyle(node,null);});dojo._toPixelValue=function(_1d1,_1d2){return (parseFloat(_1d2)||0);};}else{dojo.getComputedStyle=function(node){return node.currentStyle;};dojo._toPixelValue=function(_1d4,_1d5){if(!_1d5){return 0;}if(_1d5.slice&&(_1d5.slice(-2)=="px")){return parseFloat(_1d5);}with(_1d4){var _1d6=style.left;var _1d7=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=_1d5;_1d5=style.pixelLeft;}catch(e){_1d5=0;}style.left=_1d6;runtimeStyle.left=_1d7;}return _1d5;};}dojo._getOpacity=((dojo.isIE)?function(node){try{return (node.filters.alpha.opacity/100);}catch(e){return 1;}}:function(node){return node.style.opacity;});dojo._setOpacity=((dojo.isIE)?function(node,_1db){var o="Alpha(Opacity="+(_1db*100)+")";node.style.filter=o;if(node.nodeName.toLowerCase=="tr"){dojo.query("> td",node).forEach(function(i){i.style.filter=o;});}return _1db;}:function(node,_1df){node.style.opacity=_1df;});var _1e0={width:true,height:true,left:true,top:true};var _1e1=function(node,type,_1e4){type=type.toLowerCase();if(_1e0[type]===true){return dojo._toPixelValue(node,_1e4);}else{if(_1e0[type]===false){return _1e4;}else{if((type.indexOf("margin")>=0)||(type.indexOf("padding")>=0)||(type.indexOf("width")>=0)||(type.indexOf("height")>=0)||(type.indexOf("max")>=0)||(type.indexOf("min")>=0)||(type.indexOf("offset")>=0)){_1e0[type]=true;return dojo._toPixelValue(node,_1e4);}else{_1e0[type]=false;return _1e4;}}}};dojo.style=function(){var _a=arguments;var _a_l=_a.length;if(!_a_l){return;}var node=dojo.byId(_a[0]);var io=((dojo.isIE)&&(_a[1]=="opacity"));if(_a_l==3){return (io)?dojo._setOpacity(node,_a[2]):node.style[_a[1]]=_a[2];}var s=dojo.getComputedStyle(node);if(_a_l==1){return s;}if(_a_l==2){return (io)?dojo._getOpacity(node):_1e1(node,_a[1],s[_a[1]]);}};dojo._getPadBounds=function(n,_1eb){var s=_1eb||dojo.getComputedStyle(n),px=dojo._toPixelValue,l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};};dojo._getPadBorderExtents=function(n,_1f1){var s=_1f1||dojo.getComputedStyle(n),px=dojo._toPixelValue,p=dojo._getPadBounds(n,s),bl=(s.borderLeftStyle!="none"?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!="none"?px(n,s.borderTopWidth):0);return {l:p.l+bl,t:p.t+bt,w:p.w+bl+(s.borderRightStyle!="none"?px(n,s.borderRightWidth):0),h:p.h+bt+(s.borderBottomStyle!="none"?px(n,s.borderBottomWidth):0)};};dojo._getMarginExtents=function(n,_1f8){var s=_1f8||dojo.getComputedStyle(n),px=dojo._toPixelValue,l=px(n,s.marginLeft),t=px(n,s.marginTop);return {l:l,t:t,w:l+px(n,s.marginRight),h:t+px(n,s.marginBottom)};};if(dojo.isMoz){dojo._getMarginBox=function(node,_1fe){var s=_1fe||dojo.getComputedStyle(node);var mb=dojo._getMarginExtents(node,s);return {l:(parseFloat(s.left)||node.offsetLeft)-mb.l,t:(parseFloat(s.top)||node.offsetTop)-mb.t,w:node.offsetWidth+mb.w,h:node.offsetHeight+mb.h};};}else{dojo._getMarginBox=function(node,_202){var mb=dojo._getMarginExtents(node,_202);return {l:node.offsetLeft-mb.l,t:node.offsetTop-mb.t,w:node.offsetWidth+mb.w,h:node.offsetHeight+mb.h};};}dojo._getContentBox=function(node,_205){var w=node.clientWidth,h,gpb;if(!w){w=node.offsetWidth,h=node.offsetHeight,gpb=dojo._getPadBorderExtents;}else{h=node.clientHeight,gpb=dojo._getPadBounds;}var pb=gpb(node,_205);return {l:pb.l,t:pb.t,w:w-pb.w,h:h-pb.h};};dojo._setBox=function(node,l,t,w,h,u){u=u||"px";with(node.style){if(!isNaN(l)){left=l+u;}if(!isNaN(t)){top=t+u;}if(w>=0){width=w+u;}if(h>=0){height=h+u;}}};dojo._setContentBox=function(node,_211,_212,_213,_214,_215){var tn=node.tagName,bb=(dojo.boxModel=="border-box")||(tn=="TABLE")||(tn=="BUTTON");if(bb){var pb=dojo._getPadBorderExtents(node,_215);if(_213>=0){_213+=pb.w;}if(_214>=0){_214+=pb.h;}}dojo._setBox(node,_211,_212,_213,_214);};dojo._nilExtents={w:0,h:0};dojo._setMarginBox=function(node,_21a,_21b,_21c,_21d,_21e){var s=_21e||dojo.getComputedStyle(node);var tn=node.tagName,pb=((dojo.boxModel=="border-box")||(tn=="TABLE")||(tn=="BUTTON")?dojo._nilExtents:dojo._getPadBorderExtents(node,s));var mb=dojo._getMarginExtents(node,s);if(_21c>=0){_21c=Math.max(_21c-pb.w-mb.w,0);}if(_21d>=0){_21d=Math.max(_21d-pb.h-mb.h,0);}dojo._setBox(node,_21a,_21b,_21c,_21d);};dojo.marginBox=function(node,_224){node=dojo.byId(node);var s=dojo.getComputedStyle(node),b=_224;return !b?dojo._getMarginBox(node,s):dojo._setMarginBox(node,b.l,b.t,b.w,b.h,s);};dojo.contentBox=function(node,_228){node=dojo.byId(node);var s=dojo.getComputedStyle(node),b=_228;return !b?dojo._getContentBox(node,s):dojo._setContentBox(node,b.l,b.t,b.w,b.h,s);};var _22b=function(node,prop){if(!node){return 0;}var _b=dojo.body();var _22f=0;while(node){try{if(dojo.getComputedStyle(node).position=="fixed"){return 0;}}catch(e){}var val=node[prop];if(val){_22f+=val-0;if(node==_b){break;}}node=node.parentNode;}return _22f;};dojo._docScroll=function(){var _b=dojo.body();var _w=dojo.global;var de=dojo.doc.documentElement;return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||de.scrollLeft||_b.scrollLeft||0)};};var _234=((dojo.isIE>=7)&&(dojo.boxModel!="border-box"))?2:0;dojo._abs=function(node,_236){var _237=node.ownerDocument;var ret={x:0,y:0};var db=dojo.body();if(dojo.isIE){with(node.getBoundingClientRect()){ret.x=left-_234;ret.y=top-_234;}}else{if(_237["getBoxObjectFor"]){var bo=_237.getBoxObjectFor(node);ret.x=bo.x-_22b(node,"scrollLeft");ret.y=bo.y-_22b(node,"scrollTop");}else{if(node["offsetParent"]){var _23b;if((dojo.isSafari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){_23b=db;}else{_23b=db.parentNode;}if(node.parentNode!=db){var nd=node;if(dojo.isOpera){nd=db;}ret.x-=_22b(nd,"scrollLeft");ret.y-=_22b(nd,"scrollTop");}var _23d=node;do{var n=_23d["offsetLeft"];if(!dojo.isOpera||n>0){ret.x+=isNaN(n)?0:n;}var m=_23d["offsetTop"];ret.y+=isNaN(m)?0:m;_23d=_23d.offsetParent;}while((_23d!=_23b)&&(_23d!=null));}else{if(node["x"]&&node["y"]){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}}}if(_236){var _240=dojo._docScroll();ret.y+=_240.y;ret.x+=_240.x;}return ret;};dojo.coords=function(node,_242){node=dojo.byId(node);var s=dojo.getComputedStyle(node);var mb=dojo._getMarginBox(node,s);var abs=dojo._abs(node,_242);mb.x=abs.x;mb.y=abs.y;return mb;};})();dojo.hasClass=function(node,_247){return ((" "+node.className+" ").indexOf(" "+_247+" ")>=0);};dojo.addClass=function(node,_249){var cls=node.className;if((" "+cls+" ").indexOf(" "+_249+" ")<0){node.className=cls+(cls?" ":"")+_249;}};dojo.removeClass=function(node,_24c){var cls=node.className;if(cls&&cls.indexOf(_24c)>=0){node.className=cls.replace(new RegExp("(^|\\s+)"+_24c+"(\\s+|$)"),"$1$2");}};dojo.toggleClass=function(node,_24f,_250){if(typeof _250=="undefined"){_250=!dojo.hasClass(node,_24f);}dojo[_250?"addClass":"removeClass"](node,_24f);};}if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;dojo.provide("dojo._base.NodeList");(function(){var d=dojo;dojo.NodeList=function(){if((arguments.length==1)&&(typeof arguments[0]=="number")){this.length=parseInt(arguments[0]);}else{if((arguments.length==1)&&(arguments[0].constructor==dojo.NodeList)){}else{for(var x=0;x<arguments.length;x++){this.push(arguments[x]);}}}};dojo.NodeList.prototype=new Array;dojo.extend(dojo.NodeList,{box:function(){return dojo.coords(this[0]);},boxes:function(){var ret=[];this.forEach(function(item){ret.push(dojo.coords(item));});return ret;},style:function(prop){var aa=dojo._toArray(arguments);aa.unshift(this[0]);return dojo.style.apply(dojo,aa);},styles:function(prop){var aa=dojo._toArray(arguments);aa.unshift(null);return this.map(function(i){aa[0]=i;return dojo.style.apply(dojo,aa);});},place:function(_25a,_25b){var item=d.query(_25a)[0];_25b=_25b||"last";for(var x=0;x<this.length;x++){d.place(this[x],item,_25b);}return this;},connect:function(_25e,_25f,_260){this.forEach(function(item){dojo.connect(item,_25e,_25f,_260);});return this;},orphan:function(_262){var _263=d._filterQueryResult(this,_262);_263.forEach(function(item){if(item["parentNode"]){item.parentNode.removeChild(item);}});return _263;},adopt:function(_265,_266){var item=this[0];_266=_266||"last";var _268=d.query(_265);for(var x=0;x<_268.length;x++){d.place(_268[x],item,_266);}return _268;},query:function(_26a){_26a=_26a||"";var ret=new d.NodeList();this.forEach(function(item){d.query(_26a,item).forEach(function(_26d){if(typeof _26d!="undefined"){ret.push(_26d);}});});return ret;},filter:function(_26e){var _26f=this;var _a=arguments;var r=new d.NodeList();var rp=function(t){if(typeof t!="undefined"){r.push(t);}};if(dojo.isString(_26e)){_26f=d._filterQueryResult(this,_a[0]);if(_a.length==1){return _26f;}d.forEach(d.filter(_26f,_a[1],_a[2]),rp);return r;}d.forEach(d.filter(_26f,_a[0],_a[1]),rp);return r;},addContent:function(_274,_275){var ta=dojo.doc.createElement("span");if(dojo.isString(_274)){ta.innerHTML=_274;}else{ta.appendChild(_274);}var ct=((_275=="first")||(_275=="after"))?"lastChild":"firstChild";this.forEach(function(item){var tn=ta.cloneNode(true);while(tn[ct]){d.place(tn[ct],item,_275);}});return this;}});if(!Array.forEach){dojo.extend(dojo.NodeList,{indexOf:function(_27a,_27b){return d.indexOf(this,_27a,_27b);},lastIndexOf:function(_27c,_27d){return d.lastIndexOf(this,_27c,_27d);},forEach:function(_27e,_27f){return d.forEach(this,_27e,_27f);},every:function(_280,_281){return d.every(this,_280,_281);},some:function(_282,_283){return d.some(this,_282,_283);},map:function(_284,obj){return d.map(this,_284,obj);}});}if(d.isIE){var _286=function(_287){return ("var a2 = parent."+_287+"; "+"var ap = Array.prototype; "+"var a2p = a2.prototype; "+"for(var x in a2p){ ap[x] = a2p[x]; } "+"parent."+_287+" = Array; ");};var scs=_286("dojo.NodeList");var _289=window.createPopup();_289.document.write("<script>"+scs+"</script>");_289.show(1,1,1,1);}})();}if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;dojo.provide("dojo._base.query");(function(){var d=dojo;var _28b=function(q){return [q.indexOf("#"),q.indexOf("."),q.indexOf("["),q.indexOf(":")];};var _28d=function(_28e,_28f){var ql=_28e.length;var i=_28b(_28e);var end=ql;for(var x=_28f;x<i.length;x++){if(i[x]>=0){if(i[x]<end){end=i[x];}}}return (end<0)?ql:end;};var _294=function(_295){return _28d(_295,1);};var _296=function(_297){var i=_28b(_297);if(i[0]!=-1){return _297.substring(i[0]+1,_294(_297));}else{return "";}};var _299=function(_29a){var i=_28b(_29a);if((i[0]==0)||(i[1]==0)){return 0;}else{return _28d(_29a,0);}};var _29c=function(_29d){var _29e=_299(_29d);return ((_29e>0)?_29d.substr(0,_29e).toLowerCase():"*");};var _29f=function(arr){var ret=-1;for(var x=0;x<arr.length;x++){var ta=arr[x];if(ta>=0){if((ta>ret)||(ret==-1)){ret=ta;}}}return ret;};var _2a4=function(_2a5){var i=_28b(_2a5);if(-1==i[1]){return "";}var di=i[1]+1;var _2a8=_29f(i.slice(2));if(di<_2a8){return _2a5.substring(di,_2a8);}else{if(-1==_2a8){return _2a5.substr(di);}else{return "";}}};var _2a9=[{key:"|=",match:function(attr,_2ab){return "[contains(concat(' ',@"+attr+",' '), ' "+_2ab+"-')]";}},{key:"~=",match:function(attr,_2ad){return "[contains(concat(' ',@"+attr+",' '), ' "+_2ad+" ')]";}},{key:"^=",match:function(attr,_2af){return "[starts-with(@"+attr+", '"+_2af+"')]";}},{key:"*=",match:function(attr,_2b1){return "[contains(@"+attr+", '"+_2b1+"')]";}},{key:"$=",match:function(attr,_2b3){return "[substring(@"+attr+", string-length(@"+attr+")-"+(_2b3.length-1)+")='"+_2b3+"']";}},{key:"!=",match:function(attr,_2b5){return "[not(@"+attr+"='"+_2b5+"')]";}},{key:"=",match:function(attr,_2b7){return "[@"+attr+"='"+_2b7+"']";}}];var _2b8=function(val){var re=/^\s+|\s+$/g;return val.replace(re,"");};var _2bb=function(_2bc,_2bd,_2be,_2bf){var _2c0;var i=_28b(_2bd);if(i[2]>=0){var _2c2=_2bd.indexOf("]",i[2]);var _2c3=_2bd.substring(i[2]+1,_2c2);while(_2c3&&_2c3.length){if(_2c3.charAt(0)=="@"){_2c3=_2c3.slice(1);}_2c0=null;for(var x=0;x<_2bc.length;x++){var ta=_2bc[x];var tci=_2c3.indexOf(ta.key);if(tci>=0){var attr=_2c3.substring(0,tci);var _2c8=_2c3.substring(tci+ta.key.length);if((_2c8.charAt(0)=="\"")||(_2c8.charAt(0)=="'")){_2c8=_2c8.substring(1,_2c8.length-1);}_2c0=ta.match(_2b8(attr),_2b8(_2c8));break;}}if((!_2c0)&&(_2c3.length)){_2c0=_2be(_2c3);}if(_2c0){_2bf(_2c0);}_2c3=null;var _2c9=_2bd.indexOf("[",_2c2);if(0<=_2c9){_2c2=_2bd.indexOf("]",_2c9);if(0<=_2c2){_2c3=_2bd.substring(_2c9+1,_2c2);}}}}};var _2ca=function(_2cb){var _2cc=".";var _2cd=_2cb.split(" ");while(_2cd.length){var tqp=_2cd.shift();var _2cf;if(tqp==">"){_2cf="/";tqp=_2cd.shift();}else{_2cf="//";}var _2d0=_29c(tqp);_2cc+=_2cf+_2d0;var id=_296(tqp);if(id.length){_2cc+="[@id='"+id+"'][1]";}var cn=_2a4(tqp);if(cn.length){var _2d3=" ";if(cn.charAt(cn.length-1)=="*"){_2d3="";cn=cn.substr(0,cn.length-1);}_2cc+="[contains(concat(' ',@class,' '), ' "+cn+_2d3+"')]";}_2bb(_2a9,tqp,function(_2d4){return "[@"+_2d4+"]";},function(_2d5){_2cc+=_2d5;});}return _2cc;};var _2d6={};var _2d7=function(path){if(_2d6[path]){return _2d6[path];}var doc=d.doc;var _2da=_2ca(path);var tf=function(_2dc){var ret=[];var _2de;try{_2de=doc.evaluate(_2da,_2dc,null,XPathResult.ANY_TYPE,null);}catch(e){console.debug("failure in exprssion:",_2da,"under:",_2dc);console.debug(e);}var _2df=_2de.iterateNext();while(_2df){ret.push(_2df);_2df=_2de.iterateNext();}return ret;};return _2d6[path]=tf;};var _2e0={};var _2e1={};var _2e2=function(_2e3,_2e4){if(!_2e3){return _2e4;}if(!_2e4){return _2e3;}return function(){return _2e3.apply(window,arguments)&&_2e4.apply(window,arguments);};};var _2e5=function(_2e6,_2e7,_2e8,idx){var nidx=idx+1;var _2eb=(_2e7.length==nidx);var tqp=_2e7[idx];if(tqp==">"){var ecn=_2e6.childNodes;if(!ecn.length){return;}nidx++;var _2eb=(_2e7.length==nidx);var tf=_2ef(_2e7[idx+1]);for(var x=0,te;x<ecn.length,te=ecn[x];x++){if(tf(te)){if(_2eb){_2e8.push(te);}else{_2e5(te,_2e7,_2e8,nidx);}}}}var _2f2=_2f3(tqp)(_2e6);if(_2eb){while(_2f2.length){_2e8.push(_2f2.shift());}}else{while(_2f2.length){_2e5(_2f2.shift(),_2e7,_2e8,nidx);}}};var _2f4=function(_2f5,_2f6){ret=[];var x=_2f5.length-1,te;while(te=_2f5[x--]){_2e5(te,_2f6,ret,0);}return ret;};var _2ef=function(_2f9){if(_2e0[_2f9]){return _2e0[_2f9];}var ff=null;var _2fb=_29c(_2f9);if(_2fb!="*"){ff=_2e2(ff,function(elem){var isTn=((elem.nodeType==1)&&(_2fb==elem.tagName.toLowerCase()));return isTn;});}var _2fe=_296(_2f9);if(_2fe.length){ff=_2e2(ff,function(elem){return ((elem.nodeType==1)&&(elem.id==_2fe));});}if(Math.max.apply(this,_28b(_2f9).slice(1))>=0){ff=_2e2(ff,_300(_2f9));}return _2e0[_2f9]=ff;};var _301=function(node){var pn=node.parentNode;var pnc=pn.childNodes;var nidx=-1;var _306=pn.firstChild;if(!_306){return nidx;}var ci=node["__cachedIndex"];var cl=pn["__cachedLength"];if(((typeof cl=="number")&&(cl!=pnc.length))||(typeof ci!="number")){pn["__cachedLength"]=pnc.length;var idx=1;do{if(_306===node){nidx=idx;}if(_306.nodeType==1){_306["__cachedIndex"]=idx;idx++;}_306=_306.nextSibling;}while(_306);}else{nidx=ci;}return nidx;};var _30a=0;var _30b=function(elem,attr){var _30e="";if(attr=="class"){return elem.className||_30e;}if(attr=="for"){return elem.htmlFor||_30e;}return elem.getAttribute(attr,2)||_30e;};var _30f=[{key:"|=",match:function(attr,_311){var _312=" "+_311+"-";return function(elem){var ea=" "+(elem.getAttribute(attr,2)||"");return ((ea==_311)||(ea.indexOf(_312)==0));};}},{key:"^=",match:function(attr,_316){return function(elem){return (_30b(elem,attr).indexOf(_316)==0);};}},{key:"*=",match:function(attr,_319){return function(elem){return (_30b(elem,attr).indexOf(_319)>=0);};}},{key:"~=",match:function(attr,_31c){var tval=" "+_31c+" ";return function(elem){var ea=" "+_30b(elem,attr)+" ";return (ea.indexOf(tval)>=0);};}},{key:"$=",match:function(attr,_321){var tval=" "+_321;return function(elem){var ea=" "+_30b(elem,attr);return (ea.lastIndexOf(_321)==(ea.length-_321.length));};}},{key:"!=",match:function(attr,_326){return function(elem){return (_30b(elem,attr)!=_326);};}},{key:"=",match:function(attr,_329){return function(elem){return (_30b(elem,attr)==_329);};}}];var _32b=[{key:"first-child",match:function(name,_32d){return function(elem){if(elem.nodeType!=1){return false;}var fc=elem.previousSibling;while(fc&&(fc.nodeType!=1)){fc=fc.previousSibling;}return (!fc);};}},{key:"last-child",match:function(name,_331){return function(elem){if(elem.nodeType!=1){return false;}var nc=elem.nextSibling;while(nc&&(nc.nodeType!=1)){nc=nc.nextSibling;}return (!nc);};}},{key:"empty",match:function(name,_335){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt==1)||(nt==3)){return false;}}return true;};}},{key:"contains",match:function(name,_33c){return function(elem){return (elem.innerHTML.indexOf(_33c)>=0);};}},{key:"not",match:function(name,_33f){var ntf=_2ef(_33f);return function(elem){return (!ntf(elem));};}},{key:"nth-child",match:function(name,_343){var pi=parseInt;if(_343=="odd"){return function(elem){return (((_301(elem))%2)==1);};}else{if((_343=="2n")||(_343=="even")){return function(elem){return ((_301(elem)%2)==0);};}else{if(_343.indexOf("0n+")==0){var _347=pi(_343.substr(3));return function(elem){return (elem.parentNode.childNodes[_347-1]===elem);};}else{if((_343.indexOf("n+")>0)&&(_343.length>3)){var _349=_343.split("n+",2);var pred=pi(_349[0]);var idx=pi(_349[1]);return function(elem){return ((_301(elem)%pred)==idx);};}else{if(_343.indexOf("n")==-1){var _347=pi(_343);return function(elem){return (_301(elem)==_347);};}}}}}}}];var _300=function(_34e){var _34f=(_2e1[_34e]||_2e0[_34e]);if(_34f){return _34f;}var ff=null;var i=_28b(_34e);if(i[0]>=0){var tn=_29c(_34e);if(tn!="*"){ff=_2e2(ff,function(elem){return (elem.tagName.toLowerCase()==tn);});}}var _354;var _355=_2a4(_34e);if(_355.length){var _356=_355.charAt(_355.length-1)=="*";if(_356){_355=_355.substr(0,_355.length-1);}var re=new RegExp("(?:^|\\s)"+_355+(_356?".*":"")+"(?:\\s|$)");ff=_2e2(ff,function(elem){return re.test(elem.className);});}if(i[3]>=0){var _359=_34e.substr(i[3]+1);var _35a="";var obi=_359.indexOf("(");var cbi=_359.lastIndexOf(")");if((0<=obi)&&(0<=cbi)&&(cbi>obi)){_35a=_359.substring(obi+1,cbi);_359=_359.substr(0,obi);}_354=null;for(var x=0;x<_32b.length;x++){var ta=_32b[x];if(ta.key==_359){_354=ta.match(_359,_35a);break;}}if(_354){ff=_2e2(ff,_354);}}var _35f=(d.isIE)?function(cond){return function(elem){return elem[cond];};}:function(cond){return function(elem){return (elem&&elem.getAttribute&&elem.hasAttribute(cond));};};_2bb(_30f,_34e,_35f,function(_364){ff=_2e2(ff,_364);});if(!ff){ff=function(){return true;};}return _2e1[_34e]=ff;};var _365=function(_366){return (Math.max.apply(this,_28b(_366))==-1);};var _367={};var _2f3=function(_368,root){var fHit=_367[_368];if(fHit){return fHit;}var i=_28b(_368);var id=_296(_368);if(i[0]==0){return _367[_368]=function(root){return [d.byId(id)];};}var _36e=_300(_368);var _36f;if(i[0]>=0){_36f=function(root){var te=d.byId(id);if(_36e(te)){return [te];}};}else{var tret;var tn=_29c(_368);if(_365(_368)){_36f=function(root){var ret=[];var te,x=0,tret=root.getElementsByTagName(tn);while(te=tret[x++]){ret.push(te);}return ret;};}else{_36f=function(root){var ret=[];var te,x=0,tret=root.getElementsByTagName(tn);while(te=tret[x++]){if(_36e(te)){ret.push(te);}}return ret;};}}return _367[_368]=_36f;};var _37c={};var _37d={};var _37e=function(_37f){if(0>_37f.indexOf(" ")){return _2f3(_37f);}var sqf=function(root){var _382=_37f.split(" ");var _383;if(_382[0]==">"){_383=[root];root=document;}else{_383=_2f3(_382.shift())(root);}return _2f4(_383,_382);};return sqf;};var _384=((document["evaluate"]&&!d.isSafari)?function(_385){var _386=_385.split(" ");if((document["evaluate"])&&(_385.indexOf(":")==-1)&&((true))){if(((_386.length>2)&&(_385.indexOf(">")==-1))||(_386.length>3)||(_385.indexOf("[")>=0)||((1==_386.length)&&(0<=_385.indexOf(".")))){return _2d7(_385);}}return _37e(_385);}:_37e);var _387=function(_388){if(_37d[_388]){return _37d[_388];}if(0>_388.indexOf(",")){return _37d[_388]=_384(_388);}else{var _389=_388.split(/\s*,\s*/);var tf=function(root){var _38c=0;var ret=[];var tp;while(tp=_389[_38c++]){ret=ret.concat(_384(tp,tp.indexOf(" "))(root));}return ret;};return _37d[_388]=tf;}};var _38f=0;var _zip=function(arr){var ret=new d.NodeList();if(!arr){return ret;}if(arr[0]){ret.push(arr[0]);}if(arr.length<2){return ret;}_38f++;arr[0]["_zipIdx"]=_38f;for(var x=1,te;te=arr[x];x++){if(arr[x]["_zipIdx"]!=_38f){ret.push(te);}te["_zipIdx"]=_38f;}return ret;};d.query=function(_395,root){if(typeof _395!="string"){return new d.NodeList(_395);}if(typeof root=="string"){root=dojo.byId(root);}return _zip(_387(_395)(root||dojo.doc));};d._filterQueryResult=function(_397,_398){var tnl=new d.NodeList();var ff=(_398)?_2ef(_398):function(){return true;};for(var x=0,te;te=_397[x];x++){if(ff(te)){tnl.push(te);}}return tnl;};})();}if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;dojo.provide("dojo._base.xhr");dojo.formToObject=function(_39d){var ret={};var iq="input[type!=file][type!=submit][type!=image][type!=reset][type!=button], select, textarea";dojo.query(iq,_39d).filter(function(node){return (!node.disabled);}).forEach(function(item){var _in=item.name;var type=(item.type||"").toLowerCase();if((type=="radio")||(type=="checkbox")){if(item.checked){ret[_in]=item.value;}}else{if(item.multiple){var ria=ret[_in]=[];dojo.query("option[selected]",item).forEach(function(opt){ria.push(opt.value);});}else{ret[_in]=item.value;if(type=="image"){ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;}}}});return ret;};dojo.objectToQuery=function(map){var ec=encodeURIComponent;var ret="";var _3a9={};for(var x in map){if(map[x]!=_3a9[x]){if(dojo.isArray(map[x])){for(var y=0;y<map[x].length;y++){ret+=ec(x)+"="+ec(map[x][y])+"&";}}else{ret+=ec(x)+"="+ec(map[x])+"&";}}}if((ret.length)&&(ret.charAt(ret.length-1)=="&")){ret=ret.substr(0,ret.length-1);}return ret;};dojo.formToQuery=function(_3ac){return dojo.objectToQuery(dojo.formToObject(_3ac));};dojo.formToJson=function(_3ad){return dojo.toJson(dojo.formToObject(_3ad));};dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dc=decodeURIComponent;dojo.forEach(qp,function(item){if(item.length){var _3b3=item.split("=");var name=_3b3.shift();var val=dc(_3b3.join("="));if(dojo.isString(ret[name])){ret[name]=[ret[name]];}if(dojo.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;};dojo._blockAsync=false;dojo._contentHandlers={"text":function(xhr){return xhr.responseText;},"json":function(xhr){console.debug("please consider using a mimetype of text/json-comment-filtered to avoid potential security issues with JSON endpoints");return dojo.fromJson(xhr.responseText);},"json-comment-optional":function(xhr){var _3b9=xhr.responseText;var _3ba=_3b9.indexOf("/*");var _3bb=_3b9.lastIndexOf("*/");if((_3ba==-1)||(_3bb==-1)){return dojo.fromJson(xhr.responseText);}return dojo.fromJson(_3b9.substring(_3ba+2,_3bb));},"json-comment-filtered":function(xhr){var _3bd=xhr.responseText;var _3be=_3bd.indexOf("/*");var _3bf=_3bd.lastIndexOf("*/");if((_3be==-1)||(_3bf==-1)){console.debug("your JSON wasn't comment filtered!");return "";}return dojo.fromJson(_3bd.substring(_3be+2,_3bf));},"javascript":function(xhr){return dojo.eval(xhr.responseText);},"xml":function(xhr){return xhr.responseXML;}};(function(){dojo._ioSetArgs=function(args,_3c3,_3c4,_3c5){var _3c6={};_3c6.args=args;var _3c7=null;if(args.form){var form=dojo.byId(args.form);_3c6.url=args.url||form.getAttribute("action");_3c7=dojo.formToQuery(form);}else{_3c6.url=args.url;}var qi=_3c6.url.indexOf("?");var _3ca=[{}];if(qi!=-1){_3ca.push(dojo.queryToObject(_3c6.url.substr(qi+1)));_3c6.url=_3c6.url.substr(0,qi);}if(_3c7){_3ca.push(dojo.queryToObject(_3c7));}if(args.content){_3ca.push(args.content);}if(args.preventCache){_3ca.push({"dojo.preventCache":new Date().valueOf()});}_3c6.query=dojo.objectToQuery(dojo.mixin.apply(null,_3ca));_3c6.handleAs=args.handleAs||"text";var d=new dojo.Deferred(_3c3);d.addCallbacks(_3c4,function(_3cc){return _3c5(_3cc,d);});var ld=args.load;if(ld&&dojo.isFunction(ld)){d.addCallback(function(_3ce){return ld.call(args,_3ce,_3c6);});}var err=args.error;if(err&&dojo.isFunction(err)){d.addErrback(function(_3d0){return err.call(args,_3d0,_3c6);});}var _3d1=args.handle;if(_3d1&&dojo.isFunction(_3d1)){d.addBoth(function(_3d2){return _3d1.call(args,_3d2,_3c6);});}d.ioArgs=_3c6;return d;};var _3d3=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;if(typeof xhr.abort=="function"){xhr.abort();}};var _3d6=function(dfd){return dojo._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);};var _3d8=function(_3d9,dfd){console.debug("xhr error in:",dfd.ioArgs.xhr);console.debug(_3d9);return _3d9;};var _3db=function(args){var dfd=dojo._ioSetArgs(args,_3d3,_3d6,_3d8);dfd.ioArgs.xhr=dojo._xhrObj();return dfd;};var _3de=null;var _3df=[];var _3e0=function(){var now=(new Date()).getTime();if(!dojo._blockAsync){dojo.forEach(_3df,function(tif,_3e3){if(!tif){return;}var dfd=tif.dfd;try{if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_3df.splice(_3e3,1);return;}if(tif.ioCheck(dfd)){_3df.splice(_3e3,1);tif.resHandle(dfd);}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){dfd.cancel();_3df.splice(_3e3,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);}}}}catch(e){console.debug(e);dfd.errback(new Error("_watchInFlightError!"));}});}if(!_3df.length){clearInterval(_3de);_3de=null;return;}};dojo._ioWatch=function(dfd,_3e7,_3e8,_3e9){if(dfd.ioArgs.args.timeout){dfd.startTime=(new Date()).getTime();}_3df.push({dfd:dfd,validCheck:_3e7,ioCheck:_3e8,resHandle:_3e9});if(!_3de){_3de=setInterval(_3e0,50);}_3e0();};var _3ea="application/x-www-form-urlencoded";var _3eb=function(dfd){return dfd.ioArgs.xhr.readyState;};var _3ed=function(dfd){return 4==dfd.ioArgs.xhr.readyState;};var _3ef=function(dfd){if(dojo._isDocumentOk(dfd.ioArgs.xhr)){dfd.callback(dfd);}else{dfd.errback(new Error("bad http response code:"+dfd.ioArgs.xhr.status));}};var _3f1=function(type,dfd){var _3f4=dfd.ioArgs;var args=_3f4.args;_3f4.xhr.open(type,_3f4.url,(args.sync!==true),(args.user?args.user:undefined),(args.password?args.password:undefined));if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{_3f4.xhr.setRequestHeader(hdr,args.headers[hdr]);}}}_3f4.xhr.setRequestHeader("Content-Type",(args.contentType||_3ea));try{_3f4.xhr.send(_3f4.query);}catch(e){_3f4.cancel();}dojo._ioWatch(dfd,_3eb,_3ed,_3ef);return dfd;};dojo.xhrGet=function(args){var dfd=_3db(args);var _3f9=dfd.ioArgs;if(_3f9.query.length){_3f9.url+="?"+_3f9.query;_3f9.query=null;}return _3f1("GET",dfd);};dojo.xhrPost=function(args){return _3f1("POST",_3db(args));};dojo.rawXhrPost=function(args){var dfd=_3db(args);dfd.ioArgs.query=args.postData;return _3f1("POST",dfd);};dojo.xhrPut=function(args){return _3f1("PUT",_3db(args));};dojo.rawXhrPut=function(args){var dfd=_3db(args);var _400=dfd.ioArgs;if(args["putData"]){_400.query=args.putData;args.putData=null;}return _3f1("PUT",dfd);};dojo.xhrDelete=function(args){var dfd=_3db(args);var _403=dfd.ioArgs;if(_403.query.length){_403.url+="?"+_403.query;_403.query=null;}return _3f1("DELETE",dfd);};dojo.wrapForm=function(_404){throw new Error("dojo.wrapForm not yet implemented");};})();}if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;dojo.provide("dojo._base.fx");dojo._Line=function(_405,end){this.start=_405;this.end=end;this.getValue=function(n){return ((this.end-this.start)*n)+this.start;};};dojo.Color=function(){this.setColor.apply(this,arguments);};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};dojo.extend(dojo.Color,{_cache:null,setColor:function(){this._cache=[];var d=dojo;var a=arguments;var a0=a[0];var pmap=(d.isArray(a0)?a0:(d.isString(a0)?d.extractRgb(a0):d._toArray(a)));d.forEach(["r","g","b","a"],function(p,i){this._cache[i]=this[p]=parseFloat(pmap[i]);},this);this._cache[3]=this.a=this.a||1;},toRgb:function(_40e){return this._cache.slice(0,((_40e)?4:3));},toRgba:function(){return this._cache.slice(0,4);},toHex:function(){return dojo.rgb2hex(this.toRgb());},toCss:function(){return "rgb("+this.toRgb().join(", ")+")";},toString:function(){return this.toHex();}});dojo.blendColors=function(a,b,_411){if(typeof a=="string"){a=dojo.extractRgb(a);}if(typeof b=="string"){b=dojo.extractRgb(b);}if(a["_cache"]){a=a._cache;}if(b["_cache"]){b=b._cache;}_411=Math.min(Math.max(-1,(_411||0)),1);_411=((_411+1)/2);var c=[];for(var x=0;x<3;x++){c[x]=parseInt(b[x]+((a[x]-b[x])*_411));}return c;};dojo.extractRgb=function(_414){_414=_414.toLowerCase();if(_414.indexOf("rgb")==0){var _415=_414.match(/rgba*\((\d+), *(\d+), *(\d+)/i);var ret=dojo.map(_415.splice(1,3),parseFloat);return ret;}else{return dojo.hex2rgb(_414)||dojo.Color.named[_414]||[255,255,255];}};dojo.hex2rgb=function(hex){var _418="0123456789abcdef";var rgb=new Array(3);if(hex.charAt(0)=="#"){hex=hex.substr(1);}hex=hex.toLowerCase();if(hex.replace(new RegExp("["+_418+"]","g"),"")!=""){return null;}if(hex.length==3){rgb[0]=hex.charAt(0)+hex.charAt(0);rgb[1]=hex.charAt(1)+hex.charAt(1);rgb[2]=hex.charAt(2)+hex.charAt(2);}else{rgb[0]=hex.substr(0,2);rgb[1]=hex.substr(2,2);rgb[2]=hex.substr(4);}for(var i=0;i<rgb.length;i++){rgb[i]=_418.indexOf(rgb[i].charAt(0))*16+_418.indexOf(rgb[i].charAt(1));}return rgb;};dojo.rgb2hex=function(r,g,b){var ret=dojo.map(((r._cache)||((!g)?r:[r,g,b])),function(x,i){var s=(new Number(x)).toString(16);while(s.length<2){s="0"+s;}return s;});ret.unshift("#");return ret.join("");};dojo.declare("dojo._Animation",null,function(args){dojo.mixin(this,args);if(dojo.isArray(this.curve)){this.curve=new dojo._Line(this.curve[0],this.curve[1]);}},{curve:null,duration:1000,easing:null,repeat:0,rate:10,delay:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,_active:false,_paused:false,_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,fire:function(evt,args){if(this[evt]){this[evt].apply(this,args||[]);}return this;},chain:function(_425){dojo.forEach(_425,function(anim,i){var prev=(i==0)?this:_425[i-1];dojo.connect(prev,"onEnd",anim,"play");},this);return this;},combine:function(_429){dojo.forEach(_429,function(anim){dojo.forEach(["beforeBegin","onBegin","onAnimate","onEnd","onPlay","onPause","onStop","play"],function(evt){if(anim[evt]){dojo.connect(this,evt,anim,evt);}},this);},this);return this;},play:function(_42c,_42d){if(_42d){clearTimeout(this._timer);this._active=this._paused=false;this._percent=0;}else{if(this._active&&!this._paused){return this;}}this.fire("beforeBegin");var d=_42c||this.delay;if(d>0){setTimeout(dojo.hitch(this,function(){this.play(null,_42d);}),d);return this;}this._startTime=new Date().valueOf();if(this._paused){this._startTime-=this.duration*this._percent;}this._endTime=this._startTime+this.duration;this._active=true;this._paused=false;var _42f=this.curve.getValue(this._percent);if(this._percent==0){if(!this._startRepeatCount){this._startRepeatCount=this.repeat;}this.fire("onBegin",[_42f]);}this.fire("onPlay",[_42f]);this._cycle();return this;},pause:function(){clearTimeout(this._timer);if(!this._active){return this;}this._paused=true;this.fire("onPause",[this.curve.getValue(this._percent)]);return this;},gotoPercent:function(pct,_431){clearTimeout(this._timer);this._active=this._paused=true;this._percent=pct*100;if(_431){this.play();}return this;},stop:function(_432){clearTimeout(this._timer);if(_432){this._percent=1;}this.fire("onStop",[this.curve.getValue(this._percent)]);this._active=this._paused=false;return this;},status:function(){if(this._active){return this._paused?"paused":"playing";}return "stopped";},_cycle:function(){clearTimeout(this._timer);if(this._active){var curr=new Date().valueOf();var step=(curr-this._startTime)/(this._endTime-this._startTime);if(step>=1){step=1;}this._percent=step;if(this.easing){step=this.easing(step);}this.fire("onAnimate",[this.curve.getValue(step)]);if(step<1){this._timer=setTimeout(dojo.hitch(this,"_cycle"),this.rate);}else{this._active=false;if(this.repeat>0){this.repeat--;this.play(null,true);}else{if(this.repeat==-1){this.play(null,true);}else{if(this._startRepeatCount){this.repeat=this._startRepeatCount;this._startRepeatCount=0;}}}this._percent=0;this.fire("onEnd");}}return this;}});(function(){var _435=function(node){if(dojo.isIE){if(node.style.zoom.length==0&&dojo.style(node,"zoom")=="normal"){node.style.zoom="1";}if(node.style.width.length==0&&dojo.style(node,"width")=="auto"){node.style.width="auto";}}};dojo._fade=function(args){if(typeof args.end=="undefined"){throw new Error("dojo._fade needs an end value");}args.node=dojo.byId(args.node);var _438=dojo.mixin({properties:{}},args);var _439=_438.properties.opacity={};_439.start=(typeof _438.start=="undefined")?function(){return Number(dojo.style(_438.node,"opacity"));}:_438.start;_439.end=_438.end;var anim=dojo.animateProperty(_438);dojo.connect(anim,"beforeBegin",null,function(){_435(_438.node);});return anim;};dojo.fadeIn=function(args){return dojo._fade(dojo.mixin({end:1},args));};dojo.fadeOut=function(args){return dojo._fade(dojo.mixin({end:0},args));};if(dojo.isKhtml&&!dojo.isSafari){dojo._defaultEasing=function(n){return parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2);};}else{dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);};}dojo.animateProperty=function(args){args.node=dojo.byId(args.node);if(!args.easing){args.easing=dojo._defaultEasing;}var _440=function(_441){this._properties=_441;for(var p in _441){var prop=_441[p];if(dojo.isFunction(prop.start)){prop.start=prop.start(prop);}if(dojo.isFunction(prop.end)){prop.end=prop.end(prop);}}this.getValue=function(n){var ret={};for(var p in this._properties){var prop=this._properties[p];var _448=null;if(prop.start instanceof dojo.Color){_448=dojo.rgb2hex(dojo.blendColors(prop.end,prop.start,n));}else{if(!dojo.isArray(prop.start)){_448=((prop.end-prop.start)*n)+prop.start+(p!="opacity"?prop.units||"px":"");}}ret[p]=_448;}return ret;};};var anim=new dojo._Animation(args);dojo.connect(anim,"beforeBegin",anim,function(){var pm=this.properties;for(var p in pm){var prop=pm[p];if(dojo.isFunction(prop.start)){prop.start=prop.start();}if(dojo.isFunction(prop.end)){prop.end=prop.end();}var _44d=(p.toLowerCase().indexOf("color")>=0);if(typeof prop.end=="undefined"){prop.end=dojo.style(this.node,p);}else{if(typeof prop.start=="undefined"){prop.start=dojo.style(this.node,p);}}if(_44d){prop.start=new dojo.Color(prop.start);prop.end=new dojo.Color(prop.end);}else{prop.start=(p=="opacity")?Number(prop.start):parseInt(prop.start);}}this.curve=new _440(pm);});dojo.connect(anim,"onAnimate",anim,function(_44e){for(var s in _44e){dojo.style(this.node,s,_44e[s]);}});return anim;};})();}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"] = true;
dojo.provide("dojo.AdapterRegistry");

dojo.AdapterRegistry = function(/*Boolean?*/ returnWrappers){
	// summary:
	//		A registry to make contextual calling/searching easier.
	// description:
	//		Objects of this class keep list of arrays in the form [name, check,
	//		wrap, directReturn] that are used to determine what the contextual
	//		result of a set of checked arguments is. All check/wrap functions
	//		in this registry should be of the same arity.
	this.pairs = [];
	this.returnWrappers = returnWrappers || false;
}

dojo.extend(dojo.AdapterRegistry, {
	register: function(name, check, /*Function*/ wrap, directReturn, override){
		// summary: 
		//		register a check function to determine if the wrap function or
		//		object gets selected
		// name: String
		//		a way to identify this matcher.
		// check: Function
		//		a function that arguments are passed to from the adapter's
		//		match() function.  The check function should return true if the
		//		given arguments are appropriate for the wrap function.
		// directReturn: Boolean?
		//		If directReturn is true, the value passed in for wrap will be
		//		returned instead of being called. Alternately, the
		//		AdapterRegistry can be set globally to "return not call" using
		//		the returnWrappers property. Either way, this behavior allows
		//		the registry to act as a "search" function instead of a
		//		function interception library.
		// override: Boolean?
		//		If override is given and true, the check function will be given
		//		highest priority. Otherwise, it will be the lowest priority
		//		adapter.
		this.pairs[((override) ? "unshift" : "push")]([name, check, wrap, directReturn]);
	},

	match: function(/* ... */){
    // summary:
		//		Find an adapter for the given arguments. If no suitable adapter
		//		is found, throws an exception. match() accepts any number of
		//		arguments, all of which are passed to all matching functions
		//		from the registered pairs.
		for(var i = 0; i < this.pairs.length; i++){
			var pair = this.pairs[i];
			if(pair[1].apply(this, arguments)){
				if((pair[3])||(this.returnWrappers)){
					return pair[2];
				}else{
					return pair[2].apply(this, arguments);
				}
			}
		}
		throw new Error("No match found");
	},

	unregister: function(name){
		// summary: Remove a named adapter from the registry

		// FIXME: this is kind of a dumb way to handle this. On a large
		// registry this will be slow-ish and we can use the name as a lookup
		// should we choose to trade memory for speed.
		for(var i = 0; i < this.pairs.length; i++){
			var pair = this.pairs[i];
			if(pair[0] == name){
				this.pairs.splice(i, 1);
				return true;
			}
		}
		return false;
	}
});

}
if(!dojo._hasResource["dojo.io.script"]){
dojo._hasResource["dojo.io.script"] = true;
dojo.provide("dojo.io.script");

dojo.io.script = {
	get: function(/*Object*/args){
		//summary: sends a get request using a dynamically created script tag.
		//TODOC: valid arguments.
		var dfd = this._makeScriptDeferred(args);
		var ioArgs = dfd.ioArgs;
		if(ioArgs.query.length){
			ioArgs.url += "?" + ioArgs.query;
		}

		this.attach(ioArgs.id, ioArgs.url);
		dojo._ioWatch(dfd, this._validCheck, this._ioCheck, this._resHandle);
		return dfd;
	},

	attach: function(/*String*/id, /*String*/url){
		//Attaches the script element to the DOM.
		//Use this method if you just want to attach a script to the
		//DOM and do not care when or if it loads.
		var element = document.createElement("script");
		element.type = "text/javascript";
		element.src = url;
		element.id = id;
		document.getElementsByTagName("head")[0].appendChild(element);
	},

	remove: function(/*String*/id){
		//summary: removes the script element with the given id.
		//FIXME: Convert to destroyNode function if/when it exists?
		var node = dojo.byId(id);
		if(node && node.parentNode){
			node.parentNode.removeChild(node);
		}
		if(dojo.isIE){
			node.outerHTML=''; //prevent ugly IE mem leak associated with Node.removeChild (ticket #1727)
		}
	},

	_makeScriptDeferred: function(/*Object*/args){
		//summary: sets up the Deferred object for script request.
		var dfd = dojo._ioSetArgs(args, this._deferredCancel, this._deferredOk, this._deferredError);

		var ioArgs = dfd.ioArgs;
		ioArgs.id = "dojoIoScript" + (this._counter++);
		ioArgs.canDelete = false;

		//Special setup for jsonp case
		if(args.callbackParamName){
			//Add the jsonp parameter.
			ioArgs.query = ioArgs.query || "";
			if(ioArgs.query.length > 0){
				ioArgs.query += "&";
			}
			ioArgs.query += args.callbackParamName + "=dojo.io.script.jsonp_" + ioArgs.id + "._jsonpCallback";

			//Setup the Deferred to have the jsonp callback.
			ioArgs.canDelete = true;
			dfd._jsonpCallback = this._jsonpCallback;
			this["jsonp_" + ioArgs.id] = dfd;
		}
		return dfd;
	},
	
	_deferredCancel: function(/*Deferred*/td){
		//summary: canceller function for dojo._ioSetArgs call.

		//DO NOT use "this" and expect it to be dojo.io.script.
		td.canceled = true;
		if(td.ioArgs.canDelete){
			dojo.io.script._deadScripts.push(td.ioArgs.id);
		}
	},

	_deferredOk: function(/*Deferred*/dfd){
		//summary: okHandler function for dojo._ioSetArgs call.

		//DO NOT use "this" and expect it to be dojo.io.script.
		if(dfd.ioArgs.json){
			//Make sure to *not* remove the json property from the
			//Deferred, so that the Deferred can still function correctly
			//after the response is received.
			return dfd.ioArgs.json;
		}else{
			//FIXME: cannot return the dfd here, otherwise that stops
			//the callback chain in Deferred. So return the ioArgs instead.
			//This doesn't feel right.
			return dfd.ioArgs;
		}
	},
	
	_deferredError: function(/*Error*/error, /*Deferred*/dfd){
		//summary: errHandler function for dojo._ioSetArgs call.

		//DO NOT use "this" and expect it to be dojo.io.script.
		if(td.ioArgs.canDelete){
			dojo.io.script._deadScripts.push(td.ioArgs.id);
		}
		console.debug("dojo.io.script error", error);
		return error;
	},

	_deadScripts: [],
	_counter: 1,

	_validCheck: function(/*Deferred*/dfd){
		//summary: inflight check function to see if dfd is still valid.

		//Do script cleanup here. We wait for one inflight pass
		//to make sure we don't get any weird things by trying to remove a script
		//tag that is part of the call chain (IE 6 has been known to
		//crash in that case).
		var _self = dojo.io.script;
		var deadScripts = _self._deadScripts;
		if(deadScripts && deadScripts.length > 0){
			for(var i = 0; i < deadScripts.length; i++){
				//Remove the script tag
				_self.remove(deadScripts[i]);
				
				//Remove the jsonp callback on dojo.io.script
				if(_self["jsonp_" + deadScripts[i]]){
					delete _self["jsonp_" + deadScripts[i]];
				}
			}
			dojo.io.script._deadScripts = [];
		}

		return true;
	},

	_ioCheck: function(/*Deferred*/dfd){
		//summary: inflight check function to see if IO finished.

		//Check for finished jsonp
		if(dfd.ioArgs.json){
			return true;
		}

		//Check for finished "checkString" case.
		var checkString = dfd.ioArgs.args.checkString;
		if(checkString && eval("typeof(" + checkString + ") != 'undefined'")){
			return true;
		}

		return false;
	},

	_resHandle: function(/*Deferred*/dfd){
		//summary: inflight function to handle a completed response.
		if(dojo.io.script._ioCheck(dfd)){
			dfd.callback(dfd);
		}else{
			//This path should never happen since the only way we can get
			//to _resHandle is if _ioCheck is true.
			dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
		}
	},

	_jsonpCallback: function(/*JSON Object*/json){
		//summary: generic handler for jsonp callback. A pointer
		//to this function is used for all jsonp callbacks.
		//NOTE: the "this" in this function will be the Deferred
		//object that represents the script request.
		this.ioArgs.json = json;
	}
}

}
if(!dojo._hasResource["dojox._cometd.cometd"]){
dojo._hasResource["dojox._cometd.cometd"] = true;
dojo.provide("dojox._cometd.cometd");
dojo.require("dojo.AdapterRegistry");
// FIXME: determine if we can use XMLHTTP to make x-domain posts despite not
//        being able to hear back about the result
dojo.require("dojo.io.script");
// dojo.require("dojo.cookie"); // for peering

/*
 * this file defines Comet protocol client. Actual message transport is
 * deferred to one of several connection type implementations. The default is a
 * forever-frame implementation. A single global object named "cometd" is
 * used to mediate for these connection types in order to provide a stable
 * interface.
 */

dojox.cometd = new function(){

	this.initialized = false;
	this.connected = false;

	this.connectionTypes = new dojo.AdapterRegistry(true);

	this.version = 0.1;
	this.minimumVersion = 0.1;
	this.clientId = null;

	this._isXD = false;
	this.handshakeReturn = null;
	this.currentTransport = null;
	this.url = null;
	this.lastMessage = null;
	this.topics = {};
	this.globalTopicChannels = {};
	this.backlog = [];
	this.handleAs="json-comment-optional";
	this.advice;

	this.tunnelInit = function(childLocation, childDomain){
		// placeholder
	}

	this.tunnelCollapse = function(){
		console.debug("tunnel collapsed!");
		// placeholder
	}

	this.init = function(props, root, bargs){
		if(dojo.isString(props)){
			var oldRoot = root;
			root = props;
			props = oldRoot;
		}
		// FIXME: if the root isn't from the same host, we should automatically
		// try to select an XD-capable transport
		props = props||{};
		// go ask the short bus server what we can support
		props.version = this.version;
		props.minimumVersion = this.minimumVersion;
		props.channel = "/meta/handshake";

        props.ext = { "json-comment-filtered": true };

		// FIXME: what about ScriptSrcIO for x-domain comet?
		this.url = root||djConfig["cometdRoot"];
		if(!this.url){
			console.debug("no cometd root specified in djConfig and no root passed");
			return;
		}
		
		// FIXME: we need to select a way to handle JSONP-style stuff
		// generically here. We already know if the server is gonna be on
		// another domain (or can know it), so we should select appropriate
		// negotiation methods here as well as in final transport type
		// selection.
		var bindArgs = {
			url: this.url,
			handleAs: this.handleAs,
			content: { "message": dojo.toJson([props]) },
			callbackParamName: "jsonp", // usually ignored
			load: dojo.hitch(this, "finishInit"),
			error: function(e){ console.debug("handshake error!:", e); }
		};

		// borrowed from dojo.uri.Uri in lieu of fixed host and port properties
        var regexp = "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
		var r = (""+window.location).match(new RegExp(regexp));
		if(r[4]){
			var tmp = r[4].split(":");
			var thisHost = tmp[0];
			var thisPort = tmp[1]||"80"; // FIXME: match 443

			r = this.url.match(new RegExp(regexp));
			if(r[4]){
				tmp = r[4].split(":");
				var urlHost = tmp[0];
				var urlPort = tmp[1]||"80";
				this._isXD = ((urlHost != thisHost)||(urlPort != thisPort));
			}
		}
		if(bargs){
			dojo.mixin(bindArgs, bargs);
		}
		if(this._isXD){
			return dojo.io.script.get(bindArgs);
		}else{
			return dojo.xhrPost(bindArgs);
		}
	}

	this.finishInit = function(data){
		data = data[0];
		this.handshakeReturn = data;
		// pick a transport
		if (data["advice"]){
			this.advice = data.advice;
		}
		
		// TODO remove authSuccessful when all clients updated to the spec
		if((!data.successful)&&(!data.authSuccessful)){  
			console.debug("cometd init failed");
			// TODO follow advice
			return;
		}
		if(data.version < this.minimumVersion){
			console.debug("cometd protocol version mismatch. We wanted", this.minimumVersion, "but got", data.version);
			return;
		}
		this.currentTransport = this.connectionTypes.match(
			data.supportedConnectionTypes,
			data.version,
			this._isXD
		);
		this.currentTransport.version = data.version;
		this.clientId = data.clientId;
		this.tunnelInit = dojo.hitch(this.currentTransport, "tunnelInit");
		this.tunnelCollapse = dojo.hitch(this.currentTransport, "tunnelCollapse");

		this.currentTransport.startup(data);
		while(this.backlog.length != 0){
			var cur = this.backlog.shift();
			var fn = cur.shift();
			this[fn].apply(this, cur);
		}

		dojo.addOnUnload(dojox.cometd,"disconnect");
	}

	this._getRandStr = function(){
		return Math.random().toString().substring(2, 10);
	}

	// public API functions called by cometd or by the transport classes
	this.deliver = function(messages){
		// console.debug(messages);
		dojo.forEach(messages, this._deliver, this);
		return messages;
	}

	this._deliver = function(message){
		// dipatch events along the specified path
		if(!this.currentTransport){
			this.backlog.push(["deliver", message]);
			return;
		}

		if(!message["channel"]){
			if(message["success"] !== true){
				console.debug("cometd error: no channel for message!", message);
				return;
			}
		}
		this.lastMessage = message;

		if(message.advice){
			this.advice = message.advice; // TODO maybe merge?
		}

		// check to see if we got a /meta channel message that we care about
		if(	(message["channel"]) &&
			(message.channel.length > 5)&&
			(message.channel.substr(0, 5) == "/meta")){
			// check for various meta topic actions that we need to respond to
			switch(message.channel){
				case "/meta/subscribe":
					if(!message.successful){
						console.debug("cometd subscription error for channel", message.channel, ":", message.error);
						return;
					}
					dojox.cometd.subscribed(message.subscription, message);
					break;
				case "/meta/unsubscribe":
					if(!message.successful){
						console.debug("cometd unsubscription error for channel", message.channel, ":", message.error);
						return;
					}
					this.unsubscribed(message.subscription, message);
					break;
			}
		}
		// send the message down for processing by the transport
		this.currentTransport.deliver(message);

		if(message.data){
			// dispatch the message to any locally subscribed listeners
			var tname = (this.globalTopicChannels[message.channel]) ? message.channel : "/cometd"+message.channel;
			dojo.publish(tname, [ message ]);
		}
	}

	this.disconnect = function(){
		if(!this.currentTransport){
			console.debug("no current transport to disconnect from");
			return;
		}
		this.currentTransport.disconnect();
	}

	// public API functions called by end users
	this.publish = function(/*string*/channel, /*object*/data, /*object*/properties){
		// summary: 
		//		publishes the passed message to the cometd server for delivery
		//		on the specified topic
		// channel:
		//		the destination channel for the message
		// data:
		//		a JSON object containing the message "payload"
		// properties:
		//		Optional. Other meta-data to be mixed into the top-level of the
		//		message
		if(!this.currentTransport){
			this.backlog.push(["publish", channel, data, properties]);
			// console.debug(this.backlog);
			return;
		}
		var message = {
			data: data,
			channel: channel
		};
		if(properties){
			dojo.mixin(message, properties);
		}
		return this.currentTransport.sendMessage(message);
	}

	this.subscribe = function(	/*string*/				channel, 
								/*boolean, optional*/	useLocalTopics, 
								/*object, optional*/	objOrFunc, 
								/*string, optional*/	funcName){ // return: boolean
		// summary:
		//		inform the server of this client's interest in channel
		// channel:
		//		name of the cometd channel to subscribe to
		// useLocalTopics:
		//		Determines if up a local event topic subscription to the passed
		//		function using the channel name that was passed is constructed,
		//		or if the topic name will be prefixed with some other
		//		identifier for local message distribution. Setting this to
		//		"true" is a good way to hook up server-sent message delivery to
		//		pre-existing local topics.
		// objOrFunc:
		//		an object scope for funcName or the name or reference to a
		//		function to be called when messages are delivered to the
		//		channel
		// funcName:
		//		the second half of the objOrFunc/funcName pair for identifying
		//		a callback function to notifiy upon channel message delivery

		if(!this.currentTransport){
			this.backlog.push(["subscribe", channel, useLocalTopics, objOrFunc, funcName]);
			return;
		}

		if(useLocalTopics!==true && useLocalTopics!==false){
			// similar to: function(channel, objOrFunc, funcName, useLocalTopics);
			var ofn = funcName;
			funcName = objOrFunc;
			objOrFunc = useLocalTopics;
			useLocalTopics = ofn;
		}
		// console.debug(objOrFunc, funcName);

		if(objOrFunc){
			var tname = (useLocalTopics) ? channel : "/cometd"+channel;
			if(useLocalTopics){
				this.globalTopicChannels[channel] = true;
			}
			var topic = dojo.subscribe(tname, objOrFunc, funcName);
			this.topics[tname] = topic;
		}
		// FIXME: would we handle queuing of the subscription if not connected?
		// Or should the transport object?
		return this.currentTransport.sendMessage({
			channel: "/meta/subscribe",
			subscription: channel
		});
	}

	this.subscribed = function(	/*string*/				channel, 
								/*obj*/					message){
		// console.debug(channel, message);
	}

	this.unsubscribe = function(/*string*/				channel, 
								/*boolean, optional*/	useLocalTopics, 
								/*object, optional*/	objOrFunc, 
								/*string, optional*/	funcName){ // return: boolean
		// summary:
		//		inform the server of this client's disinterest in channel
		// channel:
		//		name of the cometd channel to subscribe to
		// useLocalTopics:
		//		Determines if up a local event topic subscription to the passed
		//		function using the channel name that was passed is destroyed,
		//		or if the topic name will be prefixed with some other
		//		identifier for stopping message distribution.
		// objOrFunc:
		//		an object scope for funcName or the name or reference to a
		//		function to be called when messages are delivered to the
		//		channel
		// funcName:
		//		the second half of the objOrFunc/funcName pair for identifying
		if(!this.currentTransport){
			this.backlog.push(["unsubscribe", channel, useLocalTopics, objOrFunc, funcName]);
			return;
		}
		
		if(useLocalTopics!==true && useLocalTopics!==false){
			// similar to: function(channel, objOrFunc, funcName, useLocalTopics);
			var ofn = funcName;
			funcName = objOrFunc;
			objOrFunc = useLocalTopics;
			useLocalTopics = ofn;
		}
		
		//		a callback function to notifiy upon channel message delivery
		if(objOrFunc){
			// FIXME: should actual local topic unsubscription be delayed for
			// successful unsubcribe notices from the other end? (guessing "no")
			// FIXME: if useLocalTopics is false, should we go ahead and
			// destroy the local topic?
			var tname = (useLocalTopics) ? channel : "/cometd"+channel;
			dojo.unsubscribe(this.topics[tname]);
		}
		return this.currentTransport.sendMessage({
			channel: "/meta/unsubscribe",
			subscription: channel
		});
	}

	this.unsubscribed = function(/*string*/				channel, 
								/*obj*/					message){
		// console.debug(channel, message);
	}

	// FIXME: add an "addPublisher" function
}

/*
transport objects MUST expose the following methods:
	- check
	- startup
	- sendMessage
	- deliver
	- disconnect
optional, standard but transport dependent methods are:
	- tunnelCollapse
	- tunnelInit

Transports SHOULD be namespaced under the cometd object and transports MUST
register themselves with cometd.connectionTypes

here's a stub transport defintion:

cometd.blahTransport = new function(){
	this.lastTimestamp = null;
	this.lastId = null;

	this.check = function(types, version, xdomain){
		// summary:
		//		determines whether or not this transport is suitable given a
		//		list of transport types that the server supports
		return dojo.lang.inArray(types, "blah");
	}

	this.startup = function(){
		if(dojox.cometd.connected){ return; }
		// FIXME: fill in startup routine here
		dojox.cometd.connected = true;
	}

	this.sendMessage = function(message){
		// FIXME: fill in message sending logic
	}

	this.deliver = function(message){
		if(message["timestamp"]){
			this.lastTimestamp = message.timestamp;
		}
		if(message["id"]){
			this.lastId = message.id;
		}
		if(	(message.channel.length > 5)&&
			(message.channel.substr(0, 5) == "/meta")){
			// check for various meta topic actions that we need to respond to
			// switch(message.channel){
			// 	case "/meta/connect":
			//		// FIXME: fill in logic here
			//		break;
			//	// case ...: ...
			//	}
		}
	}

	this.disconnect = function(){
		if(!dojox.cometd.connected){ return; }
		// FIXME: fill in shutdown routine here
		dojox.cometd.connected = false;
	}
}
cometd.connectionTypes.register("blah", cometd.blahTransport.check, cometd.blahTransport);
*/

dojox.cometd.longPollTransport = new function(){
	this.lastTimestamp = null;
	this.lastId = null;
	this.backlog = [];

	this.check = function(types, version, xdomain){
		return ((!xdomain)&&(dojo.indexOf(types, "long-polling") >= 0));
	}

	this.tunnelInit = function(){
		if(dojox.cometd.connected){ return; }
		// FIXME: open up the connection here
		this.openTunnelWith({
			message: dojo.toJson([
				{
					channel:	"/meta/connect",
					clientId:	dojox.cometd.clientId,
					connectionType: "long-polling"
				}
			])
		});
	}

	this.tunnelCollapse = function(){
		if(!dojox.cometd.connected){
			// try to restart the tunnel
			dojox.cometd.connected = false;
			
			// TODO handle transport specific advice
			
			if(dojox.cometd["advice"]){
				if(dojox.cometd.advice["reconnect"]=="none"){
					return;
				}
			
	            if(	(dojox.cometd.advice["interval"])&&
					(dojox.cometd.advice.interval>0) ){
					setTimeout(function(){
						dojox.cometd.currentTransport._reconnect();
					}, dojox.cometd.advice.interval);
				}else{
					this._reconnect();
				}
			}else{
				this._reconnect();
			}
	    }
	}	
			
	this._reconnect = function(){
		if(	(dojox.cometd["advice"])&&
			(dojox.cometd.advice["reconnect"]=="handshake")
		){
			dojox.cometd.init(null,dojox.cometd.url);
 		}else if (dojox.cometd.initialized){
			this.openTunnelWith({
				message: dojo.toJson([
					{
						channel:	"/meta/reconnect",
						connectionType: "long-polling",
						clientId:	dojox.cometd.clientId,
						timestamp:	this.lastTimestamp,
						id:			this.lastId
					}
				])
			});
		}
	}

	this.deliver = function(message){
		// console.debug(message);
		// handle delivery details that this transport particularly cares
		// about. Most functions of should be handled by the main cometd object
		// with only transport-specific details and state being tracked here.
		if(message["timestamp"]){
			this.lastTimestamp = message.timestamp;
		}
		if(message["id"]){
			this.lastId = message.id;
		}

		// check to see if we got a /meta channel message that we care about
		if(	(message.channel.length > 5)&&
			(message.channel.substr(0, 5) == "/meta")){
			// check for various meta topic actions that we need to respond to
			switch(message.channel){
				case "/meta/connect":
					if(!message.successful){
						console.debug("cometd connection error:", message.error);
						return;
					}
					dojox.cometd.initialized = true;
					this.processBacklog();
					break;
				case "/meta/reconnect":
					if(!message.successful){
						console.debug("cometd reconnection error:", message.error);
						return;
					}
					break;
				case "/meta/subscribe":
					if(!message.successful){
						console.debug("cometd subscription error for channel", message.channel, ":", message.error);
						return;
					}
					dojox.cometd.subscribed(message.channel);
					// console.debug(message.channel);
					break;
			}
		}
	}

	this.openTunnelWith = function(content, url){
		// console.debug("openTunnelWith:", content, (url||cometd.url));
		var d = dojo.xhrPost({
			url: (url||dojox.cometd.url),
			content: content,
			handleAs: dojox.cometd.handleAs,
			load: dojo.hitch(this, function(data){
				// console.debug(evt.responseText);
				// console.debug(data);
		                dojox.cometd.connected = false;
				dojox.cometd.deliver(data);
				this.tunnelCollapse();
			}),
			error: function(err){ 
				console.debug("tunnel opening failed:", err);
				dojo.cometd.connected = false;

				// TODO - follow advice to reconnect or rehandshake?
			}
		});
		dojox.cometd.connected = true;
	}

	this.processBacklog = function(){
		while(this.backlog.length > 0){
			this.sendMessage(this.backlog.shift(), true);
		}
	}

	this.sendMessage = function(message, bypassBacklog){
		if((bypassBacklog)||(dojox.cometd.initialized)){
			message.clientId = dojox.cometd.clientId;

			return dojo.xhrPost({
				url: dojox.cometd.url||djConfig["cometdRoot"],
				handleAs: dojox.cometd.handleAs,
				load: dojo.hitch(dojox.cometd, "deliver"),
				content: { 
					message: dojo.toJson([ message ]) 
				}
			});
		}else{
			this.backlog.push(message);
		}
	}

	this.startup = function(handshakeData){
		if(dojox.cometd.initialized){ return; }
		this.tunnelInit();
	}

	this.disconnect = function(){
		if(!dojox.cometd.initialized){ return; }
        
		dojo.xhrPost({
			url: dojox.cometd.url||djConfig["cometdRoot"],
			handleAs: dojox.cometd.handleAs,
			content: { 
				message: dojo.toJson([{  
				    channel:	"/meta/disconnect",
				    clientId:	dojox.cometd.clientId
				}])
			}
		});
		
		dojox.cometd.initialized=false;
	}
}

dojox.cometd.callbackPollTransport = new function(){
	this.lastTimestamp = null;
	this.lastId = null;
	this.backlog = [];

	this.check = function(types, version, xdomain){
		// we handle x-domain!
		return (dojo.indexOf(types, "callback-polling") >= 0);
	}

	this.tunnelInit = function(){
		if(dojox.cometd.connected){ return; }
		// FIXME: open up the connection here
		this.openTunnelWith({
			message: dojo.toJson([
				{
					channel:	"/meta/connect",
					clientId:	dojox.cometd.clientId,
					connectionType: "callback-polling"
				}
			])
		});
	}

	this.tunnelCollapse = function(){
	        // TODO implement advice handling
		if(!dojox.cometd.connected){
			// try to restart the tunnel
			this.openTunnelWith({
				message: dojo.toJson([
					{
						channel:	"/meta/reconnect",
						connectionType: "long-polling",
						clientId:	dojox.cometd.clientId,
						timestamp:	this.lastTimestamp,
						id:		this.lastId
					}
				])
			});
		}
	}

	// the logic appears to be the same
	this.deliver = dojox.cometd.longPollTransport.deliver;

	this.openTunnelWith = function(content, url){
		// create a <script> element to generate the request
		dojo.io.script.get({
			load: dojo.hitch(this, function(data){
				dojox.cometd.connected = false;
				dojox.cometd.deliver(data);
				this.tunnelCollapse();
			}),
			error: function(){ 
				dojox.cometd.connected = false;
				console.debug("tunnel opening failed"); 
			},
			url: (url||dojox.cometd.url),
			content: content,
			handleAs: dojox.cometd.handleAs,
			callbackParamName: "jsonp"
		});
		dojox.cometd.connected = true;
	}

	this.processBacklog = function(){
		while(this.backlog.length > 0){
			this.sendMessage(this.backlog.shift(), true);
		}
	}

	this.sendMessage = function(message, bypassBacklog){
		if((bypassBacklog)||(dojox.cometd.initialized)){
			message.clientId = dojox.cometd.clientId;
			var bindArgs = {
				url: dojox.cometd.url||djConfig["cometdRoot"],
				handleAs: dojox.cometd.handleAs,
				load: dojo.hitch(dojox.cometd, "deliver"),
				callbackParamName: "jsonp",
				content: { message: dojo.toJson([ message ]) }
			};
			return dojo.io.script.get(bindArgs);
		}else{
			this.backlog.push(message);
		}
	}

	this.startup = function(handshakeData){
		if(dojox.cometd.initialized){ return; }
		this.tunnelInit();
	}

	this.disconnect = dojox.cometd.longPollTransport.disconnect;
}
dojox.cometd.connectionTypes.register("long-polling", dojox.cometd.longPollTransport.check, dojox.cometd.longPollTransport);
dojox.cometd.connectionTypes.register("callback-polling", dojox.cometd.callbackPollTransport.check, dojox.cometd.callbackPollTransport);

}
if(!dojo._hasResource["dojox.cometd"]){
dojo._hasResource["dojox.cometd"] = true;
// stub loader for the cometd module since no implementation code is allowed to live in top-level files
dojo.provide("dojox.cometd");
dojo.require("dojox._cometd.cometd");

}
