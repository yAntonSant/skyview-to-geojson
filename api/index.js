export default async function handler(req, res) {
  const response = await fetch("https://skyview.37037.org/skvapiv2/api/frota/integracao", {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}` // Usando a variável de ambiente
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
