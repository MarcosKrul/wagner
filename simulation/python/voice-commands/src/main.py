import time

from Client import Client
from Microphone import Microphone

yamlFilePath = 'YALM_FILEPATH_HERE'

def exec():
  microphone = Microphone()

  client = Client(yamlFilePath)
  connected = client.verificaConexao()

  if connected and client.roboAtivo:
    client.runInSynchronousMode = True
    print('Conexão com servidor API remoto estabelecida')
    client.speech.run(client.robo['init'].format(client.robo['name'][0]))

    while connected and client.roboAtivo:
      if client.robo['manual']:
        comando = input('Informe o comando: ')
        client.enviarComando(comando)
      else:
        client.enviarComando(microphone.listen())
      
      time.sleep(0.05)
      if client.roboAtivo:
        connected = client.verificaConexao()


if __name__ == '__main__':
  exec()
