import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/exports.ts",
  output: [
    {
      file: path.resolve("dist/index.cjs"),
      format: "cjs", // CommonJS (for Node)
      exports: "named",
    },
    {
      file: path.resolve("dist/index.js"),
      format: "esm", // ES Module (tree shakeable)
      exports: "named",
    },
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve({
      extensions: [".js", ".ts", ".tsx"],
    }),
    json(),
    postcss({
      extract: false, // Keep CSS as strings in JS (good for component libraries)
      modules: true, // Enable CSS modules support for .module.css files
      minimize: true, // Minify CSS
      autoModules: true, // Automatically detect .module.css files
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-typescript", "@babel/preset-react"],
      extensions: [".js", ".ts", ".tsx"],
    }),
    commonjs(),
  ],
};
