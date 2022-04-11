#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ConnectionManager.h>

#define TOPICS_NUMBER 2

struct mqtt_connection_credentials_t {
  unsigned int port;
  char* host;
  char* clientId;
  // to-do: auth credentials (user & password)
};

typedef struct mqtt_connection_credentials_t MqttConnectionCredentials;
typedef void CallbackFunction(char*,byte*,unsigned int);


class Mqtt : public ConnectionManager {
  
private:
  CallbackFunction* callback;
  PubSubClient client;
  MqttConnectionCredentials* connection;
  const char* topics[TOPICS_NUMBER] = {
    "Sistemas.Embarcados.Wagner.Actions",
    "Sistemas.Embarcados.Wagner.Velocity"
  };

protected:
  void connect();

public:
  Mqtt(MqttConnectionCredentials*,CallbackFunction*);
  bool connected();
  void handler();

};


#endif