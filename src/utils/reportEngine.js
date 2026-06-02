// ─────────────────────────────────────────────────────────────────
//  CityFix — Motor de Conexión a Supabase
//  Archivo: src/utils/reportEngine.js
// ─────────────────────────────────────────────────────────────────

async function getReports() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  // Validación 1: variables presentes
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      "Faltan variables de entorno: SUPABASE_URL y/o SUPABASE_ANON_KEY.\n" +
      "Verifica que el archivo .env existe y tiene los valores correctos."
    );
  }

  // Validación 2: formato correcto de URL
  if (!SUPABASE_URL.startsWith("https://") || !SUPABASE_URL.includes(".supabase.co")) {
    throw new Error(
      `SUPABASE_URL inválida: "${SUPABASE_URL}".\n` +
      "Debe tener el formato: https://xxxxxxxxxxxxxxxx.supabase.co"
    );
  }

  // Endpoint directo a /reports (Regla de Oro del taller)
  const endpoint = `${SUPABASE_URL}/rest/v1/reports?select=*`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Error HTTP ${response.status} al consultar Supabase: ${errorBody}`
      );
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(`getReports() falló: ${error.message}`);
  }
}

module.exports = { getReports };