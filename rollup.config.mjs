import commonjs from "@rollup/plugin-commonjs";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import builtins from "rollup-plugin-node-builtins";
import terser from "@rollup/plugin-terser";


function generateRollup(output, minified) {
	const plugins = [
		commonjs({
			ignoreGlobal: true,
			requireReturnsDefault: "preferred",
		}),
		json(),
		builtins(),
		nodeResolve({
			preferBuiltins: false
		}),
	];

	if (minified) {
		plugins.push(terser());
	}

	return {
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
	}, true),
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
