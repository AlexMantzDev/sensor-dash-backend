// * IMPORTS
const Device = require("../models/Device.model.js");
const User = require("../models/User.model.js");
const SensorData = require("../models/Sensor-data.model.js");

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
// GET device by serial number
const getDeviceBySerialNo = async (req, res) => {
	const { serialNo } = req.params;
	const { userId } = req.user;
	if (!serialNo) {
		return res.status(400).json({ message: "Serial number is required" });
	}
	const device = await Device.findOne({ ownerId: userId, serialNo });
	if (!device) {
		return res.status(404).json({ message: "Device not found" });
	}
	res.status(200).json({ data: { device } });
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
	const { serialNo } = req.params;
	const { userId } = req.user;
	if (!serialNo) {
		return res.status(400).json({ message: "Serial number is required" });
	}
	const device = await Device.findOne({ ownerId: userId, serialNo });
	if (!device) {
		return res.status(404).json({ message: "Device not found" });
	}
	const id = device._id.toString();
	await Device.findByIdAndDelete(id);
	await User.findByIdAndUpdate(userId, { $pull: { devices: serialNo } });
	await SensorData.deleteMany({ device: serialNo });
	res.status(204).json({ message: "Device deleted" });
};

// * EXPORTS
module.exports = {
	getAllDevices,
	getDeviceBySerialNo,
	addDevice,
	updateDevice,
	deleteDevice,
};
