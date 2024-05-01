// * IMPORTS
const { Schema, model, Types } = require("mongoose");

// * SCHEMA
const DeviceSchema = new Schema({
	ownerId: {
		require: true,
		// type: Types.ObjectId,
		type: String,
		ref: "User",
	},
});

// * MODEL
const Device = model("Device", DeviceSchema);

// * EXPORTS
module.exports = Device;
