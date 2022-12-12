const fs = require("fs");

export function appendEnv(key, value) {
  fs.appendFileSync(process.env["GITHUB_ENV"], `${key}=${value}`);
}

export function appendPath(path) {
  fs.appendFileSync(process.env["GITHUB_PATH"], path);
}

export function appendStepSummary(content) {
  fs.appendFileSync(process.env["GITHUB_STEP_SUMMARY"], content);
}
