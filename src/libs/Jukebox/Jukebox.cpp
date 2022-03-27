#include "Jukebox.h"


Jukebox::Jukebox(byte pin) {
  this->playing = false;
  this->buzzer_pin = pin;
  this->current_note = 0;
  this->current_music = 0;
  this->last_millis = millis();

  this->musics = new Music[QNT_MUSICS] {
    Music(16, new MusicalNote[16] {
      MusicalNote(415,300),
      MusicalNote(659,300),
      MusicalNote(659,200),
      MusicalNote(622,200),
      MusicalNote(659,200),
      MusicalNote(740,200),
      MusicalNote(659,200),
      MusicalNote(622,200),
      MusicalNote(659,200),
      MusicalNote(554,200),
      MusicalNote(622,200),
      MusicalNote(494,200),
      MusicalNote(554,200),
      MusicalNote(440,200),
      MusicalNote(494,200),
      MusicalNote(415,1000)
    })
  };
}

bool Jukebox::isPlaying() {
  return this->playing;
}

void Jukebox::play() {
  if (this->current_music < 0 || this->current_music >= QNT_MUSICS) {
    Serial.println("ERROR -> Jukebox.play(): index out of range");
    return;
  }

  MusicalNote* note = this->musics[this->current_music].getNote(this->current_note);

	tone(
    this->buzzer_pin, 
    note->getFrequency(), 
    note->getDuration()
  );
  	
  if ((millis()-this->last_millis) > note->getDuration()) {
    noTone(this->buzzer_pin);
    this->last_millis = millis();

    if (++this->current_note >= this->musics[this->current_music].getNotesLength()) {
      this->playing = false;
      this->current_note = 0;
    }
  }
}