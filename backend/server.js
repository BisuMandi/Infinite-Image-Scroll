import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
// app.use(express.static('../frontend'));

// Enable CORS and allow only your frontend domain
app.use(cors({
  origin: 'https://bisumandi.github.io' // allow only this origin
}));

// API proxy endpoint
app.get("/api/photos", async (req, res) => {

  const tryFetch = async (accesskey) => {
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accesskey}&count=10`;

    const response = await fetch(apiUrl);

    if (!response.ok)
      throw new Error(`Unsplash API failed with status ${response.status}`);

    return response.json();
  };

  try {
    const data = await tryFetch(process.env.UNSPLASH_ACCESS_KEY_PRIMARY);
    res.json(data);
  } catch (err1) {
    console.log("Primary API key failed. Trying Secondary key ...");
    try {
      const data = await tryFetch(process.env.UNSPLASH_ACCESS_KEY_SECONDARY);
      res.json(data);
    } catch (err2) {
      console.log("Both API keys failed", err2.message);
      res.status(500).json(
        {
          error: "Unabale to fetch images from Unsplash using both keys",
          message: err2.message
        }
      );
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
