const readline = require('readline');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let records = [];

let currentRecord = createNewRecord();

function createNewRecord() {
    const defaultRecord = {
        id: uuidv4(),
        category: 'Food',
        city: 'Seattle, WA'
    }
    return defaultRecord;
}

// Food
// Shelter
// MentalHealth
// LegalAssistance
// WomenAndChildren
// Hotline

async function getGeoLocation(address) {
    const axios = require('axios');
    const apiKey = 'AIzaSyD8gb4eNZalF6tuXoc29D9_MolYTXWgUCM';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const location = response.data.results[0].geometry.location;
        return location;
    } catch (error) {
        console.error('Error fetching geolocation:', error);
    }
}

async function fillRecordWithGeoLocation(record) {
    if (record.address) {
        const location = await getGeoLocation(record.address);
        record.latitude = location.lat.toString();
        record.longitude = location.lng.toString();
    }
    return record;
}

async function readFile(fileName) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        // output: process.stdout,
        console: false
    });
    readInterface.on('line', async function (line) {
        if (line == '') {
            return;
        }
        const match = line.match(/([^:]*):(.*)/);
        if (match) {
            const key = match[1].trim().toLowerCase();
            const value = match[2].trim();
            currentRecord[key] = value;
        } else {
            if (currentRecord.name) {
                records.push(currentRecord);
            }
            currentRecord = createNewRecord();
            currentRecord.name = line;
        }
    });

    readInterface.on('close', async function () {
        if (currentRecord.name) {
            records.push(currentRecord);
        }
        console.log(records.length);
        console.log('Finished reading the file.');
        for (let i = 0; i < records.length; i++) {
            records[i] = await fillRecordWithGeoLocation(records[i]);
            console.log(records[i]);
        }
        writeToFile('./result.txt', records);
    });
}

function writeToFile(fileName, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(fileName, jsonData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data written to file successfully.');
        }
    });
}

readFile('./source.txt');
