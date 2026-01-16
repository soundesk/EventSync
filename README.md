# EvenSync - Event Management Platform

A modern, full-stack web application for discovering, creating, and managing events. EvenSync connects event organizers with attendees through an intuitive interface with powerful filtering and search capabilities.

## Features

- **Event Discovery**: Browse and search events by category, location, date, and tags
- **User Authentication**: Secure registration and login system
- **Event Creation**: Organizers can create and manage their events
- **Smart Filtering**: Filter events by category (Comedy, Concert, Conference, Exhibition, Sports, Workshop, Festival, Meetup)
- **Search Functionality**: Find events by title, description, location, or tags
- **Sorting Options**: Sort events by date or price
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Updates**: Dynamic content loading with smooth animations

## Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Fast development server and build tool
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Lightweight Python web framework
- **TinyDB** - Simple JSON-based database
- **Flask-CORS** - Cross-origin resource sharing
- **Python 3.12** - Backend runtime

## Installation

### Prerequisites
- Node.js 18+ 
- Python 3.12+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EvenSync
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   pip install flask flask-cors tinydb
   ```

4. **Start the development servers**

   Frontend (in project root):
   ```bash
   npm run dev
   ```

   Backend (in backend directory):
   ```bash
   python app.py
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://127.0.0.1:5000

## Usage

### For Event Attendees
1. Browse events on the homepage
2. Use filters to find events by category
3. Search for specific events using the search bar
4. Sort events by date or price
5. Click "Buy Tickets" to register for events

### For Event Organizers
1. Sign up for a new account
2. Log in to your account
3. Create new events with details like title, description, date, location, and pricing
4. Manage your events through the dashboard

## Project Structure

```
EvenSync/
├── src/                    # React frontend source code
│   ├── components/         # Reusable React components
│   │   ├── allevents/     # Event listing and filtering
│   │   ├── authentication/ # Login and signup forms
│   │   ├── buyticket/     # Ticket purchase flow
│   │   └── ...
│   ├── services/          # API service functions
│   └── context/          # React context providers
├── backend/              # Flask backend
│   ├── app.py           # Main Flask application
│   ├── events.json      # Events database
│   └── users.json      # Users database
└── public/             # Static assets
```

## API Endpoints

### Users
- `POST /api/users` - Register new user
- `GET /api/users` - Get all users
- `POST /api/auth/login` - User authentication

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event

## Design Features

- **Modern UI**: Clean, minimalist design with smooth animations
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements

- [ ] Payment integration for ticket purchases
- [ ] Event reminders and notifications
- [ ] User profiles and event history
- [ ] Social sharing features
- [ ] Advanced analytics for organizers
- [ ] Mobile app development

---

**Built with ❤️ for the event community**
