import express from "express"
import { createCollection, getAllCollections } from "../controllers/collectionController.js";

const app = express.Router();

app.post("/create",createCollection)
app.get("/all",getAllCollections)
export default app;