// * IMPORTS
const SensorData = require("../models/Sensor-data.model");
const Device = require("../models/Device.model");

// * METHODS
// GET all data
const getData = async (req, res) => {
	const { deviceId } = req.body;
	const { userId } = req.user;
	if (!deviceId) {
		return res.status(400).json({ message: "Device ID is required" });
	}
	const device = await Device.findOne({ _id: deviceId });
	if (!device) {
		return res.status(404).json({ message: "Device not found" });
	}
	if (device.ownerId !== userId) {
		return res.status(403).json({ message: "Unauthorized" });
	}
	const data = await SensorData.find({ deviceId });
	if (!data || data.length === 0) {
		return res.status(404).json({ message: "Data not found" });
	}
	res.status(200).json({ data });
};
// GET all data
const getAllData = async (req, res) => {
	const { userId } = req.user;
	const devices = await Device.find({ ownerId: userId });
	if (!devices || devices.length === 0) {
		return res.status(404).json({ message: "Devices not found" });
	}
	const deviceIds = devices.map((device) => device._id);
	const data = await SensorData.find({ deviceId: { $in: deviceIds } });
	if (!data || data.length === 0) {
		return res.status(404).json({ message: "Data not found" });
	}
	res.status(200).json({ data });
};
// POST send data
const sendData = async (req, res) => {
	const { deviceId, data } = req.body;
	if (!deviceId || !data) {
		return res.status(400).json({ message: "Device ID and data are required" });
	}
	const newData = new SensorData({ deviceId, data });
	await newData.save();
	res.status(201).json({ data: { newData } });
};
// DELETE data
const deleteData = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: "Data entry ID is required" });
	}
	await SensorData.findByIdAndDelete(id);
	res.status(204).json({ message: "Data deleted" });
};

// * EXPORTS
module.exports = {
	getAllData,
	getData,
	sendData,
	deleteData,
};
