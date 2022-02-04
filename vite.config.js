import { defineConfig } from 'vite'
import { abellVitePlugin } from './plugin/vite-plugin-abell-experimental';

export default defineConfig({
  plugins: [abellVitePlugin()]
})