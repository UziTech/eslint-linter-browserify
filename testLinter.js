const tests = [
	{
		text: "var a = 0;",
		rules: {"no-var": "error"},
	},
	{
		text: "var a = 0;",
		rules: {"semi": ["error", "never"]},
	},
];

function testLinter(name, Linter) {
	for (const test of tests) {
		const linter = new Linter();
		const errors = linter.verify(test.text, {rules: test.rules});
		const ruleName = Object.keys(test.rules)[0];
		if (errors[0].ruleId === ruleName) {
			console.log(`${name} ${ruleName} Passed`);
		} else {
			console.error(`${name} ${ruleName} Failed`);
			console.error(`errors[0].ruleId !== '${ruleName}'`);
			console.error("errors =", errors);
			process.exit(1);
		}
	}
}

module.exports = {testLinter};
