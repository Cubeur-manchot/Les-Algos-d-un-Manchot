const express = require("express");
const path = require("path");

const app = express();

app.get(/script\.js/, (req, res) => {
	res.sendFile(path.resolve(".", "script.js"));
});

app.get(/^.*$/, (req, res) => {
	res.sendFile(path.resolve(".", "index.html"));
});

app.listen(1234, () => console.log("Ça tourne..."));
