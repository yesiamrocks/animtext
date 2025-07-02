// rollup.config.js
import { readFileSync } from "fs";
import terser from '@rollup/plugin-terser';

// --- Package Info ---
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const { name, version, homepage, author, description } = pkg;

const parsedAuthor =
  typeof author === "string"
    ? author.split("<")[0].trim()
    : author && author.name
      ? author.name
      : "Unknown Author";

const currentYear = new Date().getFullYear();

// --- Banner ---
const banner = `/*!
 * ${name}.js
 * Title: ${name}
 * Description: ${description}
 *
 * Version: ${version}
 * Author: ${parsedAuthor}
 * Website: ${homepage}
 * LinkedIn: https://www.linkedin.com/in/shafayetul/
 * Email: hello@cssanimation.io
 * GitHub: https://github.com/yesiamrocks
 *
 * © ${currentYear} ${parsedAuthor} – All rights reserved.
 */`;

// --- Config ---
export default [
  // Unminified UMD
  {
    input: "src/typeflow.js",
    output: {
      file: "dist/typeflow.js",
      format: "umd",
      name: "TypeFlow",
      banner,
    },
  },

  // Minified UMD
  {
    input: "src/typeflow.js",
    output: {
      file: "dist/typeflow.min.js",
      format: "umd",
      name: "TypeFlow",
      banner,
    },
    plugins: [
      terser({
        output: {
          comments: "some",
        },
      }),
    ],
  },

  // ESM (for modern bundlers/imports)
  {
    input: "src/typeflow.js",
    output: {
      file: "dist/typeflow.module.js",
      format: "es",
      banner,
    },
  },
];
