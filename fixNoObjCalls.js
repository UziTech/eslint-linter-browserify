const {writeFileSync, readFileSync} = require("fs");

// fixes https://github.com/eslint/eslint/pull/12862
const noObjCalls = readFileSync("node_modules/eslint/lib/rules/no-obj-calls.js", {encoding: "utf8"});
writeFileSync("node_modules/eslint/lib/rules/no-obj-calls.js", noObjCalls.replace("const global", "const g").replace("[global]", "[g]"));
