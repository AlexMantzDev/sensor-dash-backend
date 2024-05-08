// * IMPORTS
const SensorData = require("../models/Sensor-data.model");
const Device = require("../models/Device.model");
const User = require("../models/User.model");

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
	const deviceSerialNos = devices.map((device) => device.serialNo);
	const data = await SensorData.find({ device: { $in: deviceSerialNos } });
	if (!data || data.length === 0) {
		return res.status(404).json({ message: "Data not found" });
	}
	res.status(200).json({ data });
};
// POST send data
const logData = async (req, res) => {
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

const genDummyData = async (req, res) => {
	const { serialNo, numEntries } = req.body;
	const { userId } = req.user;

	if (!serialNo) {
		return res
			.status(400)
			.json({ message: "Device serial number is required" });
	}
	if (!numEntries) {
		return res.status(400).json({ message: "Number of entries is required" });
	}

	let device = await Device.findOne({ serialNo });
	if (!device) {
		device = await Device.create({ ownerId: userId, serialNo });
	}

	let user = await User.findById(userId);
	if (!user.devices.includes(device.serialNo)) {
		user.devices.push(device.serialNo);
		await user.save();
	}

	const data = [];
	for (let i = 0; i < numEntries; i++) {
		let date = new Date(Date.now()).setHours(i, 0, 0, 0);
		data.push({
			device: device.serialNo,
			data: {
				temperature: Math.floor(Math.random() * 20) + 50,
				humidity: Math.floor(Math.random() * 10) + 60,
				timestamp: date.toString(),
			},
		});
	}
	await SensorData.insertMany(data);
	res.status(201).json({ data });
};

// * EXPORTS
module.exports = {
	getAllData,
	getData,
	logData,
	deleteData,
	genDummyData,
};
