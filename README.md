# InterviewIQ.AI

An AI-powered mock interview platform that helps candidates prepare for job interviews with personalized questions, real-time evaluation, and detailed performance reports.

## Features

- 🤖 AI-generated interview questions based on your resume
- 🎙️ Voice interview support
- 📊 Detailed performance reports with scores
- 💳 Credit-based system with Razorpay payments
- 🔐 Google Authentication via Firebase

## Tech Stack

**Frontend**
- React.js, Redux Toolkit, Tailwind CSS
- Firebase Auth, Razorpay, Framer Motion

**Backend**
- Node.js, Express.js, MongoDB
- OpenRouter AI, JWT, Cookie-based Auth

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB Atlas account
- Firebase project
- OpenRouter API key
- Razorpay account

### Installation

**Clone the repo**
```bash
git clone https://github.com/Harshadkumawat/InterviewIQ.git
cd InterviewIQ
```

**Backend setup**
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=8000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

```bash
npm run dev
```

**Frontend setup**
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

```bash
npm run dev
```

## Deployment

- **Frontend** — Vercel
- **Backend** — Render / Railway

## Author

**Harshad Kumawat**  
[GitHub](https://github.com/Harshadkumawat) • [LinkedIn](https://linkedin.com/in/harshad-kumawat)
