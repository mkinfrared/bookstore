import fs from "fs";
import { importSchema } from "graphql-import";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import path from "path";

export default () => {
  const folders = fs.readdirSync(path.join(__dirname, "../resolvers"));
  const schemas = folders.map(folder => {
    const typeDefs = importSchema(
      path.join(__dirname, `../resolvers/${folder}/schema.graphql`)
    );
    const resolver = require(`../resolvers/${folder}`);

    return makeExecutableSchema({ resolvers: resolver, typeDefs });
  });

  return mergeSchemas({ schemas });
};
