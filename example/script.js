import {basicSetup, EditorView} from "codemirror";
import {javascript, esLint} from "@codemirror/lang-javascript";
import {linter, lintGutter} from "@codemirror/lint";

// Uses linter.mjs
import * as eslint from "eslint-linter-browserify";

const config = {
	// eslint configuration
	languageOptions: {
		parserOptions: {
			ecmaVersion: 2019,
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
