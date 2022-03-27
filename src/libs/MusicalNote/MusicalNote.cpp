#include "MusicalNote.h"


MusicalNote::MusicalNote(unsigned int frequency, unsigned long duration) {
  this->frequency = frequency;
  this->duration = duration;
}

unsigned long MusicalNote::getDuration() {
  return this->duration;
}

unsigned int MusicalNote::getFrequency() {
  return this->frequency;
}