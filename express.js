"use strict";

const express = require("express");
const path = require("path");

const app = express();

app.get(/.*/, (req, res) => {
	res.sendFile(path.join(__dirname,
		req.url.includes(".html") || !req.url.includes(".")
			? "index.html"
			: req.url.includes("404")
				? "404.html"
				: req.url.includes("script.js")
					? "script.js"
					: req.url.includes("/views")
						? `/views/${req.url.split("/").at(-1)}`
						: req.url.includes("/services")
							? `/services/${req.url.split("/").at(-1)}`
							: req.url.includes("/images")
								? req.url.replace(/.*(?=\/images\/)/, "")
								: req.url.includes("/styles")
									? `/styles/${req.url.split("/").at(-1)}`
									: req.url.includes("/data")
										? `/data/${req.url.split("/").at(-1)}`
										: null
	));
});

app.listen(1234, () => console.log("Server started..."));
