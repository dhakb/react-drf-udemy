import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
    plugins: [
        react(
            {
            jsxRuntime: "automatic",
            jsxImportSource: '@emotion/react',
            }
        ),
        envCompatible({prefix: "REACT_APP_"})],
    server: {
        port: 3000
    }
})
