// * IMPORTS
const SensorData = require("../models/Sensor-data.model");

// * METHODS
// GET all data
const getData = async (req, res) => {
	const { deviceId } = req.body;
	if (!deviceId) {
		res.status(400).json({ message: "Device ID is required" });
	}
	const data = await SensorData.find({ deviceId });
	if (!data || data.length === 0) {
		res.status(404).json({ message: "Data not found" });
	}
	res.status(200).json({ data: { data } });
};
// POST send data
const sendData = async (req, res) => {
	const { deviceId, data } = req.body;
	if (!deviceId || !data) {
		res.status(400).json({ message: "Device ID and data are required" });
	}
	const newData = new SensorData({ deviceId, data });
	await newData.save();
	res.status(201).json({ data: { newData } });
};
// DELETE data
const deleteData = async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({ message: "Data entry ID is required" });
	}
	await SensorData.findByIdAndDelete(id);
	res.status(204).json({ message: "Data deleted" });
};

// * EXPORTS
module.exports = {
	getData,
	sendData,
	deleteData,
};
