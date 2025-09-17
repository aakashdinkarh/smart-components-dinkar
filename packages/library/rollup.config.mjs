import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import fs from "fs";
import alias from "@rollup/plugin-alias";
import dts from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8")
);

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  "react",
  "react-dom",
];

const config = [
  {
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
    external,
    plugins: [
      alias({
        entries: [
          { find: "@components", replacement: path.resolve("src/components") },
          { find: "@utils", replacement: path.resolve("src/utils") },
          { find: "@icons", replacement: path.resolve("src/icons") },
        ],
      }),
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
      typescript({
        tsconfig: "tsconfig.json",
      }),
      terser(),
    ],
  },
  {
    input: "src/exports.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: ["react", "react-dom"],
    plugins: [dts({
      tsconfig: "tsconfig.json",
    })],
  },
];

export default config;
