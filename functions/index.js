const functions = require("firebase-functions");
const express = require("express");
const app = express();
const membersRouter = require("./api/controllers/membersize_controller");

app.use(express.json());
app.use("/members", membersRouter);

exports.api = functions.https.onRequest(app);

// To handle "Function Timeout" exception
exports.functionsTimeOut = functions.runWith({
  timeoutSeconds: 300,
});

exports.setupdb = functions.https.onRequest(require("./setup_database"));