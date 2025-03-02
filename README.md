# Saved by Snoo

A web application to view and filter up to 1000 of your saved Reddit posts. You can filter the posts by subreddit, title name, and the type of submission.

## Features:
- [x] Allows users to view their save images and videos
- [x] Allows users to filter their images/videos by types (gallery, video, image)
- [x] Allows users to view NSFW posts
- [x] Allows users to blur NSFW posts if viewing them
- [x] Responsive design for different devices
- [ ] Log out button
- [ ] Add 'sort' functions on page so users can sort by score, time or title.
- [ ] Create error page if user has no saved images


## Project Structure:
- **Backend**: A Flask API that handles authentication with Reddit and serves image data via JSON.
- **Frontend**: A Next.js React app that communicates with the backend to display saved images.
- **Docker Compose**: One `docker-compose.yml` file to run both the frontend and backend containers.

## Prerequisites:
- Docker
- Docker Compose
- A Reddit API key.
- Python 3.10+
- Node v20.0
- npm v10.0

## Setup Instructions

### 1. Set up .env file in backend repository
Navigate to ./backend with

```bash
cd backend
```

and create a .env file which contains the following information:

```bash
CLIENT_ID - the client ID from your api key.
CLIENT_SECRET - the client secret from your api key.
REDIRECT_URI - the redirect uri from your api key.
USER_AGENT
SECRET_KEY
```

### 2. Clone the repository
Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/saved-by-snoo.git
cd saved-by-snoo

```

### 3. Build and start the application

```bash
docker-compose up --build -d
```

### 4. Access the app

Once the Docker image is up and running, you can access the frontend at `http://localhost:3000`.

Make sure the backend is running on port 5000 by default at `http://localhost:5000`.

## 4a. Port configuration

You can change the port number by navigating to /backend/app.py and modifiying the origins URL in the CORS configuration at the top of the file.

### 5. Stopping the services

To stop the services, you can use the following command:

```bash
docker-compose down
```

### 6. Local development

You can also run both the frontend and backend services separately by running the Flask API and React frontend separately.

# Frontend:

To run the frontend (React with Next.js) locally, run:

```bash
cd frontend
npm install
npm run dev
```

This will start the frontend on `http://localhost:3000`.

# Backend:

To run the backend (Flask) locally, run:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

This will start the backend on `http://localhost:5000`.

![A preview image of the project can be seen here]('https://i.imgur.com/432Wg72.jpeg')

*Image last updated 02/03/2025.*

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
