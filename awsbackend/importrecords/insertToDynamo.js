import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" }); // Replace with your desired region

const items =

    [

    ]

async function importItems() {
    // Iterate over the array and execute PutItem command for each item
    const promises = Promise.all(items.map(item => {
        const params = {
            TableName: "shelter-bridge-db", // Replace with your DynamoDB table name
            Item: {
                id: { S: item.id },
                name: { S: item.name ? item.name : '' },
                category: { S: item.category },
                eligibility: { S: item.eligibility ? item.eligibility : '' },
                address: { S: item.address ? item.address : '' },
                phone: { S: item.phone ? item.phone : '' },
                website: { S: item.website ? item.website : '' },
                latitude: { N: item.latitude ? (item.latitude) : '0' },
                longitude: { N: item.longitude ? (item.longitude) : '0' },
                description: { S: item.description ? item.description : '' },
                city: { S: item.city ? item.city : '' },
            },
        };

        if (item.capacity) {
            params.Item.capacity = { N: item.capacity.toString() };
        }
        if (item.hours) {
            params.Item.hours = { S: item.hours };
        }
        if (item.beds) {
            params.Item.beds = { S: item.beds };
        }
        if (item.type) {
            params.Item.type = { S: item.type };
        }
        if (item.servicearea) {
            params.Item.servicearea = { S: item.servicearea };
        }

        console.log(params);
        const command = new PutItemCommand(params);
        return client.send(command);
    }))
        .then((responses) => {
            console.log(`${items.length} Items inserted successfully:`);
        })
        .catch((error) => {
            console.error("Error inserting items:", error);
        });
    return await promises;
}

export const handler = async (event) => {
    const result = await importItems();
    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};
