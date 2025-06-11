import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const EVENTS_FILE = join(__dirname, 'events.json');
const USERS_FILE = join(__dirname, 'users.json');

// Read events from file
const readEvents = async () => {
  try {
    const data = await fs.readFile(EVENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { events: [] };
  }
};

// Write events to file
const writeEvents = async (events) => {
  await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf8');
};

// Read users from file
const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: {} };
  }
};

// Write users to file
const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// Create a new event
app.post('/api/events', async (req, res) => {
  try {
    const eventData = req.body;
    const events = await readEvents();
    
    const newEvent = {
      id: uuidv4(),
      ...eventData,
      createdAt: new Date().toISOString()
    };

    events.events.push(newEvent);
    await writeEvents(events);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await readEvents();
    res.json(events.events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// User registration endpoint
app.post('/api/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
    
    const userData = await readUsers();
    
    // Check if user with this email already exists
    const userExists = Object.values(userData.users).some(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Create new user
    const userId = uuidv4();
    userData.users[userId] = {
      id: userId,
      username,
      email,
      created_at: new Date().toISOString()
    };
    
    await writeUsers(userData);
    
    res.status(201).json({ id: userId, username, email });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const userData = await readUsers();
    const users = Object.values(userData.users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
