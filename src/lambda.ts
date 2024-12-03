import { awsLambdaFastify } from "@fastify/aws-lambda";

import { server } from "./server";

export const handler = awsLambdaFastify(server);
