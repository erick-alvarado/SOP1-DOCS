
import json
from flask import Flask, jsonify, request
from bd import obtener_conexion

app = Flask(__name__)


@app.route('/', methods=['GET'])
def obtener():
    conexion = obtener_conexion()
    users = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()
    conexion.close()
    return users 

# Publish 
@app.route('/publicar', methods=['POST'])
def publicar():
    json_data = request.json
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        sql = 'INSERT INTO user(nombre) VALUES ("'+json_data['nombre']+'")'
        cursor.execute(sql)
    conexion.commit()
    conexion.close()
    return jsonify({'response': 'Success!'})


if __name__ == '__main__':

    app.run(port = 5000,debug=True)