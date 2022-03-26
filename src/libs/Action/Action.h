#ifndef ACTION_H
#define ACTION_H

#include <Arduino.h>

class Action {

private:
  byte length;
  byte *percentages;
  unsigned long time;

public:
  Action(byte,byte*,unsigned long ms = -1);
  bool isTimed();
  byte getPercentage(byte);

};


#endif