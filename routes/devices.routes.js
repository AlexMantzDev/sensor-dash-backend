// * IMPORTS
const { authenticateUser } = require("../middleware/auth.middleware.js");
const {
	getAllDevices,
	addDevice,
	updateDevice,
	deleteDevice,
} = require("../controllers/devices.controller.js");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", authenticateUser, getAllDevices);
router.post("/add", authenticateUser, addDevice);
router.patch("/:id", authenticateUser, updateDevice);
router.delete("/:id", authenticateUser, deleteDevice);

// * EXPORTS
module.exports = router;
