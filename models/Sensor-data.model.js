// * IMPORTS
const { Schema, model, Types } = require("mongoose");

// * SCHEMA
const SensorDataSchema = new Schema({
	device: {
		required: true,
		type: Types.ObjectId,
		ref: "Device",
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
				type: Number,
				required: true,
			},
		},
		required: true,
	},
});

// * MODEL
const Device = model("Sensor-data", SensorDataSchema);

// * EXPORTS
module.exports = Device;
