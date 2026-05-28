# GitHub Portfolio Tracker

A full-stack web app that displays your GitHub profile and repositories.

## Live Demo
[https://joshuaweah.vercel.app](https://joshuaweah.vercel.app)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express |
| Deployment | Vercel (frontend), Render (backend) |
| API | GitHub REST API |

## Features
- GitHub profile with avatar, bio, location, and stats
- All public repositories with descriptions, language, stars, and forks
- Filter repositories by language
- Sort by recently updated or most stars
- Links to GitHub and LinkedIn

## Running Locally

**Prerequisites:** Node.js 18+

**1. Clone the repo**
```bash
git clone https://github.com/Joshua-Weah/My-React-App.git
cd My-React-App
```

**2. Install dependencies**
```bash
npm install
```

**3. Add environment variables**

Create a `.env` file inside the `backend` folder:

GITHUB_TOKEN=your_token_here
GITHUB_USERNAME=your_github_username

**4. Start both servers**
```bash
npm run dev
```

Frontend → `http://localhost:5173`  
Backend → `http://localhost:3000`