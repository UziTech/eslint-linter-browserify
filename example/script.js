import {basicSetup, EditorView} from "codemirror";
import {javascript, esLint} from "@codemirror/lang-javascript";
import {linter, lintGutter} from "@codemirror/lint";
import "eslint-linter-browserify"; // Adds eslint.Linter to globalThis

const config = {
	// eslint configuration
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "module",
	},
	env: {
		browser: true,
		node: true,
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
		// eslint-disable-next-line
		linter(esLint(new eslint.Linter(), config)),
	],
	parent: document.body
});
