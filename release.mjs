import { getIDToken } from "@actions/core";
import { execSync } from "child_process";
import { version, name } from "./package.json" with { type: "json" };

function exec(command) {
  console.log(`> ${command}`);
  let output;
  try {
    output = execSync(command, { cwd: __dirname, encoding: "utf8" });
  } catch (ex) {
    throw new Error(ex.stdout ? ex.stdout : ex.stderr);
  }
  output = output.trim();
  console.log(`${output}\n`);
  return output;
}

async function connectOIDC() {
  const token = await getIDToken("npm:registry.npmjs.org");
  const response = await fetch(
    `https://registry.npmjs.org/-/npm/v1/oidc/token/exchange/package/${name}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.token;
  } else {
    const errorBody = await response.text();
    throw new Error(
      `Failed to get OIDC token: ${response.status} ${response.statusText}\n${errorBody}`,
    );
  }
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
  const oidcToken = await connectOIDC();
  try {
    exec(`npm config set //registry.npmjs.org/:_authToken=${oidcToken}`);

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
    exec('git config user.email "<>"');
    exec('git config user.name "Github Actions"');
    exec(`git commit -am "update eslint to v${eslintVersion}"`);
    exec(`npm version ${eslintVersion}`);
    exec("npm publish");
    exec(
      'git push "https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" HEAD:master --follow-tags',
    );
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}
