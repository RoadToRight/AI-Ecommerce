import express from "express"
import { Subscribe_Mail } from "../controllers/emailController.js";

const Router = express.Router();

Router.post("/subscribe",Subscribe_Mail)

export default Router;
