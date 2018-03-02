// gis-api/index.js - Created March 2nd, 2018

// NPM Modules
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const Tile38 = require('tile38');

const client = new Tile38({ host: 'localhost', port: 9851, debug: true });

// Inject bodyParser middleware to get request body
// to support JSON-encoded bodies (currently disabled)
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true,
}));

// GET /
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// POST /loc
app.post('/loc', (req, res) => {
	const id = req.body.id;
	const lat = req.body.lat;
	const lon = req.body.long;

	console.log(`POST /loc -> ID: ${id} (lat: ${lat}, lon: ${lon})`);

	client.set('users', `${id}`, [lat, lon]).then(() => {
		console.log('your changes have been persisted');
		res.send('Set.');
	});
});


app.listen(8080, () => console.log('Example app listening on port 8080!'));