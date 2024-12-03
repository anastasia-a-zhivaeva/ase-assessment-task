import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { FastifyInstance } from "fastify";

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function routes(fastify: FastifyInstance, options) {
    fastify.get<{ Params: { userId: number } }>("/users/:userId", async (request, reply) => {
        const params = {
            TableName: USERS_TABLE,
            Key: {
            userId: request.params.userId,
            },
        };

        try {
            const command = new GetCommand(params);
            const { Item } = await docClient.send(command);
            if (Item) {
            const { userId, name } = Item;
            return { userId, name };
            } else {
            reply
                .status(404)
                .send({ error: "Could not find user with provided 'userId'" });
            }
        } catch (error) {
            console.log(error);
            reply.status(500).send({ error: "Could not retrieve user" });
        }
    });

    fastify.post<{ Body: { userId: string, name: string } }>("/users", async (request, reply) => {
        const { userId, name } = request.body;
        if (typeof userId !== "string") {
            reply.status(400).send({ error: "'userId' must be a string" });
        } else if (typeof name !== "string") {
            reply.status(400).send({ error: "'name' must be a string" });
        }

        const params = {
            TableName: USERS_TABLE,
            Item: { userId, name },
        };

        try {
            const command = new PutCommand(params);
            await docClient.send(command);
            return { userId, name };
        } catch (error) {
            console.error(error);
            reply.status(500).send({ error: "Could not create user" });
        }
    });
}
