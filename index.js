if (typeof window === "object") {
	window.process = require("process/browser");
}

const {Linter} = require("./node_modules/eslint/lib/linter/linter");

module.exports.Linter = Linter;
