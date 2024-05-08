// * IMPORTS
const {
	getData,
	getAllData,
	logData,
	deleteData,
	genDummyData,
} = require("../controllers/sensor-data.controller.js");
const { authenticateUser } = require("../middleware/auth.middleware");

// * ROUTER
const router = require("express").Router();

// * ROUTES
router.get("/", authenticateUser, getAllData);
router.get("/:id", authenticateUser, getData);
router.post("/log", authenticateUser, logData);
router.post("/dummy", authenticateUser, genDummyData);
router.delete("/:id", authenticateUser, deleteData);

// * EXPORTS
module.exports = router;
