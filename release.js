const {execSync} = require("child_process");
const {version} = require("./package.json");

function exec(command) {
	console.log(`> ${command}`);
	let output;
	try {
		output = execSync(command, {cwd: __dirname, encoding: "utf8"});
	} catch (ex) {
		output = ex.stdout + ex.stderr;
	}
	output = output.trim();
	console.log(output);
	console.log();
	return output;
}

const eslintVersion = exec("npm view eslint@latest version");

if (!/^\d+\.\d+\.\d+$/.test(eslintVersion)) {
	console.error("Invalid eslint version:");
	console.error(eslintVersion);
	process.exit(1);
}

if (eslintVersion !== version) {
	exec("npm install eslint --no-save");
	exec("npx browserify index.js -o linter.js");
	// TODO: test
	// exec("git config --global user.email \"<>\"");
	// exec("git config --global user.name \"GitHub Actions\"");
	// exec("git add .");
	// exec(`git commit -m "Update to version v${eslintVersion}"`);
	exec(`npm version ${eslintVersion}`);
	exec("npm publish");
	exec("git push --follow-tags");
}
