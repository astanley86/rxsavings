'use strict';
const express = require('express');
const Database = require('arangojs');
const aql = Database.aql;

// Constants
const PORT = 7042;
const HOST = '0.0.0.0';

// Database Connection
const db = new Database('http://db:8529').useDatabase(process.env.ARANGO_DB).useBasicAuth('root', process.env.ARANGO_ROOT_PASSWORD);

// App
const app = express();
app.get('/', async (req, res) => {
    try {
        const latNum = Number(req.query.lat);
        const longNum = Number(req.query.long);
        if (!req.query.lat || !req.query.long) {
            return res.status(400).send('Request must include longititude and latitude.  Include query string lat and long.');
        }
        if (isNaN(latNum) || isNaN(longNum)) {
            return res.status(400).send('Latitude and Longitude values must be valid numbers.');
        }
        const result = await getNearestPharmacy(latNum, longNum);
        return res.json(result)
    }
    catch (error) {
        res.status(500).json({ error });
    }
});

async function getNearestPharmacy(paramLatitude, paramLongitude) {
    try {
        console.log("parameters: ", paramLatitude, paramLongitude);
        const cursor = await db.query(
            aql`FOR doc IN pharmacies
            LET meters = DISTANCE(doc.latitude, doc.longitude, ${paramLatitude}, ${paramLongitude})
            SORT meters ASC
            LIMIT 1
            RETURN {
                pharmacy: doc.name,
                miles_distance: meters/1609.344,
                address: {
                    address: doc.address,
                    city: doc.city,
                    state: doc.state,
                    zip: doc.zip
                }
            }`
        );
        const pharmacy = await cursor.all();
        return Promise.resolve(pharmacy[0]);
    }
    catch (err) {
        console.log("getNearestPharmacy error: ", err);
        return Promise.reject(`Error retrieving closest pharmacy from db ${err}`);
    }
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);