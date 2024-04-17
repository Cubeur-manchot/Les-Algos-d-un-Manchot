"use strict";

const express = require("express");
const path = require("path");

const app = express();

// script.js
app.get(/script\.js/, (req, res) => {
	res.sendFile(path.resolve(".", "script.js"));
});

// /views/*.js
app.get(/views\/.*\.js/, (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

// /images/*
app.get(/images/, (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

// 404.html
app.get(/404\.html/, (req, res) => {
	res.sendFile(path.resolve(".", "404.html"));
});

// /styles/*.css
app.get(/styles\/.*\.css/, (req, res) => {
	res.sendFile(path.join(__dirname, req.url));
});

// *.html
app.get(/^.*\.html*$/, (req, res) => {
	res.sendFile(path.resolve(".", "index.html"));
});

// no extension
app.get(/^[^.]*$/, (req, res) => {
	res.sendFile(path.resolve(".", "index.html"));
});

app.listen(1234, () => console.log("Server started..."));
