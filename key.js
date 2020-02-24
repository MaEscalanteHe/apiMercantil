const crypto = require('crypto');

const cvv = '563';
const annon = '1C/ZAsci1qStYWHBWCZggg==';

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
	if (opt === 'base64' || opt === 'hex' || opt === 'binary') {
		let cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
		let crypted = cipher.update(data, 'utf8', opt);
		crypted += cipher.final(opt);
		crypted.trim();
		return crypted;
	} else {
		console.log('Error en encrypt');
	}
};

let binary_encrypt = encrypt(binaryHK_16, 'binary', '', cvv) || undefined;
let base64_encrypt = encrypt(base64HK_16, 'base64', '', cvv);
let hex_encrypt = encrypt(hexHK_16, 'hex', '', cvv);

console.log(`-----
binary_encrypt: ${binary_encrypt}
base64_encrypt: ${base64_encrypt}
hex_encrypt: ${hex_encrypt}
-----`);

var decrypt = function(key, opt, iv, crypted) {
	if (opt === 'base64' || opt === 'hex' || opt === 'binary') {
		// crypted = new Buffer(crypted, 'base64').toString('binary');
		var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
		var decoded = decipher.update(crypted, opt, 'utf8');
		// console.log(decoded);
		decoded += decipher.final('utf8');
		//console.log(decoded);
		return decoded;
	} else {
		console.log('Error en decrypt');
	}
};

// let test = decrypt(binaryHK_16, 'binary', '', annon);

let binary_decrypt = decrypt(binaryHK_16, 'binary', '', binary_encrypt) || undefined;
let base64_decrypt = decrypt(base64HK_16, 'base64', '', base64_encrypt);
let hex_decrypt = decrypt(hexHK_16, 'hex', '', hex_encrypt);

console.log(`-----
binary_decrypt: ${binary_decrypt}
base64_decrypt: ${base64_decrypt}
hex_decrypt: ${hex_decrypt}
-----`);

// 1C/ZAsci1qStYWHBWCZggg==
