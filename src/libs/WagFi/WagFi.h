#ifndef WAG_FI_H
#define WAG_FI_H

#include <Arduino.h>
#include <ESP8266WiFi.h>

#define RECONNECT_ATTEMPTS 5
#define PRINT_STATUS_IN_MS 3000
#define WAITING_TO_RETRY_RECONNECT_IN_MS 2000
#define RETRY_RECONNECT_IN_MS 120000


class WagFi {

private:
  int reconnection_attempts;
  char* ssid;
  char* password;

  void retryReconnection();
	void resetReconnectionAttempts();

public:
  WagFi(char*,char*);
  bool connected();
	String getMacAddress();
	IPAddress getLocalIP();
	void printStatus();
  void reconnect();
  void connect();

};


#endif