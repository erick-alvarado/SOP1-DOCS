import os
import json
from flask import Flask, jsonify, request
from google.cloud import pubsub_v1
from datetime import datetime




app = Flask(__name__)

#$env:GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"


# End Load
@app.route('/finalizarCarga')
def finalizarCarga():
    
    project_id = "glassy-clarity-370620"
    topic_id = "topic_ejemplo"
    
    message = json.dumps({
            "mensaje":"hola Mundo desde un publisher"
        })
    try:
        publisher = pubsub_v1.PublisherClient()
        topic_path = publisher.topic_path(project_id, topic_id)
    except Exception as e:
        print("ERR: Failed connecting to pubsub. "+str(e))
        

    message = message.encode('utf-8')

    try:
        future = publisher.publish(topic_path, message)
    except:
        print("ERR: Sending data to pubsub")
        

    return jsonify({'response': 'pong!'})
    

if __name__ == '__main__':

    app.run(port = 5000,debug=True)