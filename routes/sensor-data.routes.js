// * IMPORTS
const {
	getData,
	getAllData,
	sendData,
	deleteData,
} = require("../controllers/sensor-data.controller.js");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", getAllData);
router.get("/:id", getData);
router.post("/add", sendData);
router.delete("/:id", deleteData);

// * EXPORTS
module.exports = router;
