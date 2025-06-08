import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from tinydb import TinyDB

# Initialize Flask app
app = Flask(__name__)


# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour
jwt = JWTManager(app)

# Set up TinyDB
db = TinyDB('database.json')
users_table = db.table('users')
events_table = db.table('events')