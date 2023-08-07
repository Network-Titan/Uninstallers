/*! $FileVersion=1.1.426 */ var dataset_fileVersion = "1.1.426"; 
function CreateDataset(){function b(c){this._name=c;if(!this._name){throw"Dataset created with no name provided"}}b.prototype={initialize:function(d){try{if(!d){this._logError("No configuration defined");return false}var c=d.data_items;if(!c){this._logError("Invalid Data items. Config ("+JSON.stringify(d)+")");return false}this._itemsList=c;var f=d.refresh;this._setRefresh(f);this._logInformation("Initialization complete");return true}catch(g){this._logError("initialize: "+g.message);return false}},get:function(c){try{return this.getContent()[c]}catch(d){this._logError("get: "+d.message)}},getContent:function(){try{this._logInformation("getContent starting");this._logInformation("itemsList"+JSON.stringify(this._itemsList));var d=ModuleManager.getSingleton("data_collector");if(this.dirty){d.markDataExpired(this._itemsList);this.dirty=false}return d.get(this._itemsList)}catch(c){this._logError("getContent: "+c.message)}},isDirty:function(){try{if(this.dirty){return true}var d=ModuleManager.getSingleton("data_collector");return d.isExpired(this._itemsList)}catch(c){this._logError("isExpired: "+c.message);return false}},_setRefresh:function(c){if(!c){return}this._createDatasetRefreshTimer(c,this)},_createDatasetRefreshTimer:function(d,f){var e=d.useEngineDefaultTimeout;var c=d.timeoutInterval;if(e){c=engine.datasetsRefreshRate}if(!c){return}setInterval(c,function(){try{f.dirty=true;f._logInformation("Marking dirty flag to true")}catch(g){logError("_createDatasetRefreshTimer: "+g.message)}})},dirty:true,_itemsList:[],_logError:function(c){logError("dataset("+this._name+"): "+c)},_logInformation:function(c){logInformation("dataset("+this._name+"): "+c)}};var a={setup:function(){this._logInformation("Setup Started");try{var c=JSONManager.getSingleton("datasets_catalog");this.datasets_catalog=c.data;this._createWatchList()}catch(d){logError("datasets_catalog: Setup failed: "+d.message);return}this._logInformation("Setup Complete")},get:function(c){var d=this._create(c);if(d.isDirty()){this._checkForChange(c,d)}return d},_createWatchList:function(){for(var e in this._preconfigured_detections){if(this._watchList[e]==null){this._watchList[e]=[]}for(var c in this._preconfigured_detections[e]){var d=this._preconfigured_detections[e][c]["key"];this._watchList[e].push(d)}}},_add:function(c,d){this._datasets[c]=d},_create:function(c){var d=this._datasets[c];if(d){return d}var d=new b(c);d.initialize(this.datasets_catalog[c]);this._add(c,d);return d},_checkForChange:function(h,i){try{if(engine.aleStaticInegration()){logWarning("Not checking for datasets change, since this is static ALE integration");return}if((h==null)||(h==undefined)){return}var t=this._watchList[h];if((t==null)||(t==undefined)){return}var g="analytics_dataset_"+h+"_content";var o=this._cachedData[g];if(!o){o=StorageManager.get(g)}var u=i.getContent();if(null==o){o="{}"}logDebug("Retrieved watch list information for dataset: "+h);o=JSON.parse(o);var k={};var q=escape("[ruleMismatch]");var p=escape("[unknown]");var r=escape("[not assigned]");var c=escape("[null]");var f=[];for(var l in t){var v=t[l];if((v==null)||(v==undefined)){continue}var m=o[v];var j=escape(u[v]);k[v]=((q==j)||(p==j))?m:j;if(m==j){continue}if(q==j){continue}if(q==m){continue}if(p==j){continue}if((p==m)||(r==m)||(null==m)||(undefined==m)||("null"==m)||("undefined"==m)||(c==m)){m=null}var d={datasetName:h,key:v,oldValue:m,newValue:j};f.push(d)}var n=JSON.stringify(k);this._cachedData[g]=n;StorageManager.set(g,n);for(var l in f){this._sendContextChangedEvent(f[l])}}catch(s){logError("Exception while calling _checkForChange: "+s.message)}},_sendContextChangedEvent:function(e){this._sendAnalyticsDetectEvent(e);if(null==e.oldValue){return}var c={UniqueIdentifier:"analytics_dataset_value_changed",type:"event",payload:{"Tracker.Type":"event",hit_category_0:"Analytics.Content",hit_category_1:e.datasetName,hit_action:"Value.Changed",hit_label_0:e.key,hit_label_1:e.oldValue,hit_label_2:e.newValue}};logNormal("Detected change for key: "+e.key+". In dataset: "+e.datasetName+". Going to send an event");var d=ModuleManager.getSingleton("event_handler");d.handleV1Record(c)},_sendAnalyticsDetectEvent:function(h){var g=this._preconfigured_detections[h.datasetName];if(!g){return false}for(var j in g){try{var l=g[j];if(l.key!=h.key){continue}if(l.event_id==null||l.event_id==""){continue}var i=(l.from!=null)?new RegExp(l.from):null;var c=(l.to!=null)?new RegExp(l.to):null;if(i!=null&&!i.test(h.oldValue)){continue}if(i==null&&h.oldValue!=null){continue}if(c!=null&&!c.test(h.newValue)){continue}if(c==null&&h.newValue!=null){continue}var d={UniqueIdentifier:l.event_id,type:"event",payload:{"Tracker.Type":"event",hit_category_0:"Analytics.Content",hit_category_1:h.datasetName,hit_action:"Value.Changed",hit_label_0:h.key,hit_label_1:h.oldValue,hit_label_2:h.newValue}};logNormal("Detected dataset item change flow: "+h.key+". Going to send an event");var k=ModuleManager.getSingleton("event_handler");k.handleV1Record(d);return true}catch(f){logError("_sendAnalyticsDetectEvent: "+f.message)}}return false},_cachedData:{},_watchList:{},_preconfigured_detections:{wss:[{event_id:"analytics_detect_product_wss_paid",key:"WSS.IsTrial",from:"1",to:"0"},{event_id:"analytics_detect_product_wss_registered",key:"WSS.User.Registered",from:"false",to:"true"},{event_id:"analytics_detect_product_csp_client_id_changed",key:"WSS.CSP.ClientId",from:".*",to:".*"},{event_id:"analytics_detect_product_wss_affiliate_id_changed",key:"WSS.Affiliate.ID",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_flex_pkg_id_changed",key:"WSS.Flex.Package.ID",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_expiry_dt_changed",key:"WSS.Expiry.Date.ISO",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_extended_expiry_dt_changed",key:"WSS.Extended.Expiry.Date.ISO",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_product_key_changed",key:"WSS.Product.Key",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_wsc_protection_status_changed",key:"WSS.WSC.Protection.Status",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_pkg_id_changed",key:"WSS.Package.ID",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_product_wss_entitlement_received",key:"product_wss_entitlement_status_entitled",from:"false",to:"true"},{event_id:"analytics_detect_product_wss_oem_oobe_complete",key:"product_wss_oem_oobe_complete",from:"(null|0)",to:"1"}],device:[{event_id:"analytics_detect_device_msft_guid_changed",key:"Device.Microsoft.Machine.Guid",from:"^((?!^null$).)*$",to:".*"},{event_id:"analytics_detect_device_antimalware_enabled_changed",key:"Device.Antimalware.Provider.Enabled",from:"^((?!^null$).)*$",to:".*"}],ngm:[{event_id:"analytics_detect_wss_ngm_enabled",key:"NGM.Enabled",from:"false",to:"true"}]},_datasets:{},datasets_catalog:{},_logInformation:function(c){logInformation("_datasetsManager: "+c)},_logError:function(c){logError("_datasetsManager: "+c)}};a.setup();return a}ModuleManager.registerFactory("dataset",CreateDataset);
//921469A36BD851B36EEBA286E9B52B15E67C094595842653D5EA6B4268E30A44A8F8E820DCE0A331DF6CA5B88596511043FED8C9BB4D148205776A0E374A5CD5++