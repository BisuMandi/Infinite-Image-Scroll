import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend from public folder
app.use(express.static("public"));

// API proxy endpoint
app.get("/api/photos", async (req, res) => {
  try {
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=10`;
   
    // console.log("Calling Unsplash API", apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log("Data received from API", data);
    res.json(data);
  } catch (error) {
    console.log("error fetching unsplash images", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
