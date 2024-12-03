import Fastify from "fastify";

import { routes as healthCheckRoutes } from "./modules/health-check/routes";
import { routes as userRoutes } from "./modules/user/routes";

const server = Fastify();
server.register(userRoutes);
server.register(healthCheckRoutes);

if (require.main === module) {
  // called directly i.e. "node app"
  server.listen({ port: 3000 }, (err) => {
    if (err) console.error(err)
    console.log('server listening on 3000')
  })
}

export { server };
