import json
import requests

print("Leer archivos")
leer = json.loads(open('data.json').read())
for publicacion in leer:
    respuesta_publicar = requests.get('http://34.117.38.246:80/')
    print(respuesta_publicar.text)
    