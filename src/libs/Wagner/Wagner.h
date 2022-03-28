#ifndef WAGNER_H
#define WAGNER_H

#include <Motor.h>
#include <Action.h>
#include <Arduino.h>

#define ACTION_STOP 0
#define ACTION_WALK_FORWARD 1
#define QNT_DEFAULT_ACTIONS 9

#define CONST_MAX_SPEED_VALUE 1023
#define CONST_CN_MAX_DISTANCE 15.0
#define CONST_CN_BLOCKED_TIME_IN_MS 2000
#define CONST_CN_WALKING_TIME_IN_MS 2000


class Wagner {

private:
	int direction; 
	Motor *motors;
	unsigned int motors_length;
	Action *default_actions;
	Action *current_action;
	bool current_action_changed;
	int decision;
	bool recalculating_route;
	unsigned long last_millis;

	void random_decision_side();
	void write();
	void setCurrentAction(Action*);

public:
	Wagner(unsigned int,Motor*);
	void drive(long);

};


#endif