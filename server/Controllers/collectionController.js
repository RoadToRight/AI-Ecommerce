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

export const getAllCollections = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.params;
  const { skip = 0, limit = 5 } = req.query;
  if (name) {
    const query = `SELECT p.* FROM products as p JOIN product_collections as pc ON pc.product_id = p.id JOIN collections as c ON c.id = pc.collection_id WHERE c.name ILIKE $1 LIMIT $2 OFFSET $3`;

    const CountQuery = `SELECT COUNT(DISTINCT p.id) as Total FROM products as p JOIN product_collections as pc ON pc.product_id = p.id JOIN collections as c ON c.id = pc.collection_id WHERE c.name ILIKE $1`

    let Collections = await database.query(query, [name, limit, skip]);
    let CollectionsCount = await database.query(CountQuery, [name]);
    // console.log(Collections.rows);

    res.status(200).json({
      success: true,
      Collections: Collections.rows,
      CollectionsCount:CollectionsCount.rows[0],
      limit
    })
  }



})   