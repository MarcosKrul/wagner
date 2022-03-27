#include "Wagner.h"


Wagner::Wagner(unsigned int lm, Motor* motors, unsigned int la, Action* actions) {
	this->recalculating_route = false;
	this->direction = 1;
	this->decision = -1;

	this->motors = motors;
	this->motors_length = lm;

	this->actions = actions;
	this->actions_length = la;
}

void Wagner::random_decision_side() {
	this->decision = random(7, 9);
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

void Wagner::write_in_all_motors(int action_index) {
	for (int i=0 ; i<this->motors_length ; i++) 
		this->write(i, action_index);
}

void Wagner::drive(long ultrasonic_value, int action_index) {
	
	if (ultrasonic_value <= CONST_CN_MAX_DISTANCE) {
		if (!this->recalculating_route) {
			this->last_millis_stopped = millis();
			this->last_millis_walking = this->last_millis_stopped + CONST_CN_BLOCKED_TIME_IN_MS;
			this->write_in_all_motors(ACTION_STOP);
			this->random_decision_side();
			this->recalculating_route = true;
		}
	}

	if (this->recalculating_route && (millis() - this->last_millis_stopped) >= CONST_CN_BLOCKED_TIME_IN_MS) {
		this->write_in_all_motors(this->decision);

		if ((millis() - this->last_millis_walking) >= CONST_CN_WALKING_TIME_IN_MS) {
			this->write_in_all_motors(ACTION_STOP);

			if ((millis() - this->last_millis_stopped) >= 2 * CONST_CN_BLOCKED_TIME_IN_MS + CONST_CN_WALKING_TIME_IN_MS) {
				this->write_in_all_motors(ACTION_WALK_FORWARD);
				this->recalculating_route = false;
			}
		}
	}
	
	if (!this->recalculating_route) {
		this->write_in_all_motors(action_index != -1? action_index : ACTION_WALK_FORWARD);
	}
}