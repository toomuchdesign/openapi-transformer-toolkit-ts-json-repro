export const Pet = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {
      type: "integer",
      format: "int64",
      minimum: -9223372036854776000,
      maximum: 9223372036854776000,
    },
    name: { type: "string" },
    owner: {
      type: "object",
      required: ["id", "name"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
          minimum: -9223372036854776000,
          maximum: 9223372036854776000,
        },
        name: { type: "string" },
      },
      title: "Owner",
      $id: "Owner.json",
    },
  },
  title: "Pet",
  $id: "Pet.json",
} as const;
