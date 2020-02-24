const crypto = require('crypto');

const csv = '752';

const iv = crypto
	.randomBytes(16)
	.toString('hex')
	.slice(0, 16);

console.log(iv);

const key = crypto
	.createHash('sha256')
	.update('A9279120481620090622AA30', 'utf8')
	.digest('hex');

const key2 = crypto
	.createHash('sha256')
	.update('A9279120481620090622AA30', 'utf8')
	.digest('base64');

const key3 = crypto
	.createHash('sha256')
	.update('A9279120481620090622AA30', 'utf8')
	.digest('base64')
	.substr(0, 16);

var encrypt = function(key, iv, data) {
	var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
	var crypted = cipher.update(data, 'utf8', 'binary');
	var cbase64 = new Buffer(crypted, 'binary').toString('base64');
	//console.log(crypted);
	//console.log(cbase64);
	crypted += cipher.final('binary');
	//console.log("hahahaaaaaa:"+crypted.toString('hex'));
	crypted = new Buffer(crypted, 'binary').toString('base64');
	//var c16 = new Buffer(crypted, 'binary').toString(16);
	//console.log(crypted);
	//console.log(c16);

	return crypted;
};

const cipher = crypto.createCipheriv('aes-128-cbc', key3, '');

let encrypted = cipher.update(csv, 'utf8', 'base64');

encrypted += cipher.final('base64');

let trim = encrypted.trim();

// let test = encrypt(key3, '0000000000000000', 'Hola');

// console.log(test);

console.log(`
CSV: ${csv}
IV: ${iv}
KEY: ${key}
KEY2: ${key2}
KEY3: ${key3}
CIPHER: ${cipher}
ENCRYPTED: ${encrypted}
trim: ${trim}
`);

// 1C/ZAsci1qStYWHBWCZggg==
