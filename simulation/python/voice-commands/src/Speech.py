import pyttsx3

class Speech:
  def __init__(self, index, enabled=True):
    self.enabled = enabled
    self.synthesizer = pyttsx3.init()
    voices = self.synthesizer.getProperty('voices')
    
    self.synthesizer.setProperty('voice', voices[index].id)
    self.synthesizer.setProperty('rate', 180)


  def run(self, text):
    if self.enabled:
      self.synthesizer.say(text)
      self.synthesizer.runAndWait()
    else:
      print(text)