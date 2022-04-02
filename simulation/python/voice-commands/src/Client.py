import sim
import yaml

from Speech import Speech


class Client:
	def __init__(self, arquivoYaml, voz='Maria'):
		try:
			with open(arquivoYaml, 'rt', encoding='utf8') as arquivo:
				roboConfig = yaml.safe_load(arquivo)
			self.robo = roboConfig['robo']
			self.comandoSair = roboConfig['exit']
			self.controleVelocidade = roboConfig['speed']
			self.comandos = roboConfig['command']
			self.roboAtivo = True
		except IOError:
			print('Impossível abrir o arquivo de configurações')
			self.roboAtivo = False

		self.velocidade = 40
		self.speech = Speech(self.robo['voice']['value'][voz], self.robo['voice']['enabled'])

		sim.simxFinish(-1) 
		self.id = sim.simxStart('127.0.0.1', 19999, True, True, 5000, 5) 
		

	def __exit__(self, *err):
		sim.simxFinish(-1)


	def verificaConexao(self):
		numeroTentativas = 5
		contadorConecta = 1
		conectado = sim.simxGetConnectionId(self.id) != -1

		while not conectado and contadorConecta <= numeroTentativas:
			print('Tentando conectar ao servidor API (CoppeliaSim) remmoto -> Tentativa', contadorConecta)
			sim.simxFinish(-1) 
			self.id = sim.simxStart('127.0.0.1', 19999, True, True, 5000, 5)
			conectado = sim.simxGetConnectionId(self.id) != -1
			contadorConecta += 1

		if not conectado:
			print ('Programa finalizado! Impossível conectar ao servidor API (CoppeliaSim) remmoto.')  
		
		return conectado


	def executarComando(self, comando, comandos):
		c = set(comando) & set(comandos)
		return len(c) != 0


	def enviarComando(self, comando):
		if self.executarComando(self.robo['name'], comando.split()):
			print('O robô recebeu o comando: ' + comando)
			sair = self.executarComando(self.comandoSair['control'], comando.split())
			comandoValido = False

			if not sair: 
				for _, controle in self.comandos.items():
					if self.executarComando(controle['control'], comando.split()):
						if controle['value'] > 0:
							sim.simxSetIntegerSignal (self.id, 'WAGNER#external.action.tgg', 1, sim.simx_opmode_oneshot)
							sim.simxSetIntegerSignal(self.id, 'WAGNER#external.action.value', controle['value'], sim.simx_opmode_oneshot)
						else:
							self.robo['manual'] = True if controle['value'] == -2 else False     
						self.speech.run(controle['speech'])
						comandoValido = True

				for _, velocidade in self.controleVelocidade['command'].items():
					if self.executarComando(velocidade['control'], comando.split()):
						self.velocidade += velocidade['value']
						velocidadeForaDosLimites = False
						
						if self.velocidade < self.controleVelocidade['minimum']['value']:
							velocidadeForaDosLimites = True
							self.speech.run(self.controleVelocidade['minimum']['speech'])
							self.velocidade = self.controleVelocidade['minimum']['value']
						
						if self.velocidade > self.controleVelocidade['maximum']['value']:
							velocidadeForaDosLimites = True
							self.speech.run(self.controleVelocidade['maximum']['speech'])
							self.velocidade = self.controleVelocidade['maximum']['value']
						
						comandoValido = True
						sim.simxSetIntegerSignal (self.id, 'WAGNER#external.velocity.tgg', 1, sim.simx_opmode_oneshot)
						sim.simxSetIntegerSignal(self.id, 'WAGNER#external.velocity.value', self.velocidade, sim.simx_opmode_oneshot)
						self.speech.run(self.controleVelocidade['adjust']['speech'] if velocidadeForaDosLimites else velocidade['speech'])
						
				if not comandoValido:
					self.speech.run(self.robo['invalid'])

			else:
				self.speech.run(self.comandoSair['speech'].format(self.robo['name'][0]))
				self.roboAtivo = False 
		else:
			self.speech.run(self.robo['warning'])