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

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=10`;
// API proxy endpoint
app.get("/api/photos", async (req, res) => {
  try {
    // console.log("Calling Unsplash API", apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log("Data received from API", data);
    res.json(data);
  } catch (error) {
    console.log("Error fetching Unsplash images", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
