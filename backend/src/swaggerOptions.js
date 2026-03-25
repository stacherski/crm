module.exports = {
  definition: {
    openapi: "3.0.0",
    info: { title: "CRM API Docs", version: "1.0.0" },
    security: [{ api_key: [] }],
    components: {
      securitySchemes: {
        api_key: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};
