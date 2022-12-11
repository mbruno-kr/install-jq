const core = require('@actions/core');
const github = require('@actions/github');
const {spawnSync} = require("child_process");
const fs = require('fs');




try {
  // `who-to-greet` input defined in action metadata file
  let version = core.getInput('version');  
//   let fetchReleaseUrl = `https://api.github.com/repos/${}/${repo}/releases/latest`
  if (version.toLowerCase === "latest") {
    
  }

  fs.appendFileSync(process.env["GITHUB_ENV"], "test_var=true");
    
  
} catch (error) {
  core.setFailed(error.message);
}