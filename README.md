# Saved by Snoo

A web application to view and filter up to 1000 of your saved Reddit images. You can also filter the images by subreddit.

## Features:
- View your saved Reddit images.
- Filter saved images by subreddit.
- Secure login with Reddit OAuth.
- Doesn't store any of your own credentials.


## Project Structure:
- **Backend**: A Flask API that handles authentication with Reddit and serves image data via JSON.
- **Frontend**: A Next.js React app that communicates with the backend to display saved images.
- **Docker Compose**: One `docker-compose.yml` file to run both the frontend and backend containers.

## Prerequisites:
- Docker
- Docker Compose

## Setup Instructions

### 1. Clone the repository
Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/saved-by-snoo.git
cd saved-by-snoo

```

### 2. Build and start the application

```bash
docker-compose up --build -d
```

### 3. Access the app

Once the Docker image is up and running, you can access the frontend at `http://localhost:3000`.

Make sure the backend is running on port 5000 by default at `http://localhost:5000`.

## 3a. Port configuration

You can change the port number by navigating to /backend/app.py and modifiying the origins URL in the CORS configuration at the top of the file.

### 4. Stopping the services

To stop the services, you can use the following command:

```bash
docker-compose down
```

### 5. Local development

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

### License