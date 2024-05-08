// * IMPORTS
const { Schema, model, Types } = require("mongoose");

// * SCHEMA
const DeviceSchema = new Schema({
	serialNo: {
		type: String,
		required: true,
		unique: true,
	},
	ownerId: {
		require: true,
		type: Types.ObjectId,
		ref: "User",
	},
});

// * MODEL
const Device = model("Device", DeviceSchema);

// * EXPORTS
module.exports = Device;
