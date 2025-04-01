import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    root: '.', // default, but makes structure clear
    publicDir: 'public', // default, just being explicit
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'public/index.html') // ✅ use the correct full path
        }
    }
});
