import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // default, just to be sure
        rollupOptions: {
            input: 'index.html' // ✅ tell Vite to use HTML as entry point
        }
    }
});
