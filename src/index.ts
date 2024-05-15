import * as dotenv from "dotenv";
import express from "express";
import books from '../json/books.json';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.status(200).send("Hello World");
});

app.get("/v1/books", (_, res) => {
  res.status(200).json(books);
});
