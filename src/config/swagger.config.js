const swaggerOptions = {
  // failOnErrors: true,
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'API Specification for Url_Snipper',
      version: '1.1.0',
      description: "This is a simple API for a URL shortening service"
    },
    servers: [
      {
        url: "http://localhost:3334",
      },
    ],
  },
  apis: [], 

};

module.exports = swaggerOptions