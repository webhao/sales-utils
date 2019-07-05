import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import rollupTypescript from "rollup-plugin-typescript2"
import replace from "rollup-plugin-replace"
import json from "rollup-plugin-json"
import { terser } from "rollup-plugin-terser"
import { eslint } from "rollup-plugin-eslint"
export default {
  input: "src/main.ts",
  output: [
    {
      name: "_",
      file: "build/sales-utils.min.js",
      format: "umd",
      sourceMap: "inline"
    },
    {
      name: "_",
      file: "build/sales-utils.esm.js",
      format: "es"
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      sourceMap: false
    }),
    rollupTypescript(),
    babel({
      exclude: "node_modules/**" // 只编译源代码
    }),
    eslint({
      exclude: ["src/**/*", "src/*"]
    }),
    json(),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development")
    }),
    process.env.NODE_ENV === "production" && terser()
  ]
}
