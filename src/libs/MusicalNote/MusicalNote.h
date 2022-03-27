#ifndef MUSICAL_NOTE_H
#define MUSICAL_NOTE_H


class MusicalNote {

private:
  unsigned long duration;
  unsigned int frequency;

public:
  MusicalNote(unsigned int,unsigned long);
  unsigned long getDuration();
  unsigned int getFrequency();

};


#endif