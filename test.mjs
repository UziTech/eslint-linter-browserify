import * as mjsEslint from "./linter.mjs";
import {Linter as mjsLinter} from "./linter.mjs";
import {testLinter} from "./testLinter.js";

testLinter("mjsEslint", mjsEslint.Linter);
testLinter("mjsLinter", mjsLinter);
