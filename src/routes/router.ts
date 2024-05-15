import express from "express";
import PingController from "../controllers/ping";
import books from "../../json/books.json";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/", (_, res) => {
  res.status(200).send("Hello World");
});

router.get("/v1/books", (_, res) => {
  res.status(200).json(books);
});

export default router;
