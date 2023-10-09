import { defineConfig } from 'vite'
import path from 'path'
import dotenv from "dotenv"

dotenv.config()

export default ({ mode }) => {
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    }
  });
}