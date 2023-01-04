const {Linter: cjsLinter} = require("./linter.cjs");
const {Linter: minLinter} = require("./linter.min.js");
const {Linter: jsLinter} = require("./linter.js");
const {testLinter} = require("./testLinter.js");

testLinter("cjsLinter", cjsLinter);
testLinter("minLinter", minLinter);
testLinter("jsLinter", jsLinter);
