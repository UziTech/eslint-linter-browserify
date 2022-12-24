const {Linter: cjsLinter} = require("./linter.cjs");
const {Linter: minLinter} = require("./linter.min.js");
const {Linter: jsLinter} = require("./linter.js");
const {testLinter} = require("./testLinter.js");

testLinter("cjs", cjsLinter);
testLinter("min", minLinter);
testLinter("js", jsLinter);
