module.exports = function(RED) {
    "use strict";

	var eventHubClient = require("event-hub-client");
	
    function EventHubNode(config) {
        RED.nodes.createNode(this,config);
		this.server = RED.nodes.getNode(config.server);
		
        console.log(JSON.stringify(config));

		var client = eventHubClient.restClient(
        config.serviceBusNamespace,
        config.eventHubName,
        config.sharedAccessKeyName,
        config.sharedAccessKey);
    
        console.log("Initializing the evenhub node.");

        this.on('input', function(msg) {
			//for debug: console.log('logentries:' + JSON.stringify(msg));
			//client.sendMessage(msg);
            console.log('message:' + JSON.stringify(msg));
        });
        
		this.on("close", function () {
            try {
                //delete client;
                console.log("received close event");

            } catch (error) {
            }
        });
    }
    
    RED.nodes.registerType("eventhub", EventHubNode);
	
	// function RemoteServerNode(config) {

 //        RED.nodes.createNode(this,config);
 //        this.serviceBusNamespace = config.serviceBusNamespace;
 //        this.eventHubName = config.eventHubName;
	// 	this.sharedAccessKeyName = config.sharedAccessKeyName;
	// 	this.sharedAccessKey = config.sharedAccessKey;
 //    }
 //    RED.nodes.registerType("eventhub",RemoteServerNode);
}

