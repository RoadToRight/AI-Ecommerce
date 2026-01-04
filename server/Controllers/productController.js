import database from "../database/db.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from 'cloudinary';
import ErrorHandler from "../middlewares/error.js";
import { createProductWithCollections } from "../services/product.service.js";


export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {

  const { price, availability = "in-stock", ratings, category, search, skip = 0, limit = 20 } = req.query;
  const conditions = [];
  let index = 1;
  let values = [];


  if (availability === 'in-stock') {
    conditions.push(`stock > 0`)
  } else if (availability === 'out-of-stock') {
    conditions.push(`stock = 0`)
  }

  if (price) {
    const [minPrice, maxPrice] = price.split("-")
    conditions.push(`price BETWEEN $${index} AND $${index + 1}`)
    values.push(minPrice, maxPrice)
  }

  if (category) {
    conditions.push(`category ILIKE ${index + 1}`);
    values.push(`%${category}%`)
  }

  if (ratings) {

    conditions.push(`ratings >= ${index + 1}`);
    values.push(ratings)
  }
  if (search) {
    let query = `SELECT * FROM products WHERE name ILIKE ${index + 1} OR description ILIKE ${index + 1}`;
    // conditions.push(`name ILIKE ${index + 1} OR description ILIKE ${index + 1}`)
    conditions.push(query)
    values.push(`%${search}%`, `%${search}%`)
  }
  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";



  // Get count of filtered products
  const productQuery = `SELECT * FROM products ${whereClause}`
  const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`
  const Products = await database.query(productQuery, values)
  const totalProductsResult = await database.query(countQuery, values)
  const totalProducts = parseInt(totalProductsResult.rows[0].count);

  res.status(200).json({
    success: true,
    Products: Products.rows,
    totalProducts,
  })
})
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, stock = 0, collections = [] } = req.body;
  // console.log(req.body);

  const collectionsnew = JSON.parse(req.body.collections) || [];

  // 1️⃣ Validate required fields
  if (!name || !description || !price) {
    return res.status(400).json({
      success: false,
      message: "Please fill required fields"
    });
  }

  // 2️⃣ Validate images
  if (!req.files || !req.files.images || req.files.images.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one image is required"
    });
  }

  const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

  // 3️⃣ Upload images to Cloudinary
  const uploadedImages = await Promise.all(
    images.map(async (img) => {
      const uploaded = await cloudinary.uploader.upload(img.tempFilePath, {
        folder: "AI Ecommerce/products"
      });
      return { url: uploaded.secure_url, public_id: uploaded.public_id };
    })
  );

  // 4️⃣ Create product + assign collections
  try {
    const productId = await createProductWithCollections({
      name,
      description,
      price,
      stock,
      images: JSON.stringify(uploadedImages),
      created_by: req.user.id,
      collections: collectionsnew
    });

    res.status(201).json({
      success: true,
      productId,
      message: "Product created successfully"
    });
  } catch (error) {
    console.error("Failed to create product:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
});

export const updateProducts = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, collections = [] } = req.body;

  await database.query(
    `UPDATE products
     SET name=$1, description=$2, price=$3, stock=$4
     WHERE id=$5`,
    [name, description, price, stock, id]
  );

  await updateProductCollections(id, collections);

  res.status(200).json({
    success: true,
    message: "Product updated successfully"
  });
});

export const deleteProducts = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Product Id is not Present", 400))
  }

  const findQuery = `SELECT * FROM products WHERE id = $1`;
  const findProduct = await database.query(findQuery, [id])


  if (!findProduct.rows.length > 0) {
    return next(new ErrorHandler("Product Not Found", 400))
  }

  const deleteQuery = `DELETE FROM products WHERE id = $1`
  await database.query(deleteQuery, [id])

  res.status(200).json({
    success: true,
    message: `Product Deleted Successfully`
  })
})

export const SingleProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, collection } = req.params;

  if (!name) {
    return next(new ErrorHandler("Product name not provided", 400));
  }

  let query;
  let values;

  if (collection) {
    // Product must belong to the given collection
    query = `
      SELECT p.*
      FROM products p
      JOIN product_collections pc ON pc.product_id = p.id
      JOIN collections c ON c.id = pc.collection_id
      WHERE p.name = $1 AND c.name = $2
      LIMIT 1;
    `;
    values = [name, collection];
  } else {
    // Fetch product by name only
    query = `
      SELECT *
      FROM products
      WHERE name = $1
      LIMIT 1;
    `;
    values = [name];
  }

  const { rows } = await database.query(query, values);

  if (rows.length === 0) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product: rows[0],
  });
});



export const SingleProductAPI = () => {
  const { name, collection } = req.params;

  if (!name) {
    return next(new ErrorHandler("Product name not provided", 400))
  }

  if (collection) {
    const query = `SELECT p.* FROM products as p JOIN product_collections as pc ON p.id = pc.product_id JOIN collection as c ON c.id = pc.product_id WHERE p.name $1 AND c.name = $2 LIMIT 1`

    database
  }


}









export const MongoFetchAllProducts = catchAsyncErrors(async (req, res, next) => {

  const { price, availablity, category, search } = req.body;
  let conditions = {};

  if (availablity === "in-stock") {
    conditions.availability = "in-stock"
  } else if (availablity === "out-of-stock") {
    conditions.availability = "out-of-stock"
  }
  if (price) {
    const [minPrice, maxPrice] = split(price, "-");
    conditions.price = { $gt: Number(minPrice), $lte: Number(maxPrice) }
  }
  if (category) {
    conditions.category = { $in: category }
  }
  if (search) {
    conditions.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ]
  }


  await ProductModel.find(conditions)
  res.status(200).json({
    success: true,
    products
  });
})
