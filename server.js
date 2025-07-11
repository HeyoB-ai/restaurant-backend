const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userInput = req.body.question;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Geen antwoord ontvangen";
  res.json({ reply });
});

app.listen(3000, () => console.log("Server draait op poort 3000"));
