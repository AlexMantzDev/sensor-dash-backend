// * IMPORTS
const Device = require("../models/Device.model.js");

// * METHODS
// GET all devices
const getAllDevices = async (req, res) => {
	const { userId } = req.user;
	const devices = await Device.find({ ownerId: userId });
	res.status(200).json(devices);
};
// POST add device
const addDevice = async (req, res) => {
	const { userId: ownerId } = req.user;
	const device = new Device({ ownerId });
	await device.save();
	console.log(device);
	res.status(201).json({ data: { device } });
};

// * EXPORTS
module.exports = {
	getAllDevices,
	addDevice,
};
