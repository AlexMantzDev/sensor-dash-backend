const crypto = require("crypto");

const generateSerial = (bits) => {
	return crypto.randomBytes(bits).toString("hex");
};

const serial64 = generateSerial(64);
const serial256 = generateSerial(256);

console.log(`64 bit: ${serial64}`);

console.log(`256 bit: ${serial256}`);
