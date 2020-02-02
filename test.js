const {Linter} = require("./linter.js");
const linter = new Linter();
const errors = linter.verify("var a", {rules: {"no-var": 2}});
if (errors[0].ruleId === "no-var") {
	console.log("Complete\n");
} else {
	console.error("Failed");
	console.error("errors[0].ruleId === 'no-var'");
	console.error("errors =", errors);
	process.exit(1);
}
