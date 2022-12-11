const fs = require("fs");

export function appendEnv(key, value) {
  fs.appendFileSync(process.env["GITHUB_ENV"], "test_var=true");
}

export function appendPath(path) {
  fs.appendFileSync(process.env["GITHUB_ENV"], "test_var=true");
}
