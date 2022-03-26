#include "Action.h"


Action::Action(byte length, byte *percentages, unsigned long ms) {
  this->length = length;
  this->percentages = percentages;
  this->time = ms == 0? -1 : ms;
}

bool Action::isTimed() {
  return (this->time == -1? false : true);
}

byte Action::getPercentage(byte index) {
  if (index < 0 || index >= this->length) {
    Serial.println("ERROR -> Action.getPercentage(): index out of range");
    return 0;
  }
  return this->percentages[index];
}