import swaggerAutogen from 'swagger-autogen';


const doc = {
    info: {
        title: 'Library Management System',
        description: 'lorem ipsum'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/author.routes.js', './routes/book.routes.js', './routes/review.routes.js', './routes/reader.routes.js'];


swaggerAutogen(outputFile, routes, doc);

