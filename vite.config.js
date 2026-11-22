import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from "vite";

// GitHub Pages раздаёт проект из подпапки с именем репо,
// поэтому base должен совпадать с именем репозитория.
// Для локальной разработки достаточно "/",
// чтобы поменять режим, закомментируй следующую строку.
const BASE = "/react-compiler/";

// https://vite.dev/config/
export default defineConfig({
    base: BASE,
    plugins: [
        // ── Вариант 1 (активен): React Compiler на Rust — пакет oxc-transform-react ──
        // Новый дефолт для Vite 8: `compiler: true` сам подхватывает oxc-transform-react
        // (optional peer dependency). Установка: npm i -D oxc-transform-react
        // Ключ compiler принимает и опции, например: { compilationMode: 'annotation' }.
        react({ compiler: true }),

        // ── Вариант 2 (закомментирован): классический путь из react.dev через Babel ──
        // Тот самый babel-plugin-react-compiler, только через хелпер reactCompilerPreset().
        // Нужны пакеты: npm i -D @rolldown/plugin-babel @babel/core babel-plugin-react-compiler
        // (они уже стоят в проекте — пример заработает сразу после раскомментирования).
        // Чтобы включить: закомментируй react({ compiler: true }) выше
        // и раскомментируй строки ниже.
        //
        // import babel from "@rolldown/plugin-babel";
        // import { reactCompilerPreset } from "@vitejs/plugin-react";
        //
        // react(),
        // babel({ presets: [reactCompilerPreset()] }),

        tailwindcss(),
    ],
});
