#include "Wagner.h"


Wagner::Wagner(unsigned int lm, Motor* motors) {
	this->recalculating_route = false;
	this->direction = 1;
	this->decision = -1;

	this->motors = motors;
	this->motors_length = lm;

	this->default_actions = new Action[QNT_DEFAULT_ACTIONS] {
		Action(lm, new byte[lm] {0,0}),
		Action(lm, new byte[lm] {100,100}),
		Action(lm, new byte[lm] {100,100}),
		Action(lm, new byte[lm] {0,100}),
		Action(lm, new byte[lm] {100,0}),
		Action(lm, new byte[lm] {20,100}),
		Action(lm, new byte[lm] {100,20}),
		Action(lm, new byte[lm] {20,100}),
		Action(lm, new byte[lm] {100,20})
	}
}

void Wagner::random_decision_side() {
	this->decision = random(7, 9);
	this->direction = -1;
}

void Wagner::write(Action* action) {
	byte vcc, gnd, percentage;

	for (int i=0 ; i<this->motors_length ; i++) {
		percentage = action->getPercentage(i);

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

		digitalWrite(this->motors[i].getPinVcc(), vcc);
		digitalWrite(this->motors[i].getPinGnd(), gnd);
		
		analogWrite(
			this->motors[i].getPinSpeedControl(), 
			CONST_MAX_SPEED_VALUE * ((float)percentage/100)
		);
	}

}

void Wagner::drive(long ultrasonic_value, int action_index) {
	
	if (ultrasonic_value <= CONST_CN_MAX_DISTANCE && !this->recalculating_route) {
		this->write(&this->default_actions[ACTION_STOP]);
		this->last_millis = millis();
		this->random_decision_side();
		this->recalculating_route = true;
	}

	if (this->recalculating_route) {
		if ((millis() - this->last_millis) >= CONST_CN_BLOCKED_TIME_IN_MS) {
			this->write(&this->default_actions[this->decision]);
		
			if ((millis() - this->last_millis) >= CONST_CN_BLOCKED_TIME_IN_MS + CONST_CN_WALKING_TIME_IN_MS) {
				this->write(&this->default_actions[ACTION_STOP]);
				
				if ((millis() - this->last_millis) >= 2 * CONST_CN_BLOCKED_TIME_IN_MS + CONST_CN_WALKING_TIME_IN_MS) {
					this->write(&this->default_actions[ACTION_WALK_FORWARD]);
					this->direction = 1;
					this->recalculating_route = false;
				}
			}
		}
	} else {
		this->write(&this->default_actions[action_index != -1? action_index : ACTION_WALK_FORWARD]);
	}
}