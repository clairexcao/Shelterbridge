import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, ScanCommand, UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 } from 'uuid';
import axios from 'axios';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const resourceTableName = 'shelter-bridge-db';

async function createResource(event) {
    const body = JSON.parse(event.body);
    console.log(body);
    body.id = v4();
    const command = new PutCommand({
        TableName: resourceTableName,
        Item: body
    });

    const response = await docClient.send(command);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
}

async function getResource(event) {
    const command = new GetCommand({
        TableName: resourceTableName,
        Key: {
            id: event.pathParameters.id,
        },
    });

    const response = await docClient.send(command);
    console.log(response);
    const item = response.Item;
    if (item.reviews) {
        item.reviews = JSON.parse(item.reviews);
    } else {
        item.reviews = [];
    }
    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
}

async function getCategory(event) {

    const command = new ScanCommand({
        TableName: resourceTableName,
    });

    const response = await docClient.send(command);
    let result = [];
    for (const item of response.Items) {
        console.log(JSON.stringify(item));
        if (item.category == event.pathParameters.category) {
            if (item.reviews) {
                item.reviews = JSON.parse(item.reviews);
            } else {
                item.reviews = [];
            }
            result.push(item);
        }
    }
    console.log(JSON.stringify(result));
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

async function getCategoryInCity(event) {

    const command = new ScanCommand({
        TableName: resourceTableName,
    });


    const response = await docClient.send(command);
    let result = [];
    for (const item of response.Items) {
        console.log(JSON.stringify(item));
        if ((item.category == event.pathParameters.category) && (item.city == event.queryStringParameters.cityname)) {
            if (item.reviews) {
                item.reviews = JSON.parse(item.reviews);
            } else {
                item.reviews = [];
            }
            result.push(item);
        }
    }
    console.log(JSON.stringify(result));
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

async function getReview(event) {

    const command = new GetCommand({
        TableName: resourceTableName,
        Key: {
            id: event.pathParameters.id,
        },
    });

    const response = await docClient.send(command);
    console.log(response);
    const item = response.Item;
    let reviews = [];
    if (item.reviews) {
        reviews = JSON.parse(item.reviews);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(reviews),
    };
}

async function createReview(event) {

    let command = new GetCommand({
        TableName: resourceTableName,
        Key: {
            id: event.pathParameters.id,
        },
    });
    let response = await docClient.send(command);
    console.log(response);
    if (response.$metadata.httpStatusCode != 200) {
        return {
            statusCode: resource.$metadata.httpStatusCode,
            body: JSON.stringify({ "error": "Resource not found" }),
        };
    }
    let resource = response.Item;
    let reviews = resource.reviews ? JSON.parse(resource.reviews) : [];
    const newReview = JSON.parse(event.body);
    const date = new Date();
    newReview.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    console.log(newReview);
    reviews.push(newReview);
    resource.reviews = reviews;

    const udpateCommand = new UpdateCommand({
        TableName: resourceTableName,
        Key: {
            id: resource.id,
        },
        UpdateExpression: "set reviews = :reviews",
        ExpressionAttributeValues: {
            ":reviews": JSON.stringify(reviews),
        },
        ReturnValues: "ALL_NEW",
    });

    response = await docClient.send(udpateCommand);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify(resource),
    };
}

async function createChat(event) {
    try {
        const request = JSON.parse(event.body);
        console.log(request)
        const res = await axios.post('https://api.openai.com/v1/chat/completions',
            {
                messages: [{
                    'role': 'user',
                    'content': request.input
                }
                ],
                max_tokens: 150,
                model: 'gpt-3.5-turbo',
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log(res.data.choices[0].message.content);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: res.data.choices[0].message.content
            }),
        };
    } catch (error) {
        console.error(error);
        console.log('Error: Unable to fetch response');
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Error: Unable to fetch response'
        }),
    };

}

async function getAvailableBeds(event) {

    const command = new GetCommand({
        TableName: resourceTableName,
        Key: {
            id: event.pathParameters.id,
        },
    });

    const response = await docClient.send(command);
    console.log(response);
    const item = response.Item;
    const beds = item.available ? item.available : 0;
    return {
        statusCode: 200,
        body: JSON.stringify({ id: item.id, available: beds })
    };
}

async function setAvailableBeds(event) {

    let command = new GetCommand({
        TableName: resourceTableName,
        Key: {
            id: event.pathParameters.id,
        },
    });
    let response = await docClient.send(command);
    console.log(response);
    if (response.$metadata.httpStatusCode != 200) {
        return {
            statusCode: resource.$metadata.httpStatusCode,
            body: JSON.stringify({ "error": "Resource not found" }),
        };
    }
    let resource = response.Item;
    const available = JSON.parse(event.body).available;

    const udpateCommand = new UpdateCommand({
        TableName: resourceTableName,
        Key: {
            id: resource.id,
        },
        UpdateExpression: "set available = :available",
        ExpressionAttributeValues: {
            ":available": available,
        },
        ReturnValues: "ALL_NEW",
    });

    response = await docClient.send(udpateCommand);
    console.log(response);
    return {
        statusCode: 200,
        body: JSON.stringify({ available: available }),
    };
}

export const handler = async (event) => {
    let response;
    console.log(event)
    if (event.resource == '/categories/v1/{category}' && event.httpMethod == 'GET') {
        return getCategory(event);
    } else if (event.resource == '/resources/v1' && event.httpMethod == 'POST') {
        return createResource(event);
    } else if (event.resource == '/resources/v1/{id}' && event.httpMethod == 'GET') {
        return getResource(event);
    } else if (event.resource == '/reviews/v1/{id}' && event.httpMethod == 'GET') {
        return getReview(event);
    } else if (event.resource == '/reviews/v1/{id}' && event.httpMethod == 'POST') {
        return createReview(event);
    } else if (event.resource == '/chat/v1' && event.httpMethod == 'POST') {
        return createChat(event);
    } else if (event.resource == '/categories/v2/{category}' && event.httpMethod == 'GET') {
        return getCategoryInCity(event);
    } else if (event.resource == '/shelter/available/v1/{id}' && event.httpMethod == 'GET') {
        return getAvailableBeds(event);
    } else if (event.resource == '/shelter/available/v1/{id}' && event.httpMethod == 'POST') {
        return setAvailableBeds(event);
    }
    else {
        response = {
            statusCode: 404,
            body: 'Not Found',
        };
    }
    return response;
};
