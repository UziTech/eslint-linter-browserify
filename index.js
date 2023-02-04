if (typeof process === "undefined") {
	(window || globalThis).process = require("process/browser");
}

function getLinter() {
	return require("./node_modules/eslint/lib/linter/linter").Linter;
}

module.exports.Linter = getLinter();
