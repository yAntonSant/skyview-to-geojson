const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://skyview.37037.org/skvapiv2/api/frota/integracao", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXphZG9yX2lkIjoiMzA3OSIsImNsaWVudGVfaWQiOiIxNTk4IiwibmJmIjoxNzQ2NTIzMzcyLCJleHAiOjIwNjIwNTYxNzIsImlhdCI6MTc0NjUyMzM3Mn0.umqNAKW8DBBTvYIL26T8IN33Sw9XdqDBqpdNKaAYwRc"
      }
    });

    res.setHeader("Content-Type", "application/geo+json");
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter dados da SkyView." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});