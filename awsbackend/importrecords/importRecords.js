const readline = require('readline');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let records = [];

let currentRecord = createNewRecord();

function createNewRecord() {
    const defaultRecord = {
        id: uuidv4(),
        category: 'Food',
        city: 'Coos Bay, OR'
    }
    return defaultRecord;
}

// Food
// Shelter
// MentalHealth
// LegalAssistance
// WomenAndChildren
// Hotline

function readFile(fileName) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        // output: process.stdout,
        console: false
    });
    readInterface.on('line', function (line) {
        const match = line.match(/([^:]*):(.*)/);
        if (match) {
            const key = match[1].trim().toLowerCase();
            const value = match[2].trim();
            currentRecord[key] = value;
        } else {
            if (currentRecord.name) {
                records.push(currentRecord);
                console.log(currentRecord);
                currentRecord = {};
            }
            currentRecord = createNewRecord();
            currentRecord.name = line;
        }
    });

    readInterface.on('close', function () {
        records.push(currentRecord);
        console.log(currentRecord);
        console.log(records.length);
        console.log('Finished reading the file.');
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