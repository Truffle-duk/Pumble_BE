import SwaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        info: {
            title: 'Pumble API',
            version: '1.0.0',
            description: 'Pumble API with express, API 설명'
        },
        host: 'localhost:8080',
        basepath: '../'
    },
    apis: ['./src/routes/*.js', './swagger/*']
};

export const specs = SwaggerJsdoc(options);