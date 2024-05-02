// * IMPORTS
const { authenticateUser } = require("../middleware/auth.middleware.js");
const {
	getAllDevices,
	addDevice,
} = require("../controllers/devices.controller.js");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", authenticateUser, getAllDevices);
router.post("/add", authenticateUser, addDevice);

// * EXPORTS
module.exports = router;
