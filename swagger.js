const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Paperless-AI API Documentation',
    version: '1.0.0',
    description: 'API documentation for the Paperless-AI application',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'Clusterzx',
      url: 'https://github.com/Clusterzx',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    // Add production server details if applicable
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT authentication token obtained from the /login endpoint. The token should be included in the Authorization header as "Bearer {token}".'
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'API key for programmatic access. This key can be generated or regenerated using the /api/key-regenerate endpoint. Include the key in the x-api-key header for authentication.'
      },
    },
  },
  security: [
    { BearerAuth: [] },
    { ApiKeyAuth: [] }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./server.js', './routes/*.js', './schemas.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;