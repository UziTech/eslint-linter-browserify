if (typeof window === "object") {
	window.process = require("process/browser");
}

const {Linter} = require("eslint/lib/linter/linter");

module.exports.Linter = Linter;
