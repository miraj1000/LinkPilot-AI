# LinkPilot AI

An AI-powered automatic link opening system with real-time monitoring and admin panel.

## Features

- Secure login system (Username: Miraz, Password: 1234)
- Real-time link status monitoring
- Live browser previews of opened links
- Admin panel for managing links
- Background processing using Celery
- Mobile-responsive UI
- WebSocket real-time updates

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Install Playwright browsers:
   ```bash
   playwright install
   ```
4. Run Redis server (required for Celery)
5. Start the Flask application:
   ```bash
   python app.py
   ```

## Project Structure

```
LinkPilot AI/
├── app.py              # Main application file
├── requirements.txt    # Python dependencies
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── screenshots/    # Browser screenshots
├── templates/
│   ├── base.html
│   ├── dashboard.html
│   ├── admin.html
│   └── login.html
└── README.md
```

## Usage

1. Login with credentials:
   - Username: Miraz
   - Password: 1234

2. Add links through the admin panel
3. Monitor link status in real-time
4. View browser screenshots of opened links

## Security

- Passwords are hashed using bcrypt
- JWT-based authentication
- Secure WebSocket connections
- Input validation and sanitization

## Deployment

The application can be deployed using:
- Netlify for frontend
- Render or VPS for backend
- Redis for Celery task queue

## Contact

For support or questions:
- Email: mdmirajhossain33031@gmail.com
- Phone: 01309392850
