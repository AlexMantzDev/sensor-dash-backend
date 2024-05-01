// * IMPORTS
const {
	getAllDevices,
	addDevice,
	updateDevice,
	deleteDevice,
} = require("../controllers/devices.controller.js");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", getAllDevices);
router.post("/add", addDevice);
router.put("/update/:id", updateDevice);
router.delete("/delete/:id", deleteDevice);

// * EXPORTS
module.exports = router;
