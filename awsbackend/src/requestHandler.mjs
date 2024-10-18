import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, PutCommand, ScanCommand, UpdateCommand, QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { v4 } from 'uuid';
import axios from 'axios';

export default class RequestHandler {

    constructor() {
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client);
        this.resourceTableName = (process.env.environment == 'prod') ? 'shelter-bridge-db' : 'shelter-bridge-db-dev';
    }

    async createResource(event) {
        const body = JSON.parse(event.body);
        console.log(body);
        body.id = v4();
        const command = new PutCommand({
            TableName: this.resourceTableName,
            Item: body
        });

        const response = await this.docClient.send(command);
        console.log(response);
        return {
            statusCode: 200,
            body: JSON.stringify({}),
        };
    }


    async getResource(event) {
        const command = new GetCommand({
            TableName: this.resourceTableName,
            Key: {
                id: event.pathParameters.id,
            },
        });

        const response = await this.docClient.send(command);
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

    async getCategory(event) {

        const command = new ScanCommand({
            TableName: this.resourceTableName,
        });

        const response = await this.docClient.send(command);
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

    async getCategoryInCity(event) {

        const category = event.pathParameters.category;
        const cityname = event.queryStringParameters.cityname;

        const command = new QueryCommand({
            TableName: this.resourceTableName,
            IndexName: 'city-category-index',
            KeyConditionExpression: "category = :category and city = :city",
            ExpressionAttributeValues: {
                ":category": category,
                ":city": cityname
            },
        });

        const response = await this.docClient.send(command);
        console.log(response.Items);
        let result = response.Items;
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(result),
        };
    }

    async getReview(event) {

        const command = new GetCommand({
            TableName: this.resourceTableName,
            Key: {
                id: event.pathParameters.id,
            },
        });

        const response = await this.docClient.send(command);
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

    async createReview(event) {

        let command = new GetCommand({
            TableName: this.resourceTableName,
            Key: {
                id: event.pathParameters.id,
            },
        });
        let response = await this.docClient.send(command);
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
            TableName: this.resourceTableName,
            Key: {
                id: resource.id,
            },
            UpdateExpression: "set reviews = :reviews",
            ExpressionAttributeValues: {
                ":reviews": JSON.stringify(reviews),
            },
            ReturnValues: "ALL_NEW",
        });

        response = await this.docClient.send(udpateCommand);
        console.log(response);
        return {
            statusCode: 200,
            body: JSON.stringify(resource),
        };
    }

    async createChat(event) {
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
                    model: 'gpt-4o-mini',
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

    async getAvailableBeds(event) {

        const command = new GetCommand({
            TableName: this.resourceTableName,
            Key: {
                id: event.pathParameters.id,
            },
        });

        const response = await this.docClient.send(command);
        console.log(response);
        const item = response.Item;
        const beds = item.available ? item.available : 0;
        const waiting = item.waiting ? item.waiting : 0;
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ id: item.id, capacity: item.capacity, available: beds, updateTime: item.updateTime, waiting: waiting }),
        };
    }

    async setAvailableBeds(event) {

        const authorization = event.headers.Authorization;
        const adminSecrets = process.env.secrets.split(',');

        let command = new GetCommand({
            TableName: this.resourceTableName,
            Key: {
                id: event.pathParameters.id,
            },
        });
        let response = await this.docClient.send(command);
        console.log(response);
        if (response.$metadata.httpStatusCode != 200) {
            return {
                statusCode: resource.$metadata.httpStatusCode,
                body: JSON.stringify({ "error": "Resource not found" }),
            };
        }
        // check secret
        let resource = response.Item;
        if (!adminSecrets.includes(authorization)) {
            if (!resource.secret || resource.secret != authorization) {
                console.log(`Error: Incorrect secret ${authorization} does not match ${resource.secret}`);
                return {
                    statusCode: 401,
                    body: JSON.stringify({
                        message: 'Error: Incorrect secret'
                    })
                };
            }
        }
        const request = JSON.parse(event.body);
        const udpateCommand = new UpdateCommand({
            TableName: this.resourceTableName,
            Key: {
                id: resource.id,
            },
            UpdateExpression: "set available = :available, waiting = :waiting, updateTime = :updateTime",
            ExpressionAttributeValues: {
                ":available": request.available,
                ":waiting": request.waiting,
                ":updateTime": new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        });

        response = await this.docClient.send(udpateCommand);
        console.log(response);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ available: request.available, waiting: request.waiting }),
        };
    }

    handler(event) {
        let response;
        console.log(event)
        if (event.resource == '/categories/v1/{category}' && event.httpMethod == 'GET') {
            return this.getCategory(event);
        } else if (event.resource == '/resources/v1' && event.httpMethod == 'POST') {
            return this.createResource(event);
        } else if (event.resource == '/resources/v1/{id}' && event.httpMethod == 'GET') {
            return this.getResource(event);
        } else if (event.resource == '/reviews/v1/{id}' && event.httpMethod == 'GET') {
            return this.getReview(event);
        } else if (event.resource == '/reviews/v1/{id}' && event.httpMethod == 'POST') {
            return this.createReview(event);
        } else if (event.resource == '/chat/v1' && event.httpMethod == 'POST') {
            return this.createChat(event);
        } else if (event.resource == '/categories/v2/{category}' && event.httpMethod == 'GET') {
            return this.getCategoryInCity(event);
        } else if (event.resource == '/shelter/available/v1/{id}' && event.httpMethod == 'GET') {
            return this.getAvailableBeds(event);
        } else if (event.resource == '/shelter/available/v1/{id}' && event.httpMethod == 'POST') {
            return this.setAvailableBeds(event);
        }
        else {
            response = {
                statusCode: 404,
                body: 'Not Found',
            };
        }
        return response;
    }

}
