const crypto = require('crypto');

const cvv = '752';
const tlf = '1234';

const keyBank = 'A9279120481620090622AA30';

const hashKEY = function(key, opt) {
	if (opt === 'base64' || opt === 'hex') {
		return crypto
			.createHash('sha256')
			.update(key, 'utf8')
			.digest(opt);
	} else if (opt === 'binary') {
		return crypto
			.createHash('sha256')
			.update(key)
			.digest();
	} else {
		console.log('Error en hashKEY');
	}
};

const binaryHK = hashKEY(keyBank, 'binary');
const base64HK = hashKEY(keyBank, 'base64');
const hexHK = hashKEY(keyBank, 'hex');

console.log(`-----
binaryHK: ${binaryHK}
*-> ${binaryHK.length}
base64HK: ${base64HK}
*-> ${base64HK.length}
hexHK: ${hexHK}
*-> ${hexHK.length}
-----`);

const binaryHK_16 = binaryHK.slice(0, 16);
const base64HK_16 = base64HK.slice(0, 16);
const hexHK_16 = hexHK.slice(0, 16);

console.log(`-----
binaryHK[16]: ${binaryHK_16}
*-> ${binaryHK_16.length}
base64HK[16]: ${base64HK_16}
*-> ${base64HK_16.length}
hexHK[16]: ${hexHK_16}
*-> ${hexHK_16.length}
-----`);

const encrypt = function(key, opt, iv, data) {
	if (opt === 'base64' || opt === 'hex') {
		let cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
		let crypted = cipher.update(data, 'utf8', opt);
		crypted += cipher.final(opt);
		crypted.trim();
		return crypted;
	} else if (opt === 'binary') {
		let cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
		let crypted = cipher.update(data, 'utf8', opt);
		crypted += cipher.final(opt);
		crypted.trim();

		// crypted = new Buffer(crypted, 'binary').toString('base64');
		crypted = Buffer.from(crypted, 'binary').toString('base64');

		return crypted;
	} else {
		console.log('Error en encrypt');
	}
};

let cvv_binary_encrypt = encrypt(binaryHK_16, 'binary', '', cvv);
let cvv_base64_encrypt = encrypt(base64HK_16, 'base64', '', cvv);
let cvv_hex_encrypt = encrypt(hexHK_16, 'hex', '', cvv);
let tlf_binary_encrypt = encrypt(binaryHK_16, 'binary', '', tlf);
let tlf_base64_encrypt = encrypt(base64HK_16, 'base64', '', tlf);
let tlf_hex_encrypt = encrypt(hexHK_16, 'hex', '', tlf);

console.log(`-----
cvv_binary_encrypt: ${cvv_binary_encrypt}
cvv_base64_encrypt: ${cvv_base64_encrypt}
cvv_hex_encrypt: ${cvv_hex_encrypt}
tlf_binary_encrypt: ${tlf_binary_encrypt}
tlf_base64_encrypt: ${tlf_base64_encrypt}
tlf_hex_encrypt: ${tlf_hex_encrypt}
-----`);

var decrypt = function(key, opt, iv, crypted) {
	if (opt === 'base64' || opt === 'hex') {
		var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
		var decoded = decipher.update(crypted, opt, 'utf8');
		decoded += decipher.final('utf8');

		return decoded;
	} else if (opt === 'binary') {
		// crypted = new Buffer(crypted, 'base64').toString('binary');
		crypted = Buffer.from(crypted, 'base64').toString('binary');

		var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
		var decoded = decipher.update(crypted, opt, 'utf8');
		decoded += decipher.final('utf8');

		return decoded;
	} else {
		console.log('Error en decrypt');
	}
};

let cvv_binary_decrypt = decrypt(binaryHK_16, 'binary', '', cvv_binary_encrypt);
let cvv_base64_decrypt = decrypt(base64HK_16, 'base64', '', cvv_base64_encrypt);
let cvv_hex_decrypt = decrypt(hexHK_16, 'hex', '', cvv_hex_encrypt);
let tlf_binary_decrypt = decrypt(binaryHK_16, 'binary', '', tlf_binary_encrypt);
let tlf_base64_decrypt = decrypt(base64HK_16, 'base64', '', tlf_base64_encrypt);
let tlf_hex_decrypt = decrypt(hexHK_16, 'hex', '', tlf_hex_encrypt);

console.log(`-----
cvv_binary_decrypt: ${cvv_binary_decrypt}
cvv_base64_decrypt: ${cvv_base64_decrypt}
cvv_hex_decrypt: ${cvv_hex_decrypt}
tlf_binary_decrypt: ${tlf_binary_decrypt}
tlf_base64_decrypt: ${tlf_base64_decrypt}
tlf_hex_decrypt: ${tlf_hex_decrypt}
-----`);
