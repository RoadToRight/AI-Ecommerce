import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import collectionRoutes from "./routes/collectionRoutes.js";
config({ path: "./config/.env" });

import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { createTables } from './utils/createTables.js';
import authRoutes from './routes/authRoutes.js';
import { errorMiddleware } from './middlewares/error.js';
import productRoutes from "./routes/productsRoutes.js";
const app = express();



app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads"
}))
createTables();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/collections", collectionRoutes)
app.use(errorMiddleware)

export default app;
// 5433j