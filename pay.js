var request = require('request');

var options = {
	method: 'POST',
	url: 'https://apimbu.mercantilbanco.com:9443/mercantil-banco/desarrollo/v1/payment/pay',
	headers: {
		accept: 'application/json',
		'content-type': 'application/json',
		'x-ibm-client-id': '9860e0f2-ed46-495e-a25f-ef377ea645f6',
		environment: 'test',
		apikey: 'mbu1',
	},
	body: {
		merchant_identify: { integratorId: 31, merchantId: 150332, terminalId: 'abcdemac' },
		client_identify: {
			ipaddress: '10.0.0.1',
			browser_agent: 'Chrome 18.1.3',
			mobile: {
				manufacturer: 'Samsung',
				model: 'S9',
				os_version: 'Oreo 9.1',
				location: { lat: 37.4224764, lng: -122.0842499 },
			},
		},
		transaction: {
			trx_type: 'compra',
			payment_method: 'tdd',
			card_number: '501878200066287386',
			customer_id: 'V18366876',
			invoice_number: '121233',
			account_type: 'CC',
			twofactor_auth: 'F5zai+S5sgmbdNPDEVRlVg==',
			expiration_date: '2021/11',
			cvv: 'BCqzVtesja27ClW0fi4EfA==',
			currency: 'ves',
			amount: 30.11,
		},
	},
	json: true,
};

request(options, (error, response, body) => {
	if (error) return console.error('Failed: %s', error.message);

	console.log('Success: ', body);
});
