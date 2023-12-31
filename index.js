// globalThis polyfill from https://mathiasbynens.be/notes/globalthis
const getGlobalThis = () => {
	if (typeof globalThis !== 'undefined') return globalThis;
	if (typeof self !== 'undefined') return self;
	if (typeof window !== 'undefined') return window;
	if (typeof global !== 'undefined') return global;
	if (typeof this !== 'undefined') return this;
	throw new Error('Unable to locate global `this`');
};

if (typeof process === "undefined") {
	getGlobalThis().process = require("process/browser");
}

function getLinter() {
	return require("./node_modules/eslint/lib/linter/linter").Linter;
}

module.exports.Linter = getLinter();
