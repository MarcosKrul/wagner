import speech_recognition as sr

class Microphone:

  def __init__(self): 
    self.__r = sr.Recognizer()

  def listen(self):
    with sr.Microphone() as source:
      print('Informe o comando: ')
      audio = self.__r.listen(source)

    try:
      text = self.__r.recognize_google(audio, language='pt_BR')
      return text
      
    except sr.UnknownValueError:
      print('Google Speech Recognition could not understand audio')
    except sr.RequestError as e:
      print('Could not request results from Google Speech Recognition service; {0}'.format(e))