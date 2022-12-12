const axios = require("axios").default;

let proxy;
if (process.env["HTTPS_PROXY"]) {
  proxy = new URL(process.env["HTTPS_PROXY"]);
} else if (process.env["HTTP_PROXY"]) {
  proxy = new URL(process.env["HTTP_PROXY"]);
}

const baseURL = "https://api.github.com";
let client = axios.create({
  baseURL,
});
if (proxy) {
  client = axios.create({
    baseURL,
    proxy: {
      host: proxy.host,
      port: proxy.port,
    },
  });
}

export default client;
