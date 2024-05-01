// * IMPORTS
const Device = require("../models/Device.model.js");

// * METHODS
// GET all devices
const getAllDevices = async (req, res) => {
	const devices = await Device.find({});
	res.status(200).json(devices);
};
// POST add device
const addDevice = async (req, res) => {
	try {
		const { ownerId } = req.body;
		const device = new Device({ ownerId });
		await device.save();
		console.log(device);
		res.status(201).json(device);
	} catch (error) {
		console.log(error);
	}
};
// PUT update device
const updateDevice = async () => {};
// DELETE delete device
const deleteDevice = async () => {};

// * EXPORTS
module.exports = {
	getAllDevices,
	addDevice,
	updateDevice,
	deleteDevice,
};
