const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const compression = require("compression");
const morgan = require("morgan");

const { createRequestHandler } = require("@remix-run/express");

const app = express();

const port = process.env.PORT || 3000;
// load the SSL certificate
const privateKey = fs.readFileSync("/etc/letsencrypt/live/jepperson.us/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/jepperson.us/fullchain.pem", "utf8");
// const ca = fs.readFileSync('/etc/letsencrypt/live/jepperson.us/cert.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
};

// create an https server
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

const BUILD_DIR = path.join(process.cwd(), "build");

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
app.use("/build", express.static("public/build", { immutable: true, maxAge: "1y" }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "24h" }));

app.use(morgan("tiny"));

app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();
        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
