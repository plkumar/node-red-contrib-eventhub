module.exports = function(RED) {
    "use strict";

	var eventHubClient = require("event-hub-client");
	
    function EventHubNode(config) {
        RED.nodes.createNode(this,config);
		this.server = RED.nodes.getNode(config.server);
		
        //console.log(JSON.stringify(config));

		var client = eventHubClient.restClient(
        config.serviceBusNamespace,
        config.eventHubName,
        config.sharedAccessKeyName,
        config.sharedAccessKey);
    
        console.log("Initializing the evenhub node.");

        this.on('input', function(msg) {
			client.sendMessage(JSON.stringify(msg), null ,function(err,statusCode){
                if(err) {
                    console.log(err);
                    console.log(statusCode);
                }
            });
            //console.log('message:' + JSON.stringify(msg));
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
}

