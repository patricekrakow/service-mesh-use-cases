// service-a-v1.0.0/app.js
'use strict';
const express = require('express');
const os = require('os');
const HOSTNAME = '0.0.0.0';
const PORT = 3000;
const SERVICE_NAME = "service-a";  // Synced (manually) with package.json
const SERVICE_VERSION = "1.0.0";   // Synced (manually) with package.json
const app = express();
// get /path-01
app.get('/path-01', (req, res) => {
  res.send({
    message: "Hello from get /path-01!",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: {
        configured: HOSTNAME,
        fromOS: os.hostname()
      },
      port: PORT
    }
  });
});
// get /path-02
app.get('/path-02', (req, res) => {
  res.send({
    message: "Hello from get /path-02!",
    internalInfo: {
      serviceName: SERVICE_NAME,
      version: SERVICE_VERSION,
      hostname: {
        configured: HOSTNAME,
        fromOS: os.hostname()
      },
      port: PORT
    }
  });
});
app.listen(PORT, HOSTNAME);
console.log(`Running on http://${HOSTNAME}:${PORT}`);
