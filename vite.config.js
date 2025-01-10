import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api/v1',
        secure: false, // Indicate handling a self-signed certificate
      },
    },
  },
});
