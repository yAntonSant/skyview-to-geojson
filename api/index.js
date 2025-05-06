export default async function handler(req, res) {
  const response = await fetch("https://skyview.37037.org/skvapiv2/api/frota/integracao", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXphZG9yX2lkIjoiMzA3OSIsImNsaWVudGVfaWQiOiIxNTk4IiwibmJmIjoxNzQ2NTIzMzcyLCJleHAiOjIwNjIwNTYxNzIsImlhdCI6MTc0NjUyMzM3Mn0.umqNAKW8DBBTvYIL26T8IN33Sw9XdqDBqpdNKaAYwRc"
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: "Erro ao aceder à API SkyView" });
  }

  const data = await response.json();

  const geojson = {
    type: "FeatureCollection",
    features: data.map(v => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [v.longitude, v.latitude]
      },
      properties: {
        codigo: v.codigo,
        matricula: v.matricula,
        data: v.dataUtc
      }
    }))
  };

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(geojson);
}
