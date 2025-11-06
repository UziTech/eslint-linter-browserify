import commonjs from "@rollup/plugin-commonjs";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from "@rollup/plugin-terser";
import alias from '@rollup/plugin-alias';

function generateRollup(output) {
	const plugins = [
		alias({
			entries: [{find: /^node:(.*)/, replacement: '$1'}],
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
