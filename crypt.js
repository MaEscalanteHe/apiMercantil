const crypto = require('crypto');

const hashKEY_16B = keyBank => {
	try {
		return crypto
			.createHash('sha256')
			.update(keyBank)
			.digest()
			.slice(0, 16);
	} catch (error) {
		console.log(error);
	}
};

const encrypt = (keyHashed, iv, data) => {
	try {
		let cipher = crypto.createCipheriv('aes-128-ecb', keyHashed, iv);
		let crypted = cipher.update(data, 'utf8', 'binary');
		crypted += cipher.final('binary');
		crypted.trim();

		crypted = Buffer.from(crypted, 'binary').toString('base64');

		return crypted;
	} catch (error) {
		console.log(error);
	}
};

const decrypt = (keyHashed, iv, crypted) => {
	try {
		crypted = Buffer.from(crypted, 'base64').toString('binary');

		let decipher = crypto.createDecipheriv('aes-128-ecb', keyHashed, iv);
		let decoded = decipher.update(crypted, 'binary', 'utf8');
		decoded += decipher.final('utf8');

		return decoded;
	} catch (error) {
		console.log(error);
	}
};
