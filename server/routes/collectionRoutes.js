import express from "express"
import { createCollection, getAllCollections } from "../controllers/collectionController.js";

const app = express.Router();

app.post("/collections/create", createCollection);
app.get("/products/collections/:collection", getAllCollections);
app.get("/collections/:params", getAllCollections)
export default app;