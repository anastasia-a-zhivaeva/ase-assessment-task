import { FastifyInstance } from "fastify";

import { getRecommendations } from "./controller";
import { RecommendationRequest } from "./models";

export async function routes(fastify: FastifyInstance, options) {
    fastify.post<{ Body: RecommendationRequest }>("/recommendation", async (request, reply) => 
       getRecommendations(request.body)
    );
}
