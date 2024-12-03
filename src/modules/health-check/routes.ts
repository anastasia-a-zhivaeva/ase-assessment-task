import { FastifyInstance } from "fastify";


export async function routes(fastify: FastifyInstance, options) {
    fastify.get("/health-check", async (request, reply) => {
        return { message: "Server is healthy" }
    });
}
