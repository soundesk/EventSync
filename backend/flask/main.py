from config import app, jwt  # ✅ Use the app from config.py
from flask import jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)
from models import Event, User

# ---------------- CORS Configuration ----------------
CORS(app, origins=["http://localhost:5173"])

@app.route("/")
def home():
    return "Hello, Flask is working!"

# ------------------ Auth Routes ------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing {field}"}), 400

    new_user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )

    success, result = new_user.save()
    if not success:
        return jsonify({"error": result}), 400

    user_data = result.copy()
    user_data.pop('password', None)

    return jsonify({"message": "User registered successfully", "user": user_data}), 201

@app.route("/api/login", methods=["POST", "OPTIONS"])  # ✅ Handle preflight
def login():
    if request.method == "OPTIONS":
        return '', 200  # ✅ Respond to preflight

    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password are required"}), 400

    success, user = User.check_password(data['email'], data['password'])
    if not success:
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user['id'])

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user_id": user['id']
    }), 200

# ------------------ User Routes ------------------

@app.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.get_all()
    for user in users:
        user.pop('password', None)
    return jsonify({"users": users})

@app.route("/api/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.pop('password', None)
    return jsonify({"user": user})

@app.route("/api/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized to modify this user"}), 403

    data = request.get_json()
    success, result = User.update(user_id, data)
    if not success:
        return jsonify({"error": result}), 400

    result.pop('password', None)
    return jsonify({"message": "User updated successfully", "user": result})

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized to delete this user"}), 403

    success, message = User.delete(user_id)
    if not success:
        return jsonify({"error": message}), 404

    return jsonify({"message": message})

# ------------------ Event Routes ------------------

@app.route("/api/events", methods=["GET"])
def get_events():
    events = Event.get_all()
    return jsonify({"events": events})

@app.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.get_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify({"event": event})

@app.route("/api/events", methods=["POST"])
@jwt_required()
def create_event():
    data = request.get_json()
    required_fields = ['title', 'description', 'date', 'location']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"Missing {field}"}), 400

    current_user_id = get_jwt_identity()

    new_event = Event(
        title=data["title"],
        description=data["description"],
        date=data["date"],
        location=data["location"],
        organizer_id=current_user_id
    )

    event_data = new_event.save()
    return jsonify({"message": "Event created successfully", "event": event_data}), 201

@app.route("/api/events/<int:event_id>", methods=["PUT"])
@jwt_required()
def update_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.get_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    if event['organizer_id'] != current_user_id:
        return jsonify({"error": "Unauthorized to modify this event"}), 403

    data = request.get_json()
    success, result = Event.update(event_id, data)
    if not success:
        return jsonify({"error": result}), 400
    return jsonify({"message": "Event updated successfully", "event": result})

@app.route("/api/events/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    current_user_id = get_jwt_identity()
    event = Event.get_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    if event['organizer_id'] != current_user_id:
        return jsonify({"error": "Unauthorized to delete this event"}), 403

    success, message = Event.delete(event_id)
    if not success:
        return jsonify({"error": message}), 404
    return jsonify({"message": message})

@app.route("/api/users/<int:user_id>/events", methods=["GET"])
def get_user_events(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    events = Event.get_by_organizer(user_id)
    return jsonify({"events": events})

# ------------------ Run App ------------------

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
