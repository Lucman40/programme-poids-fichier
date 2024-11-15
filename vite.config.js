import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
 plugins: [
   react({
     jsxRuntime: 'classic'
   })
 ],
 esbuild: {
   loader: 'jsx',
   include: /\.[jt]sx?$/,
   exclude: []
 },
 optimizeDeps: {
   esbuild: {
     loader: {
       '.js': 'jsx'
     }
   }
 },
 resolve: {
   alias: {
     'lucide-react': 'lucide-react/dist/esm/lucide-react'
   }
 }
});
