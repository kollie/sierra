# Sierra API

Backend API for Sierra - A Community and Event Management Platform.

## Features

- User authentication (register, login)
- User profile management
- Community management (create, join, leave)
- Event management (create, attend, like)
- Notifications

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Install the required packages:

```bash
pip install -r requirements.txt
```

2. Run the application:

```bash
python main.py
```

The API will be available at http://localhost:8000.

## API Documentation

The API documentation is available at http://localhost:8000/docs when the server is running (Swagger UI).

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate and get an access token
- `POST /api/login/json` - Alternative JSON-based login endpoint

### Users

- `GET /api/users/me` - Get current user's profile
- `PUT /api/users/me` - Update current user's profile
- `GET /api/users/{user_id}` - Get a user's profile by ID

### Events

- `GET /api/events` - Get all events with optional filtering
- `POST /api/events` - Create a new event
- `GET /api/events/user/{user_id}` - Get events created by a user
- `GET /api/events/attending` - Get events the current user is attending
- `GET /api/events/favorites` - Get events the current user has liked/favorited
- `GET /api/events/{event_id}` - Get a specific event by ID
- `PUT /api/events/{event_id}` - Update a specific event
- `DELETE /api/events/{event_id}` - Delete a specific event
- `POST /api/events/attend` - Attend an event
- `POST /api/events/unattend` - Unattend an event
- `POST /api/events/like` - Like/favorite an event
- `POST /api/events/unlike` - Unlike/unfavorite an event

### Communities

- `GET /api/communities` - Get all communities with optional filtering
- `POST /api/communities` - Create a new community
- `GET /api/communities/user/{user_id}` - Get communities created by a user
- `GET /api/communities/joined` - Get communities the current user has joined
- `GET /api/communities/{community_id}` - Get a specific community by ID
- `PUT /api/communities/{community_id}` - Update a specific community
- `DELETE /api/communities/{community_id}` - Delete a specific community
- `POST /api/communities/join` - Join a community
- `POST /api/communities/leave` - Leave a community

### Notifications

- `GET /api/notifications` - Get all notifications for the current user
- `POST /api/notifications/read` - Mark a notification as read
- `POST /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/{notification_id}` - Delete a notification 