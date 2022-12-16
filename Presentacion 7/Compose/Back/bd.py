import mysql.connector
import os
def obtener_conexion():
    return  mysql.connector.connect(
            host= os.environ.get("MYSQL_HOST"),
            user=os.environ.get("MYSQL_USER"),
            password=os.environ.get("MYSQL_PASSWORD"),
            database=os.environ.get("MYSQL_NAME"),
                auth_plugin='mysql_native_password'
)