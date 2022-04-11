#include "Mqtt.h"


Mqtt::Mqtt(MqttConnectionCredentials* connection, CallbackFunction* callback) {
	this->connection = connection;
	this->callback = callback;

	// WiFiClient _wifiClient;
	// PubSubClient _pbClient = PubSubClient(_wifiClient);
	// this->client = _pbClient;

  // this->client.setServer(this->connection->host, this->connection->port);
  // this->client.setCallback(callback);
}

void Mqtt::connect() {
	WiFiClient _wifiClient;
	PubSubClient _pbClient = PubSubClient(_wifiClient);
  _pbClient.setServer(this->connection->host, this->connection->port);
  _pbClient.setCallback(this->callback);

	if (_pbClient.connect(this->connection->clientId)) {
		for (int i=0 ; i<TOPICS_NUMBER ; i++)
			_pbClient.subscribe(this->topics[i]);
	}
}

bool Mqtt::connected() {
	return this->client.connected();
}

void Mqtt::handler() {
	this->client.loop();
}