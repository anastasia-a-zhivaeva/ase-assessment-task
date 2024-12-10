import cors from "@fastify/cors";
import Fastify from "fastify";

import { routes } from "./modules/recommendation/routes";

const server = Fastify();
server.register(routes);
server.register(cors)

if (require.main === module) {
  // called directly i.e. "node server"
  server.listen({ port: 3000 }, (err) => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
}

export { server };
