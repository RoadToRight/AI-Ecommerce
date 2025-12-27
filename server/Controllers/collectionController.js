import database from "../database/db.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const createCollection = catchAsyncErrors(async (req, res, next) => {

  const { name } = req.body;
  const query = `INSERT INTO collections (name) VALUES ($1) RETURNING *`
  await database.query(query, [name]);

  res.status(201).json({
    success: true,
    message: "Collection created successfully"
  })
})

export const getAllCollections = catchAsyncErrors(async(req,res,next) => {
    const query = `SELECT * FROM collections`
    let Collections = await database.query(query);

    res.status(200).json({
        success:true,
        Collections:Collections.rows
    })
})