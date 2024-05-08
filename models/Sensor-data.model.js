// * IMPORTS
const { Schema, model, Types } = require("mongoose");

// * SCHEMA
const SensorDataSchema = new Schema(
	{
		device: {
			required: true,
			type: String,
		},
		data: {
			type: {
				temperature: {
					type: Number,
					required: true,
				},
				humidity: {
					type: Number,
					required: true,
				},
				timestamp: {
					type: String,
					required: true,
				},
			},
			required: true,
		},
	},
	{ collection: "sensor-data" }
);

// * MODEL
const SensorData = model("Sensor-data", SensorDataSchema);

// * EXPORTS
module.exports = SensorData;
