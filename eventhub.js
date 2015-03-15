module.exports = function(RED) {
    "use strict";

	var eventHubClient = require("event-hub-client");
	
    function EventHubNode(config) {
        RED.nodes.createNode(this,config);
		//this.server = RED.nodes.getNode(config.server);
        //console.log(JSON.stringify(config));

		// var client = eventHubClient.restClient(
        //       config.serviceBusNamespace,
        //       config.eventHubName,
        //       config.sharedAccessKeyName,
        //       config.sharedAccessKey);
    
        console.log("Initializing the eventhub node.");
        console.log(JSON.stringify(config));

        var sbus = require('node-sbus-amqp10');
            var hub = sbus.EventHubClient(config.serviceBusNamespace,
                config.eventHubName,
                config.sharedAccessKeyName,
                config.sharedAccessKey);

        this.on('input', function(msg) {
			
            // client.sendMessage(JSON.stringify(msg), null ,function(err,statusCode){
            //     if(err) {
            //         console.log(err);
            //         console.log(statusCode);
            //     }
            // });

            var partitionKey = Math.floor(Math.random() * 10000).toString();

            console.log('message:' + JSON.stringify(msg));

            hub.send(msg, partitionKey, function(tx_err) {
                console.log(tx_err); 
            });
            
        });
        
		this.on("close", function () {
            try {
                hub = null;
                sbus = null;
                
                console.log("received close event");

            } catch (error) {
            }
        });
    }
    
    RED.nodes.registerType("eventhub", EventHubNode);
}
