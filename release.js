const {execSync} = require("child_process");
const {writeFileSync} = require("fs");
const {version} = require("./package.json");

function exec(command) {
	console.log(`> ${command}`);
	let output;
	try {
		output = execSync(command, {cwd: __dirname, encoding: "utf8"});
	} catch (ex) {
		console.error(ex.stdout ? ex.stdout : ex.stderr);
		process.exit(1);
	}
	output = output.trim();
	console.log(output);
	console.log();
	return output;
}

const eslintVersion = exec("npm view eslint@latest version");

if (!/^\d+\.\d+\.\d+$/.test(eslintVersion)) {
	console.error("Invalid eslint version");
	process.exit(1);
}

if (eslintVersion !== version) {
	exec("npm install eslint@latest --no-save");
	exec("npx browserify index.js -o linter.js");
	exec(`npm version ${eslintVersion}`);
	writeFileSync(".npmrc", "//registry.npmjs.org/:_authToken=${NPM_TOKEN}");
	exec("npm publish");
	exec("git push \"https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git\" HEAD:master --follow-tags");
} else {
	console.log("No update available");
}
