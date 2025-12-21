from flask import Flask, jsonify, request
from datetime import datetime
import os

app = Flask(__name__)

# Lista en memoria para simular una base de datos
usuarios = [
    {"id": 1, "nombre": "Juan Pérez", "email": "juan@example.com"},
    {"id": 2, "nombre": "María García", "email": "maria@example.com"},
    {"id": 3, "nombre": "Carlos López", "email": "carlos@example.com"}
]

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "mensaje": "API de Usuarios con Python y Flask",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "hostname": os.environ.get("HOSTNAME", "localhost")
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    return jsonify({
        "usuarios": usuarios,
        "total": len(usuarios)
    })

@app.route('/usuarios/<int:usuario_id>', methods=['GET'])
def obtener_usuario(usuario_id):
    usuario = next((u for u in usuarios if u["id"] == usuario_id), None)
    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    
    if not data or 'nombre' not in data or 'email' not in data:
        return jsonify({"error": "Datos incompletos. Se requiere nombre y email"}), 400
    
    nuevo_id = max([u["id"] for u in usuarios]) + 1 if usuarios else 1
    nuevo_usuario = {
        "id": nuevo_id,
        "nombre": data["nombre"],
        "email": data["email"]
    }
    
    usuarios.append(nuevo_usuario)
    return jsonify(nuevo_usuario), 201

@app.route('/usuarios/<int:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    usuario = next((u for u in usuarios if u["id"] == usuario_id), None)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({"error": "No se proporcionaron datos"}), 400
    
    if 'nombre' in data:
        usuario['nombre'] = data['nombre']
    if 'email' in data:
        usuario['email'] = data['email']
    
    return jsonify(usuario)

@app.route('/usuarios/<int:usuario_id>', methods=['DELETE'])
def eliminar_usuario(usuario_id):
    global usuarios
    usuario = next((u for u in usuarios if u["id"] == usuario_id), None)
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    usuarios = [u for u in usuarios if u["id"] != usuario_id]
    return jsonify({"mensaje": f"Usuario {usuario_id} eliminado correctamente"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)