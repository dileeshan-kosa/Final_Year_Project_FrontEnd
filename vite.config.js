import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import fs from "fs";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: {
//       key: fs.readFileSync("C:/certs/key.pem"),
//       cert: fs.readFileSync("C:/certs/cert.pem"),
//     },
//     port: 5173,
//   },
// });
