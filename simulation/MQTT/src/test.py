import time
import sys

import paho.mqtt.client as mqtt

port = 1883
broker = 'broker.mqtt-dashboard.com'
topic = 'Sistemas.Embarcados.Wagner.Actions' 

def on_connect(client, userdata, flags, rc):
  print('[STATUS] Conectado ao Broker. Resultado de conexao: ' + str(rc))
   
def main():
  try:
    client = mqtt.Client() 
    client.on_connect = on_connect
    client.connect(broker, port)
    client.loop_start()
    payload = 1
    while True:
      client.publish(topic, payload)
      print('evento publicado: payload= {}'.format(payload))
      payload += 1
      if payload > 9:
        payload = 1
      time.sleep(5)
  except KeyboardInterrupt:
      print('\nCtrl+C pressionado, encerrando aplicacao e saindo...')
      sys.exit(0)
    
if __name__ == '__main__':
  main()