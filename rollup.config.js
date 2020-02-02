const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const json = require("@rollup/plugin-json");
const builtins = require("rollup-plugin-node-builtins");
const {terser} = require("rollup-plugin-terser");

module.exports = {
	input: "index.js",
	output: {
		file: "linter.js",
		format: "cjs",
		exports: "named",
	},
	plugins: [
		commonjs(),
		json(),
		builtins(),
		resolve({
			preferBuiltins: false
		}),
		terser(),
	],
};
