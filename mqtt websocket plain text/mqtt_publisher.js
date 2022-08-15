function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function publishMultiple() { 
	const clients = [];
	host = document.getElementById("host").value;
    port = document.getElementById("port").value;

	 // Fetch the MQTT topic from the form
	topic = document.getElementById("topic").value;
	data = document.getElementById("data").value;
		

	for (let i = 0; i < 5; i++) {
		 // Generate a random client ID
		clientID = "clientID-" + parseInt(Math.random() * 100);

		// Fetch the hostname/IP address and port number from the form
		
		// Print output for the user in the messages div
		document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
		document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

		// Initialize new Paho client connection
		
		clients[i] = clientID;
	}
	
	for(let i = 0; i < 5; i++){
		let clientID = clients[i];
		client = new Paho.MQTT.Client(host, Number(port), clientID);
		testClient.onConnect();
		
		// Print output for the user in the messages div
		document.getElementById("messages").innerHTML += '<span>Publishing to: ' + topic + '</span><br/>';

		  // Once a connection has been made, make a subscription and send a message.
		console.log("onConnect");
		testClient.subscribe(topic);

		message = new Paho.MQTT.Message(data);
		message.destinationName = topic;
		testClient.send(message);
	}
}


function publish() {

    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Fetch the hostname/IP address and port number from the form
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });

}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    topic = document.getElementById("topic").value;
	data = document.getElementById("data").value;

    // Subscribe to the requested topic
    //client.subscribe(topic);
	message = new Paho.MQTT.Message(data);
	message.destinationName = topic;
	console.log(ctHex);
	// Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Publishing to: ' + topic + '</span><br/>';
	client.send(message);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}