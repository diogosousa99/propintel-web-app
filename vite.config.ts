import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    server: {
        open: true,
        port: 4444,
    },
    optimizeDeps: {
        include: ['leaflet', 'react-leaflet'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-chartjs-2': ['react-chartjs-2'],
                    chartjs: ['chart.js'],
                },
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(__dirname, 'src/hooks'),
            },
            {
                find: '@store',
                replacement: path.resolve(__dirname, 'src/store'),
            },
            {
                find: '@constants',
                replacement: path.resolve(__dirname, 'src/constants'),
            },
            {
                find: '@enum',
                replacement: path.resolve(__dirname, 'src/enum'),
            },
            {
                find: '@helpers',
                replacement: path.resolve(__dirname, 'src/helpers'),
            },
            {
                find: '@theme',
                replacement: path.resolve(__dirname, 'src/theme'),
            },
            {
                find: '@contexts',
                replacement: path.resolve(__dirname, 'src/contexts'),
            },
        ],
    },
});
