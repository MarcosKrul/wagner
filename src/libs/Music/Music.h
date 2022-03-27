#ifndef MUSIC_H
#define MUSIC_H

#include <Arduino.h>
#include "MusicalNote.h"


class Music {

private:
  byte notes_length;
  MusicalNote *notes;

public:
  Music(byte,MusicalNote*);
  MusicalNote* getNote(byte);
  byte getNotesLength();

};


#endif