import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";


dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use(cors()); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.post("/api/chat", async (req, res) => {

  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    res.json({ response: text });

  } catch (error) {

    console.error("Error:", error);

    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
