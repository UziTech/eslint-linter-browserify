import {nodeResolve} from "@rollup/plugin-node-resolve";

export default {
	input: "script.js",
	output: {
		file: "bundle.js",
		format: "iife"
	},
	plugins: [nodeResolve()]
};
