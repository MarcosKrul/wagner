#include <Motor.h>
#include <Ultrasonic.h>
#include <Wagner.h>

#define QNT_MOTORS 2

#define ULTRASONIC_TRIGGER_PIN 4
#define ULTRASONIC_ECHO_PIN 5

#define MOTOR_01_VCC_PIN 13
#define MOTOR_01_GND_PIN 15
#define MOTOR_01_PWM_PIN 2

#define MOTOR_02_VCC_PIN 14
#define MOTOR_02_GND_PIN 12
#define MOTOR_02_PWM_PIN 0



/*
	GLOBALS OBJECTS/VARS
*/
Ultrasonic ultrasonic = Ultrasonic(
	ULTRASONIC_TRIGGER_PIN, ULTRASONIC_ECHO_PIN
);
Wagner wagner = Wagner(
	QNT_MOTORS, 
	new Motor[QNT_MOTORS] {
		Motor(MOTOR_01_VCC_PIN, MOTOR_01_GND_PIN, MOTOR_01_PWM_PIN),
		Motor(MOTOR_02_VCC_PIN, MOTOR_02_GND_PIN, MOTOR_02_PWM_PIN)
	}
);

void setup() {
	Serial.begin(9600);
	randomSeed(analogRead(A0));
}

void loop() {

	float distance_in_cm = ultrasonic.getCurrentValue();

	Serial.print("LOG loop -> distance_in_cm == ");
	Serial.print(distance_in_cm);
	Serial.println("cm");

	wagner.drive(distance_in_cm);

	delay(50);
}
