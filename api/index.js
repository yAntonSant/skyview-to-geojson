export async function GET(req) {
  const res = await fetch("https://skyview.37037.org/skvapiv2/api/frota/integracao", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dGlsaXphZG9yX2lkIjoiMzA3OSIsImNsaWVudGVfaWQiOiIxNTk4IiwibmJmIjoxNzQ2NTIzMzcyLCJleHAiOjIwNjIwNTYxNzIsImlhdCI6MTc0NjUyMzM3Mn0.umqNAKW8DBBTvYIL26T8IN33Sw9XdqDBqpdNKaAYwRc"
    }
  });

  const data = await res.json();

  const geojson = {
    type: "FeatureCollection",
    features: Array.isArray(data) ? data.map(v => ({
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
    })) : []
  };

  return new Response(JSON.stringify(geojson), {
    headers: { "Content-Type": "application/json" }
  });
}
