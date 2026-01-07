import database from "../database/db.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from 'cloudinary';
import ErrorHandler from "../middlewares/error.js";
import { createProductWithCollections } from "../services/product.service.js";


export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {
  const { collection } = req.params;
  const { category } = req.body;
  const { price, availability = "in-stock", ratings, search, page = 1, limit = 20 } = req.query;
  const conditions = [];
  let index = 1;
  let values = [];

  const pageNumber = Number(page);
  const pageLimit = Number(limit)
  const offset = (pageNumber - 1) * pageLimit;

  /* =====================
     Availability
  ====================== */

  if (availability === 'in-stock') {
    conditions.push(`p.stock > 0`)
  } else if (availability === 'out-of-stock') {
    conditions.push(`p.stock = 0`)
  }

  /* =====================
   Price
====================== */
  if (price) {
    const [minPrice, maxPrice] = price.split("-")
    conditions.push(`p.price BETWEEN $${index} AND $${index + 1}`)
    values.push(minPrice, maxPrice);
    index += 2;
  }


  /* =====================
     Category
  ====================== */
  console.log(category);

  if (category) {
    console.log("ma agay category");

    conditions.push(`c.name ILIKE $${index}`);
    values.push(category);
    index++;
  }


  /* =====================
     Ratings
  ====================== */
  if (ratings) {
    conditions.push(`p.ratings >= $${index}`);
    values.push(ratings)
    index++;
  }

  /* =====================
   Search
====================== */
  if (search) {
    let query = `(p.name ILIKE $${index} OR p.description ILIKE $${index})`;
    conditions.push(query)
    values.push(`%${search}%`)
    index++;
  }


  let whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";
  whereClause += ` `


  // Get count of filtered products
  const productQuery = `SELECT p.* FROM products p JOIN product_collections as pc ON pc.product_id = p.id JOIN collections as c ON c.id = pc.collection_id ${whereClause} ORDER BY p.created_at LIMIT $${index} OFFSET $${index + 1}`

  values.push(pageLimit, offset)

  const countQuery = `SELECT COUNT(DISTINCT p.id) FROM products as p JOIN product_collections as pc ON pc.product_id = p.id JOIN collections as c ON c.id = pc.collection_id ${whereClause}`


  const Products = await database.query(productQuery, values)

  const countResult = await database.query(countQuery, values.slice(0, values.length - 2))

  res.status(200).json({
    success: true,
    Products: Products.rows,
    totalProducts: Number(countResult.rows[0].count),
    page: pageNumber,
    limit: pageLimit,
  })
})

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, stock = 0, collections = [] } = req.body;
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

export const SingleProductAPI = catchAsyncErrors(async (req, res, next) => {
  const { name, collection } = req.params;

  if (!name) {
    return next(new ErrorHandler("Product name not provided", 400));
  }

  let query;
  let values;

  if (collection) {
    query = `SELECT p.* FROM products as p JOIN product_collections as pc ON p.id = pc.produtc_id JOIN collections as c ON c.id = pc.collection_id WHERE p.name = $1 AND c.name = $2 LIMIT 1;`;
    values = [name, collection];

  } else {
    query = `SELECT * FROM products WHERE name = $1 LIMIT 1;`
    values = [name];
  }

  const product = await database.query(query, values);
  if (product.rows.length === 0) {
    return next(new ErrorHandler("Product not found in the specified collection", 404));
  }
  res.status(200).json({
    success: true,
    product: product.rows[0],
  })

})





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
