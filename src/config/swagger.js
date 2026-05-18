const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ResolveAI API",
      version: "1.0.0",
      description: "AI-powered support ticket system API"
    },

    servers: [
  {
    url: "http://localhost:5000",
    description: "Local server"
  },
  {
    url: "https://resolve-ai-backend.onrender.com",
    description: "Production server"
  }
],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;