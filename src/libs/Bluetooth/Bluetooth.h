#ifndef BLUETOOTH_H
#define BLUETOOTH_H

#include <Arduino.h>
#include "SoftwareSerial.h"


class Bluetooth {

private:
  bool activated;
  SoftwareSerial* serial;

public:
  Bluetooth(byte,byte, long speed = 9600);
  void disable();
  bool available();
  byte getCurrentByte();

};


#endif