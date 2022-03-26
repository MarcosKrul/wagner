#include "Motor.h"


Motor::Motor(byte vcc, byte gnd, byte speed_control) {
  this->pin_gnd = gnd;
  this->pin_vcc = vcc;
  this->pin_speed_control = speed_control;

  pinMode(this->pin_gnd, OUTPUT);
  pinMode(this->pin_vcc, OUTPUT);
  pinMode(this->pin_speed_control, OUTPUT);
}

byte Motor::getPinVcc() {
  return this->pin_vcc; 
}

byte Motor::getPinGnd() {
  return this->pin_gnd; 
}

byte Motor::getPinSpeedControl() {
  return this->pin_speed_control; 
}
