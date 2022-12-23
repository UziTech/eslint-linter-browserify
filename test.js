const {Linter: cjsLinter} = require("./linter.cjs");
const {Linter: minLinter} = require("./linter.min.js");
const {Linter: jsLinter} = require("./linter.js");

function testLinter(name, Linter) {
	const linter = new Linter();
	const errors = linter.verify("var a", {rules: {"no-var": 2}});
	if (errors[0].ruleId === "no-var") {
		console.log(`${name} Complete\n`);
	} else {
		console.error(`${name} Failed`);
		console.error("errors[0].ruleId === 'no-var'");
		console.error("errors =", errors);
		process.exit(1);
	}
}

testLinter("cjs", cjsLinter);
testLinter("min", minLinter);
testLinter("js", jsLinter);
