#include "Ultrasonic.h"


Ultrasonic::Ultrasonic(byte trigger, byte echo) {
  this->pin_trigger = trigger;
  this->pin_echo = echo;
}

float Ultrasonic::getCurrentValue() {
  pinMode(this->pin_trigger, OUTPUT);
  digitalWrite(this->pin_trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(this->pin_trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(this->pin_trigger, LOW);
  pinMode(this->pin_echo, INPUT);
  return ULTRASONIC_ADJUSTMENT_FACTOR * pulseIn(this->pin_echo, HIGH);
}
