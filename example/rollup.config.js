import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
	input: "script.js",
	output: {
		file: "bundle.js",
		format: "iife"
	},
	context: "window",
	plugins: [nodeResolve(), commonjs(), json()]
};
