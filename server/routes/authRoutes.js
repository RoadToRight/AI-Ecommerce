import express from 'express';
import { forgotPassword, getUser, login, logout, register } from '../controllers/authController.js';
import { authorizedRoles, isAuthenticated } from '../middlewares/auth.js';

const app = express.Router();

app.post("/register", register);
app.post("/login", login);
app.get("/me", isAuthenticated, getUser);
app.get("/logout", isAuthenticated, authorizedRoles , logout);
app.post("/password/reset/:resetToken", forgotPassword);

export default app;