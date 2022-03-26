#ifndef ULTRASONIC_H
#define ULTRASONIC_H

#include <Arduino.h>

#define ULTRASONIC_ADJUSTMENT_FACTOR 0.01723


class Ultrasonic {

private:
	byte pin_echo;
	byte pin_trigger;

public:
	Ultrasonic(byte,byte);
	float getCurrentValue();

};


#endif