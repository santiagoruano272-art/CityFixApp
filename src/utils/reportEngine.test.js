// ─────────────────────────────────────────────────────────────────
//  CityFix — Tests E2E de Red Real
//  Archivo: src/utils/reportEngine.test.js
//
//  REGLA DEL TALLER: Prohibido usar jest.fn() o interceptar fetch.
//  Estas pruebas hacen llamadas HTTP REALES a Supabase.
// ─────────────────────────────────────────────────────────────────

const { getReports } = require("./reportEngine");

// Timeout amplio para llamadas de red reales
jest.setTimeout(10000);

describe("CityFix — reportEngine E2E (Red Real)", () => {

  let reports;

  // Llamada real ÚNICA antes de todos los tests
  beforeAll(async () => {
    try {
      reports = await getReports();
    } catch (error) {
      console.error("\n❌ ERROR DE CONEXIÓN:", error.message);
      console.error("   Verifica: 1) archivo .env  2) credenciales Supabase  3) red activa\n");
      reports = null;
    }
  });

  // Cierra conexiones abiertas para que Jest no quede colgado
  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  // ── TEST 1 ───────────────────────────────────────────────────────
  test("1. La API responde con éxito y retorna un Array de JavaScript", () => {
    expect(reports).not.toBeNull();
    expect(Array.isArray(reports)).toBe(true);
  });

  // ── TEST 2 ───────────────────────────────────────────────────────
  test("2. El array contiene al menos un reporte (datos reales insertados)", () => {
    expect(reports).not.toBeNull();
    expect(reports.length).toBeGreaterThan(0);
  });

  // ── TEST 3 ───────────────────────────────────────────────────────
  test("3. El primer reporte tiene las propiedades correctas (id, title, category, votes)", () => {
    expect(reports).not.toBeNull();
    expect(reports.length).toBeGreaterThan(0);

    const primerReporte = reports[0];

    expect(primerReporte).toHaveProperty("id");
    expect(primerReporte).toHaveProperty("title");
    expect(primerReporte).toHaveProperty("category");
    expect(primerReporte).toHaveProperty("votes");

    expect(typeof primerReporte.id).toBe("string");
    expect(typeof primerReporte.title).toBe("string");
    expect(typeof primerReporte.votes).toBe("number");

    const categoriasValidas = ["Vías", "Iluminación", "Aseo"];
    expect(categoriasValidas).toContain(primerReporte.category);
  });

});