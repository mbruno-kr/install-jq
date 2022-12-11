const {default: axios} = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");
try {
  // `who-to-greet` input defined in action metadata file
  let version = core.getInput("tag");
  let fetchReleaseUrl;
  
  if (version.toLowerCase === "latest") {
    fetchReleaseUrl = `https://api.github.com/repos/${"stedolan"}/${"jq"}/releases/latest`
  } else {
    fetchReleaseUrl = `https://api.github.com/repos/${"stedolan"}/${"jq"}/releases/tags/${tag}`
  }

  axios.get(fetchReleaseUrl).then(console.log)

  
  

  
} catch (error) {
  core.setFailed(error.message);
}
