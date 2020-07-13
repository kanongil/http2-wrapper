'use strict';
const http2 = require('../../source'); // Note: using the local version

const agent = new http2.proxies.H2overH2({
	url: 'https://username:password@localhost:8000',
	proxyOptions: {
		// Remove the following line if the server doesn't support the extended CONNECT protocol
		extendedProtocol: 'tcp',
		// For demo purposes only!
		rejectUnauthorized: false
	}
});

const request = http2.request({
	hostname: 'httpbin.org',
	protocol: 'https:',
	path: '/anything',
	method: 'POST',
	headers: {
		'content-length': 6
	},
	agent
}, response => {
	console.log('statusCode:', response.statusCode);
	console.log('headers:', response.headers);

	const body = [];
	response.on('data', chunk => {
		body.push(chunk);
	});
	response.on('end', () => {
		console.log('body:', Buffer.concat(body).toString());
	});
});

request.on('error', console.error);

request.write('123');
request.end('456');
