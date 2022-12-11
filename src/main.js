const { default: axios } = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");
try {
  // `who-to-greet` input defined in action metadata file
  let tag = core.getInput("tag");
  let fetchReleaseUrl;

  if (tag.toLowerCase() === "latest") {
    fetchReleaseUrl = `https://api.github.com/repos/stedolan/jq/releases/latest`;
  } else {
    fetchReleaseUrl = `https://api.github.com/repos/stedolan/jq/releases/tags/${tag}`;
  }

  console.log({ status: "fetching", fetchReleaseUrl });

  axios.get(fetchReleaseUrl).then(console.log);
} catch (error) {
  core.setFailed(error.message);
}
