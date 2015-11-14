
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		var request = new XMLHttpRequest();
		 	
		request.open("GET", "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", true);
		
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200 || request.status == 0) {
					parser = new DOMParser();
					xmlDoc = parser.parseFromString(request.responseText,"text/xml");
					var test = xmlDoc.getElementsByTagName("Cube");
					
					for (i = 0; i < test.length; i++) {
						if (test[i].getAttribute("currency") == "USD") {
							var blub = test[i].getAttributeNode("rate").nodeValue;
							alert(blub);
						}
					}				
				}
			}
		}			
		
		
		request.send();
		 
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
