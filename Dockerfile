# ─────────────────────────────────────────────
#  CityFix — Imagen base oficial Node 20 Alpine
#  Alpine = imagen liviana (~5MB), ideal para CI
# ─────────────────────────────────────────────
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos manifiestos primero para aprovechar caché de Docker
COPY package.json ./

# Instalamos SOLO las devDependencies (jest) — sin librerías innecesarias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Comando por defecto: ejecutar los tests
CMD ["npm", "test"]