const {execSync} = require("child_process");
const {writeFileSync} = require("fs");
const {version} = require("./package.json");

function exec(command) {
	console.log(`> ${command}`);
	let output;
	try {
		output = execSync(command, {cwd: __dirname, encoding: "utf8"});
	} catch (ex) {
		throw new Error(ex.stdout ? ex.stdout : ex.stderr);
	}
	output = output.trim();
	console.log(`${output}\n`);
	return output;
}

const eslintVersion = exec("npm view eslint@latest version");

if (!/^\d+\.\d+\.\d+$/.test(eslintVersion)) {
	console.error("Invalid eslint version");
	process.exit(1);
}

console.log(`> Curent version\n${version}\n`);

if (eslintVersion === version) {
	console.log("No update available");
} else {
	try {
		exec("npm install");
		exec(`npm install eslint@${eslintVersion} --save-dev --save-exact`);
		try {
			exec(`npm install @eslint/js@${eslintVersion} --save-dev --save-exact`);
		} catch (ex) {
			console.error(ex);
			console.log("Trying @eslint/js@latest");
			exec(`npm install @eslint/js@latest --save-dev --save-exact`);
		}
		exec("npm run lint");
		exec("npm run build");
		exec("npm test");
		exec("git config user.email \"<>\"");
		exec("git config user.name \"Github Actions\"");
		exec(`git commit -am "update eslint to v${eslintVersion}"`);
		exec(`npm version ${eslintVersion}`);
		writeFileSync(".npmrc", "//registry.npmjs.org/:_authToken=${NPM_TOKEN}");
		exec("npm publish");
		exec("git push \"https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git\" HEAD:master --follow-tags");
	} catch (ex) {
		console.error(ex);
		process.exit(1);
	}
}
