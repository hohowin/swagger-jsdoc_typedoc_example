import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import * as books from "json/books.json";
import { setup, serve } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:7000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use('/api-docs', serve, setup(swaggerSpec));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.status(200).render("index");
});

/**
 * @swagger
 * /v1/books:
 *  get:
 *      description: Retrieve all the books
 *      responses:
 *          200:
 *              description: Returns all books
 *          404:
 *              description: No book found
 */
app.get("/v1/books", (_, res) => {
  res.status(200).json(books);
});
