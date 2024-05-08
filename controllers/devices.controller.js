// * IMPORTS
const Device = require("../models/Device.model.js");
const User = require("../models/User.model.js");

// * METHODS
// GET all devices
const getAllDevices = async (req, res) => {
	const { userId } = req.user;
	const devices = await Device.find({ ownerId: userId });
	if (!devices || devices.length === 0) {
		return res.status(404).json({ message: "Devices not found" });
	}
	res.status(200).json(devices);
};
// POST add device
const addDevice = async (req, res) => {
	const { userId: ownerId } = req.user;
	const device = new Device({ ownerId });
	await device.save();
	res.status(201).json({ data: { device } });
};

const updateDevice = async (req, res) => {};

const deleteDevice = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.user;
	if (!id) {
		return res.status(400).json({ message: "Device ID is required" });
	}
	await Device.findByIdAndDelete(id);
	await User.findByIdAndUpdate(userId, { $pull: { devices: id } });
	res.status(204).json({ message: "Device deleted" });
};

// * EXPORTS
module.exports = {
	getAllDevices,
	addDevice,
	updateDevice,
	deleteDevice,
};
