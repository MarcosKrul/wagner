#include "Wagner.h"


Wagner::Wagner(unsigned int lm, Motor* motors, unsigned int la, Action* actions) {
	this->recalculating_route = false;
	this->direction = 1;

	this->motors = motors;
	this->motors_length = lm;

	this->actions = actions;
	this->actions_length = la;
}

void Wagner::random_decision_side() {
	long r = random(7, 8);
	this->direction = -1;
}

void Wagner::write(int motor_index, int action_index) {
	if (motor_index < 0 || motor_index >= this->motors_length) {
		Serial.println("ERROR Wagner::write(int,byte,byte) -> index out of range: motor_index");
		return;
	}
	
	if (action_index < 0 || action_index >= this->actions_length) {
		Serial.println("ERROR Wagner::write(int,byte,byte) -> index out of range: action_index");
		return;
	}

	byte vcc, gnd;
	byte percentage = this->actions[action_index].getPercentage(motor_index);

	if (percentage == 0) {
		vcc = LOW;
		gnd = LOW;
	} else {
		if (this->direction == 1) {
			vcc = HIGH;
			gnd = LOW;
		} else {
			vcc = LOW;
			gnd = HIGH;
		}
	}

	digitalWrite(this->motors[motor_index].getPinVcc(), vcc);
	digitalWrite(this->motors[motor_index].getPinGnd(), gnd);
	
	analogWrite(
		this->motors[motor_index].getPinSpeedControl(), 
		CONST_MAX_SPEED_VALUE * this->direction * percentage/100
	);
}