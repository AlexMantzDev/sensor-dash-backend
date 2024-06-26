// * CONFIG
require("dotenv").config();

// * IMPORTS
const express = require("express");
const connectToMongo = require("./lib/mongoose");
const app = express();
const xss = require("xss");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cp = require("cookie-parser");

// * CONSTANTS
// const www = process.env.WWW || "./";
const port = process.env.PORT || port;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const corsOptions = {
	origin: process.env.FRONTEND_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

// * METHODS
const sanitize = (req, res, next) => {
	// Sanitize all string properties of req.query and req.body
	if (req.query) {
		for (let key in req.query) {
			if (typeof req.query[key] === "string") {
				req.query[key] = xss(req.query[key]);
			}
		}
	}
	if (req.body) {
		for (let key in req.body) {
			if (typeof req.body[key] === "string") {
				req.body[key] = xss(req.body[key]);
			}
		}
	}
	next();
};

// * MIDDLEWARE
// app.use(express.static(www));
app.use(cp(process.env.CP_SECRET));
app.use(express.json());
app.use(helmet());
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(limiter);
app.use(sanitize);

// * ROUTES
app.use("/sensor-dash/v1/sensor-data", require("./routes/sensor-data.routes"));
app.use("/sensor-dash/v1/devices", require("./routes/devices.routes"));
app.use("/sensor-dash/v1/auth", require("./routes/auth.routes"));

// * START
(async function startServer() {
	await connectToMongo(process.env.MONGO_URI);
	app.listen(port, () => console.log(`listening on http://localhost:${port}`));
})();
