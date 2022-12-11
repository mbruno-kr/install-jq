const core = require("@actions/core");
const github = require("@actions/github");
const { spawnSync } = require("child_process");
const fs = require("fs");
const { glob } = require("glob");

try {
  // `who-to-greet` input defined in action metadata file
  let version = core.getInput("version");
  //   let fetchReleaseUrl = `https://api.github.com/repos/${}/${repo}/releases/latest`
  glob(
    "/home/runner/work/_temp/_runner_file_commands/add_path_*",
    (e, (files) => console.log(files))
  );
  if (version.toLowerCase === "latest") {
  }

  console.log(process.env["GITHUB_PATH"]);
  fs.appendFileSync(process.env["GITHUB_ENV"], "test_var=true");
} catch (error) {
  core.setFailed(error.message);
}
