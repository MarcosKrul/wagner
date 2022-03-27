#include "Music.h"


Music::Music(byte l, MusicalNote* notes) {
  this->notes_length = l;
  this->notes = notes;
}

byte Music::getNotesLength() {
  return this->notes_length;
}

MusicalNote* Music::getNote(byte index) {
  if (index < 0 || index >= this->notes_length) {
    Serial.println("ERROR -> Music.getNote(byte): index out of range");
    return &(this->notes[0]);
  }

  return &(this->notes[index]);
}