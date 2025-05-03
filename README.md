# Unsplash Infinite Image Scroll

A web app that uses the Unsplash API to fetch and display random images with infinite scrolling. As users reach the bottom of the page, more images are fetched and displayed dynamically, creating a seamless, endless browsing experience.

## 🔗 Live Demo

🌐 [Try Infinite Image Scroll](https://bisumandi.github.io/Infinite-Image-Scroll/)  
🖥️ Backend API: [https://infinite-image-scroll-backend.onrender.com](https://infinite-image-scroll-backend.onrender.com)

## 🚀 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **API**: [Unsplash API](https://api.unsplash.com)
- **Hosting**:
  - Frontend: GitHub Pages
  - Backend: Render

## 🎯 Features

- Infinite scroll: New images are fetched as you scroll down.
- Hover effect on images:
  - Shows shadow overlay.
  - Displays image title.
- Clicking an image or title opens it on Unsplash.
- A loading spinner is shown while fetching data.
- API-driven image fetching.
- Handles user experience improvements like:
  - A smooth "Back to Top" button that appears on upward scroll.

## 📋 How to Use

- Open the [Live Demo](https://bisumandi.github.io/Infinite-Image-Scroll/).
- Images load automatically.
- Scroll down to keep fetching more images infinitely.

## 🧠 How It Works

1. **Frontend (GitHub Pages)**:
   - Sends a `GET` request to your backend at `/api/photos`.
   - Receives a list of random images and renders them.
   - Includes logic for infinite scrolling and UX improvements.

2. **Backend (Render)**:
   - Hosted separately from the frontend.
   - Calls Unsplash API securely using a stored API key (via environment variables).
   - Responds to frontend with image data in JSON format.
   - Handles CORS requests so the frontend can interact freely.

## 📦 Folder Structure (Frontend-Backend Combined)

```bash
Infinite-Image-Scroll/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── queries.css
│   ├── script.js
│   └── images/
│       └── favicon.png
└── README.md

## 📈 Future Improvements

- Add dark mode support.
- Better error handling when API fails.
- Display fallback UI if no results are returned.

## ✅ Completed Tasks

- ✅ Implemented "Back to Top" button.
- ✅ Frontend-backend split with secure API key handling.
- ✅ CORS support for cross-origin requests.

## 🛠️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/BisuMandi/Infinite-Image-Scroll.git
cd Infinite-Image-Scroll

### 2. Set Up Backend

Run the commands on terminal

```bash
cd backend
npm install

Create a `.env` file in `backend/` and add your Unsplash API key:

```env
UNSPLASH_ACCESS_KEY=your_api_key_here

Run the backend server:

```bash
node server.js

### 3. Open Frontend

In a new terminal:

```bash
cd frontend
# Open index.html in your browser or serve with a simple static server

## 🤝 Contributing

Pull requests and suggestions are welcome! If you'd like to contribute, feel free to fork the repo and open a PR.

---

Made with 💻 and ☕ by [@BisuMandi](https://github.com/BisuMandi)

