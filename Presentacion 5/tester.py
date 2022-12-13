import json
import requests

print("Leer archivos")
leer = json.loads(open('data.json').read())
for publicacion in leer:
    respuesta_publicar = requests.post('http://127.0.0.1:5000/publicar', json=publicacion)
    print(respuesta_publicar.ok)
    