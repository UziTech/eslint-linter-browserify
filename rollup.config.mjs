import commonjs from "@rollup/plugin-commonjs";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from "@rollup/plugin-terser";
import replace from '@rollup/plugin-replace';

function generateRollup(output) {
	const plugins = [
		replace({
			preventAssignment: true,
			delimiters: ["", ""],
			values: {
				'require("node:': 'require("',
				'require(\'node:': 'require(\'',
				'from "node:': 'from "',
				'from \'node:': 'from \'',
			}
		}),
		commonjs({
			ignoreGlobal: true,
			requireReturnsDefault: "preferred",
			strictRequires: "auto",
		}),
		json(),
		nodePolyfills(),
		nodeResolve({
			preferBuiltins: false
		}),
	];

	if (output.file.match(/\.min\./)) {
		plugins.push(terser());
	}

	return {
		context: "window",
		input: "index.js",
		output: {
			intro: "if (!global) { var global = globalThis || window; }",
			...output,
		},
		plugins,
	};
}

export default [
	generateRollup({
		file: "linter.js",
		format: "umd",
		exports: "named",
		name: "eslint",
	}),
	generateRollup({
		file: "linter.min.js",
		format: "umd",
		exports: "named",
		name: "eslint",
	}),
	generateRollup({
		file: "linter.mjs",
		format: "esm",
	}),
	generateRollup({
		file: "linter.cjs",
		format: "cjs",
		exports: "named",
	})
];
