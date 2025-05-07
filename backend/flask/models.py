from tinydb import Query
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import users_table, events_table

class User:
    def __init__(self, username, email, password, id=None):
        self.id = id
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)
        self.created_at = datetime.now().isoformat()
    
    @staticmethod
    def get_all():
        """Get all users from the database"""
        return users_table.all()
    
    @staticmethod
    def get_by_id(user_id):
        """Get a user by their ID"""
        User = Query()
        return users_table.get(User.id == user_id)
    
    @staticmethod
    def get_by_username(username):
        """Get a user by their username"""
        User = Query()
        return users_table.get(User.username == username)
    
    @staticmethod
    def get_by_email(email):
        """Get a user by their email"""
        User = Query()
        return users_table.get(User.email == email)
    
    def save(self):
        """Save a new user to the database"""
        # Check if username or email already exists
        User = Query()
        if users_table.get(User.username == self.username):
            return False, "Username already exists"
        if users_table.get(User.email == self.email):
            return False, "Email already exists"
        
        # Generate a unique ID (using timestamp as simple solution)
        if not self.id:
            self.id = int(datetime.now().timestamp() * 1000)
        
        user_data = self.to_json()
        users_table.insert(user_data)
        return True, user_data
    
    @staticmethod
    def update(user_id, data):
        """Update a user in the database"""
        User = Query()
        user = users_table.get(User.id == user_id)
        
        if not user:
            return False, "User not found"
        
        # Update user fields
        updated_data = user.copy()
        if 'username' in data:
            # Check if new username already exists
            if data['username'] != user['username'] and users_table.get(User.username == data['username']):
                return False, "Username already exists"
            updated_data['username'] = data['username']
            
        if 'email' in data:
            # Check if new email already exists
            if data['email'] != user['email'] and users_table.get(User.email == data['email']):
                return False, "Email already exists"
            updated_data['email'] = data['email']
            
        if 'password' in data:
            updated_data['password'] = generate_password_hash(data['password'])
        
        users_table.update(updated_data, User.id == user_id)
        return True, updated_data
    
    @staticmethod
    def delete(user_id):
        """Delete a user from the database"""
        User = Query()
        if not users_table.get(User.id == user_id):
            return False, "User not found"
        users_table.remove(User.id == user_id)
        return True, "User deleted"
    
    @staticmethod
    def check_password(email, password):
        """Check if password matches for a given email"""
        User = Query()
        user = users_table.get(User.email == email)
        if not user:
            return False, None
        if check_password_hash(user['password'], password):
            return True, user
        return False, None
    
    def to_json(self):
        """Convert user object to JSON"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'created_at': self.created_at
        }

class Event:
    def __init__(self, title, description, date, location, organizer_id, id=None):
        self.id = id
        self.title = title
        self.description = description
        self.date = date
        self.location = location
        self.organizer_id = organizer_id
        self.created_at = datetime.now().isoformat()
    
    @staticmethod
    def get_all():
        """Get all events from the database"""
        return events_table.all()
    
    @staticmethod
    def get_by_id(event_id):
        """Get an event by its ID"""
        Event = Query()
        return events_table.get(Event.id == event_id)
    
    @staticmethod
    def get_by_organizer(organizer_id):
        """Get all events by a specific organizer"""
        Event = Query()
        return events_table.search(Event.organizer_id == organizer_id)
    
    def save(self):
        """Save a new event to the database"""
        # Generate a unique ID (using timestamp as simple solution)
        if not self.id:
            self.id = int(datetime.now().timestamp() * 1000)
        
        event_data = self.to_json()
        events_table.insert(event_data)
        return event_data
    
    @staticmethod
    def update(event_id, data):
        """Update an event in the database"""
        Event = Query()
        event = events_table.get(Event.id == event_id)
        
        if not event:
            return False, "Event not found"
        
        # Update event fields
        updated_data = event.copy()
        for key, value in data.items():
            if key in ['title', 'description', 'date', 'location']:
                updated_data[key] = value
        
        events_table.update(updated_data, Event.id == event_id)
        return True, updated_data
    
    @staticmethod
    def delete(event_id):
        """Delete an event from the database"""
        Event = Query()
        if not events_table.get(Event.id == event_id):
            return False, "Event not found"
        events_table.remove(Event.id == event_id)
        return True, "Event deleted"
    
    def to_json(self):
        """Convert event object to JSON"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'location': self.location,
            'organizer_id': self.organizer_id,
            'created_at': self.created_at
        }