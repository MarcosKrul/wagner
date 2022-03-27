#ifndef PC_H
#define PC_H

#include <Motor.h>
#include <Action.h>
#include <Arduino.h>

#define ACTION_STOP 0
#define ACTION_WALK_FORWARD 1

#define CONST_MAX_SPEED_VALUE 1023
#define CONST_CN_MAX_DISTANCE 15.0
#define CONST_CN_BLOCKED_TIME_IN_MS 2000
#define CONST_CN_WALKING_TIME_IN_MS 2000


class Wagner {

private:
	int direction; 

	Motor *motors;
	unsigned int motors_length;

	Action *actions;
	unsigned int actions_length;
	
	int decision;
	bool recalculating_route;
	unsigned long last_millis_stopped;
	unsigned long last_millis_walking;

	void random_decision_side();
	void write(int);

public:
	Wagner(unsigned int,Motor*,unsigned int,Action*);
	void drive(long,int action_index = -1);

};


#endif