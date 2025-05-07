from flask import request, jsonify
from config import app, jwt
from models import User, Event
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from flask_cors import CORS

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



@app.route("/")  # Handles the root URL
def home():
    return "Hello, Flask is working!"  # Or return your actual page
# User authentication routes
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing {field}"}), 400
    
    # Create new user
    new_user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )
    
    # Save user to database
    success, result = new_user.save()
    if not success:
        return jsonify({"error": result}), 400
    
    # Don't return password in response
    user_data = result.copy()
    user_data.pop('password', None)
    
    return jsonify({"message": "User registered successfully", "user": user_data}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    # Validate required fields
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password are required"}), 400
    
    # Check password
    success, user = User.check_password(data['email'], data['password'])
    if not success:
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Generate access token
    access_token = create_access_token(identity=user['id'])
    
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user_id": user['id']
    }), 200

# User routes
@app.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.get_all()
    
    # Remove passwords from response
    for user in users:
        user.pop('password', None)
    
    return jsonify({"users": users})

@app.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Remove password from response
    user.pop('password', None)
    
    return jsonify({"user": user})

@app.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    # Check if user is modifying their own account
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized to modify this user"}), 403
    
    data = request.get_json()
    success, result = User.update(user_id, data)
    
    if not success:
        return jsonify({"error": result}), 400
    
    # Remove password from response
    result.pop('password', None)
    
    return jsonify({"message": "User updated successfully", "user": result})

@app.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    # Check if user is deleting their own account
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"error": "Unauthorized to delete this user"}), 403
    
    success, message = User.delete(user_id)
    if not success:
        return jsonify({"error": message}), 404
    
    return jsonify({"message": message})

# Event routes
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.get_all()
    return jsonify({"events": events})

@app.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = Event.get_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    return jsonify({"event": event})

@app.route("/events", methods=["POST"])
@jwt_required()
def create_event():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'description', 'date', 'location']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing {field}"}), 400
    
    # Get current user ID from JWT token
    current_user_id = get_jwt_identity()
    
    # Create new event
    new_event = Event(
        title=data["title"],
        description=data["description"],
        date=data["date"],
        location=data["location"],
        organizer_id=current_user_id
    )
    
    # Save event to database
    event_data = new_event.save()
    
    return jsonify({"message": "Event created successfully", "event": event_data}), 201

@app.route("/events/<int:event_id>", methods=["PUT"])
@jwt_required()
def update_event(event_id):
    # Check if user is the organizer
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

@app.route("/events/<int:event_id>", methods=["DELETE"])
@jwt_required()
def delete_event(event_id):
    # Check if user is the organizer
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

@app.route("/users/<int:user_id>/events", methods=["GET"])
def get_user_events(user_id):
    # Check if user exists
    user = User.get_by_id(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    events = Event.get_by_organizer(user_id)
    return jsonify({"events": events})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

    