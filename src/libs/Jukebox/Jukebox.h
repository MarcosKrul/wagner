#ifndef JUKEBOX_H
#define JUKEBOX_H

#include <Arduino.h>
#include <Music.h>
#include <MusicalNote.h>

#define QNT_MUSICS 1


class Jukebox {

private:
  bool playing;
  Music* musics;
  byte buzzer_pin;
  byte current_music;
  byte current_note;
  unsigned long last_millis;

public:
  Jukebox(byte);
  void play();
  bool isPlaying();

};


#endif