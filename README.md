# Proyecto Funny — React + TypeScript (Vite)

## Requisitos mínimos
- Node.js (recomendado v18+) y npm
- Docker Desktop (opcional)

## Clonar el repositorio
## (SSH)
git clone git@github.com:JhoanLT/purely.git
## (HTTPS)
git clone https://github.com/JhoanLT/purely.git

cd `purely`
git checkout main

## Ejecutar sin Docker (modo local)
1. Comprobar versiones:
   node -v
   npm -v

2. Instalar dependencias (una sola vez):
   npm install

3. Iniciar el servidor de desarrollo:
   npm run dev

4. Abrir en el navegador:
   http://localhost:5173

5. Detener:
   Presiona Ctrl+C en la terminal

## Levantar con Docker Compose (si ya tienes el archivo en el repo)
- Levantar en primer plano (no hace falta `--build` si el compose monta el código):
  docker compose up

- Usar un archivo específico:
  docker compose -f `docker-compose.dev.yml` up

- Ejecutar en segundo plano:
  docker compose up -d

- Parar y limpiar:
  docker compose down

## Nota rápida
Si los cambios no se reflejan, intenta reiniciar con:
docker compose up (o docker compose up --build si cambias dependencias)
