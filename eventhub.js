module.exports = function(RED) {
    "use strict";

	var eventHubClient = require("event-hub-client");
	
    function LogEntriesNode(config) {
        RED.nodes.createNode(this,config);
		this.server = RED.nodes.getNode(config.server);
		
		var client = eventHubClient.restClient(
        serviceBusNamespace,
        eventHubName,
        sharedAccessKeyName,
        sharedAccessKey);
    

        this.on('input', function(msg) {
			//for debug: console.log('logentries:' + JSON.stringify(msg));
			//client.sendMessage(msg);
            console.log('logentries:' + JSON.stringify(msg));
        });
        
		this.on("close", function () {
            try {
                //delete client;
                console.log("received close event");

            } catch (error) {
            }
        });
    }
    RED.nodes.registerType("eventhub in",LogEntriesNode);
	
	function RemoteServerNode(config) {
        RED.nodes.createNode(this,config);
        this.serviceBusNamespace = config.serviceBusNamespace;
        this.eventHubName = config.eventHubName;
		this.sharedAccessKeyName = config.sharedAccessKeyName;
		this.sharedAccessKey = config.sharedAccessKey;
    }
    RED.nodes.registerType("eventhub",RemoteServerNode);
}

