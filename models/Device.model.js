// * IMPORTS
const { Schema, model, Types } = require("mongoose");

// * SCHEMA
const DeviceSchema = new Schema({
	fakeId: {
		type: String,
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
