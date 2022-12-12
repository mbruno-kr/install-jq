const { default: axios } = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs/promises");
const { appendStepSummary } = require("./utils/gh");

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
  axios
    .get(fetchReleaseUrl)
    .then((response) => axios.get(response.data.assets_url))
    .then(({ data }) =>
      Promise.resolve(data.find(({ name }) => name.includes("linux64")))
    )
    .then(({ browser_download_url }) =>
      axios.get(browser_download_url, {
        responseType: "arraybuffer", // Important
      })
    )
    .then(async (response) =>
      fs.writeFile("/usr/local/bin/jq", response.data, {
        encoding: "binary",
      })
    )
    .then(() =>
      appendStepSummary(
        [
          "## JQ Installation"`Installed jq to /usr/local/bin/jq with tag ${tag}`,
        ].join("\n")
      )
    );
} catch (error) {
  core.setFailed(error.message);
}
