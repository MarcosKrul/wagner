#ifndef MOTOR_H
#define MOTOR_H

#include <Arduino.h>


class Motor {

private:
  byte pin_vcc;
  byte pin_gnd;
  byte pin_speed_control;

public:
  Motor(byte,byte,byte);
  byte getPinVcc();
  byte getPinGnd();
  byte getPinSpeedControl();

};


#endif