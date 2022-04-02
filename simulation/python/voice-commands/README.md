## Instalação e execução

* Windows

```
    python -m venv venv
    .\venv\Scripts\activate.bat
    pip install pipwin
    pipwin install PyAudio
    pip install -r requirements.txt
    copy external\*.py venv\Lib\site-packages
    copy external\remoteApi\Windows\remoteApi.dll venv\Lib\site-packages
    python src\main.py
```

* É necessário configurar o diretório do arquivo ***yaml*** com as configurações do robô no arquivo **src\main.py**
