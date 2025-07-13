<<<<<<< HEAD
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
=======
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const question = req.body.question;

  const messages = [
    {
      role: "system",
      content: `Je bent een behulpzame bestelassistent bij restaurant Bodega Playa.
Menu: Patatas Bravas (€6), Calamares (€8), Paella Marisco (€17), Burger Iberico (€14), Sangria (€5), Spa Blauw (€2.50), Espresso (€2.20). Beantwoord klantvragen vriendelijk, duidelijk en bondig.`,
    },
    { role: "user", content: question }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages,
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    res.status(500).json({ error: 'Fout bij API-aanroep: ' + err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));
>>>>>>> 2ca60e8 (Fix CORS)
