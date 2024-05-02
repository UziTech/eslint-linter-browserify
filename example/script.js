import {basicSetup, EditorView} from "codemirror";
import {javascript, esLint} from "@codemirror/lang-javascript";
import {linter, lintGutter} from "@codemirror/lint";
import globals from "globals";

// Uses linter.mjs
import * as eslint from "eslint-linter-browserify";

const config = {
	// eslint configuration
	languageOptions: {
		globals: {
				...globals.node,
		},
		parserOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
		},
	},
	rules: {
		semi: ["error", "never"],
	},
};

new EditorView({
	doc: "console.log('hello');\n",
	extensions: [
		basicSetup,
		javascript(),
		lintGutter(),
		linter(esLint(new eslint.Linter(), config)),
	],
	parent: document.body
});
