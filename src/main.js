const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs/promises");
const { appendStepSummary } = require("./utils/gh");
const { client } = require("./http");

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
  client
    .get(fetchReleaseUrl)
    .then((response) => client.get(response.data.assets_url))
    .then(({ data }) =>
      Promise.resolve(data.find(({ name }) => name.includes("linux64")))
    )
    .then(({ browser_download_url }) =>
      client.get(browser_download_url, {
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
