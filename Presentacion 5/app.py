
from flask import Flask, jsonify, request


app = Flask(__name__)

# Publish 
@app.route('/publicar', methods=['POST'])
def publicar():
    json_data = request.json

    #Colocar logica de la aplicacion
    
    return jsonify({'response': 'pong!'})



if __name__ == '__main__':

    app.run(port = 5000,debug=True)