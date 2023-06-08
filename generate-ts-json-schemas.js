import glob from "tiny-glob";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import fs from "fs/promises";
import path from "path";
import prettier from "prettier";

// Generate schemas with openapi-transformer-toolkit oas2json
const dereferencedSchemasDirectory = path.resolve("schemas");

const tsSchemasDirectory = path.resolve("ts-schemas");

// Get all absolute paths just created JSON schemas
const schemas = await glob(`${dereferencedSchemasDirectory}/*.json`, {
  absolute: true,
});

for (const schemaPath of schemas) {
  // Dereference schemas (at least local ones)
  const schema = await $RefParser.dereference(schemaPath);
  const modelName = path.parse(schemaPath).name;

  // Append necessary TS declarations
  // @NOTE Default or named export?
  const tsSchema =
    `export const ${modelName} = ` + JSON.stringify(schema) + "as const";

  // Might be necessary to do a format round since @apidevtools/json-schema-ref-parser seems to minify its output
  const formattedSchema = prettier.format(tsSchema, {
    parser: "typescript",
  });

  await fs.writeFile(
    path.resolve(tsSchemasDirectory, `${modelName}.ts`),
    formattedSchema
  );
}
