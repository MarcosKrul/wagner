#include "Bluetooth.h"


Bluetooth::Bluetooth(byte pin_rx, byte pin_tx, long speed) {
  this->serial = new SoftwareSerial(pin_rx, pin_tx);
  this->serial->begin(speed);
  this->activated = true;
}

void Bluetooth::disable() {
  this->activated = false;
}

bool Bluetooth::available() {
  return this->activated && this->serial->available();
}

byte Bluetooth::getCurrentByte() {
  return ((byte)(this->serial->read()));
}