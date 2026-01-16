import logging
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from tinydb import Query, TinyDB

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize TinyDB
users_db = TinyDB('users.json')
events_db = TinyDB('events.json')
users_table = users_db  # Use default table for users
events_table = events_db  # Use default table for events
User = Query()
Event = Query()

@app.route('/api/users', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        if data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
            
        logging.info(f"Received registration request with data: {data}")
        
        if 'username' not in data or 'email' not in data:
            return jsonify({'error': 'Username and email are required'}), 400
        
        # this Checks if username or email already exists
        existing_user = users_table.get(
            (User.username == data['username']) | (User.email == data['email'])
        )
        
        if existing_user:
            return jsonify({'error': 'Username or email already exists'}), 400
        
        new_user = {
            'username': data['username'],
            'email': data['email'],
            'created_at': datetime.utcnow().isoformat()
        }
        
        user_id = users_table.insert(new_user)
        new_user['id'] = user_id
        
        return jsonify(new_user), 201
        
    except Exception as e:
        logging.error(f"Error in register_user: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/users', methods=['GET'])
def get_users():
    users = users_table.all()
    return jsonify(users)

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if data is None:
            return jsonify({'error': 'Invalid JSON data'}), 400
            
        logging.info(f"Received login request with data: {data}")
        
        if 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        # Find user by email
        user = users_table.get(User.email == data['email'])
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        
        return jsonify({
            'id': user.doc_id,
            'username': user['username'],
            'email': user['email']
        })
    except Exception as e:
        logging.error(f"Error in login: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    events = events_table.all()
    return jsonify(events)

@app.route('/api/events', methods=['POST'])
def create_event():
    event_data = request.json
    
    # Add creation timestamp and generate ID
    event_data['created_at'] = datetime.now().isoformat()
    event_data['id'] = str(len(events_table.all()) + 1)
    
    # Save event to database
    events_table.insert(event_data)
    
    return jsonify({
        'message': 'Event created successfully',
        'event': event_data
    }), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
