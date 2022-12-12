const { default: axios } = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs/promises");
const { appendStepSummary } = require("./utils/gh");
const http = require("./http");

try {
  // `who-to-greet` input defined in action metadata file
  let tag = core.getInput("tag");
  let fetchReleaseUrl;

  if (tag.toLowerCase() === "latest") {
    fetchReleaseUrl = `/repos/stedolan/jq/releases/latest`;
  } else {
    fetchReleaseUrl = `/repos/stedolan/jq/releases/tags/${tag}`;
  }

  console.log({ status: "fetching", fetchReleaseUrl });
  http
    .get(fetchReleaseUrl)
    .then((response) => http.get(response.data.assets_url))
    .then(({ data }) =>
      Promise.resolve(data.find(({ name }) => name.includes("linux64")))
    )
    .then(({ browser_download_url }) =>
      http.get(browser_download_url, {
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
          "## JQ Installation",
          `Installed jq to /usr/local/bin/jq with tag ${tag}`,
        ].join("\n")
      )
    );
} catch (error) {
  core.setFailed(error.message);
}
