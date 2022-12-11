const core = require('@actions/core');
const github = require('@actions/github');
const {spawnSync} = require("child_process");


try {
  // `who-to-greet` input defined in action metadata file
  let version = core.getInput('version');  
//   let fetchReleaseUrl = `https://api.github.com/repos/${}/${repo}/releases/latest`
  if (version.toLowerCase === "latest") {
    
  }

  spawnSync(`echo "test_var=true" >> $GITHUB_ENV`)

  
  


  
  
} catch (error) {
  core.setFailed(error.message);
}