import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { AdResolver } from "./resolvers/ad.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";

const port: number = 5000;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer({ schema });

  try {
    const { url } = await server.listen({ port });
    console.log(`Server running at ${url}`);
  } catch (err) {
    console.error("Error starting the server");
  }
};

void start();
