const axios = require("axios").default;

let proxy;
if (process.env["HTTPS_PROXY"]) {
  proxy = new URL(process.env["HTTPS_PROXY"]);
} else if (process.env["HTTP_PROXY"]) {
  proxy = new URL(process.env["HTTP_PROXY"]);
}

const baseURL = "https://api.github.com";

let options = {
  baseURL,
};

if (proxy) {
  options["proxy"] = {
    host: proxy.host,
    port: proxy.port,
  };
}

export const client = axios.create(options);
