#include "WagFi.h"


WagFi::WagFi(char* ssid, char* password) {
	this->ssid = ssid;
	this->password = password;
  this->reconnection_attempts = 0;
}

void WagFi::connect() {
  WiFi.begin(this->ssid, this->password);
}

void WagFi::resetReconnectionAttempts() {
	this->reconnection_attempts = 0;
}

bool WagFi::connected() {
	return WiFi.status() == WL_CONNECTED;
}

IPAddress WagFi::getLocalIP() {
	return WiFi.localIP();
}

String WagFi::getMacAddress() {
	return WiFi.macAddress();
}

void WagFi::reconnect() {
	static unsigned long lmillis = millis();

	if (this->connected()) {
		this->resetReconnectionAttempts();
		return;
	}

	if (this->reconnection_attempts >= RECONNECT_ATTEMPTS) {
		return this->retryReconnection();
	}
	
	if ((millis() - lmillis) >= WAITING_TO_RETRY_RECONNECT_IN_MS) {
		WiFi.begin(this->ssid, this->password);
		this->reconnection_attempts++;
		lmillis = millis();
	}
}

void WagFi::retryReconnection() {
	static unsigned long lmillis = millis();

	if ((millis() - lmillis) >= RETRY_RECONNECT_IN_MS) {
		this->resetReconnectionAttempts();
		lmillis = millis();
	}
}

void WagFi::printStatus() {
	static unsigned long lmillis = millis();
	
	if ((millis() - lmillis) >= PRINT_STATUS_IN_MS) {
		Serial.println("=====================================");
		Serial.print("Status da conexão wi-fi: ");
		Serial.println(this->connected()? "CONECTADO" : "DESCONECTADO");
		Serial.println("=====================================");
		
		lmillis = millis();
	}
}