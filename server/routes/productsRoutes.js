import express from "express";
import { createProduct, deleteProducts, fetchAllProducts } from "../controllers/productController.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();

app.get("/all", fetchAllProducts)
app.post("/create", isAuthenticated, authorizedRoles("Admin"), createProduct)
app.delete("/delete/:id",deleteProducts)
export default app;