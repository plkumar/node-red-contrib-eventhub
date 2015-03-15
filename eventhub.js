module.exports = function(RED) {
    "use strict";

    function EventHubNode(config) {
        RED.nodes.createNode(this,config);
		//this.server = RED.nodes.getNode(config.server);
   
        this.log("Initializing the eventhub node.");
        //console.log(JSON.stringify(config));
        if(config.serviceBusNamespace == "" ||
            config.eventHubName=="" ||
            config.sharedAccessKeyName ||
            config.sharedAccessKey) {
            this.warn("EventHub configuration not provided or incorrect.");
            this.status({fill:"red",shape:"ring",text:"disconnected"});
        }

        var sbus = require('node-sbus-amqp10');
        var hub = sbus.EventHubClient(config.serviceBusNamespace,
            config.eventHubName,
            config.sharedAccessKeyName,
            config.sharedAccessKey);

        if(hub) {
            this.status({fill:"green",shape:"dot",text:"connected"});
        }

        this.on('input', function(msg) {
			
            var partitionKey = Math.floor(Math.random() * 10000).toString();

            this.log('message:' + JSON.stringify(msg));

            hub.send(msg, partitionKey, function(tx_err) {
                if(tx_err) {
                    this.error(tx_err);
                } else {
                    //this.log("EventHub Send successful");
                } 
            });
        });
        
		this.on("close", function () {
            try {
                hub = null;
                sbus = null;
                
                this.log("received close event");

            } catch (error) {
                this.error(error);
            }
        });
    }
    
    RED.nodes.registerType("eventhub", EventHubNode);
}
