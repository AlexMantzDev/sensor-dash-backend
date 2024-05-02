// * IMPORTS
const {
	getData,
	sendData,
	deleteData,
} = require("../controllers/sensor-data.controller.js");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", getData);
router.post("/add", sendData);
router.delete("/delete/:id", deleteData);

// * EXPORTS
module.exports = router;
