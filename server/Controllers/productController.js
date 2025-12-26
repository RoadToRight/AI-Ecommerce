




// export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {
//   const { availability, price, category, ratings, search } = req.query;
//   const page = parseInt(req.query.page) || 1;
//   const limit = 10;
//   const offset = (page - 1) * limit;

import database from "../database/db.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { v2 as cloudinary } from 'cloudinary';

//   const conditions = [];
//   let values = [];
//   let index = 1;

//   let paginationPlaceholders = {};

//   // Filter products by availability
//   if (availability === "in-stock") {
//     conditions.push(`stock > 5`);
//   } else if (availability === "limited") {
//     conditions.push(`stock > 0 AND stock <= 5`);
//   } else if (availability === "out-of-stock") {
//     conditions.push(`stock = 0`);
//   }

//   // Filter products by price
//   if (price) {
//     const [minPrice, maxPrice] = price.split("-");
//     if (minPrice && maxPrice) {
//       conditions.push(`price BETWEEN $${index} AND $${index + 1}`);
//       values.push(minPrice, maxPrice);
//       index += 2;
//     }
//   }

//   // Filter products by category
//   if (category) {
//     conditions.push(`category ILIKE $${index}`);
//     values.push(`%${category}%`);
//     index++;
//   }

//   // Filter products by rating
//   if (ratings) {
//     conditions.push(`ratings >= $${index}`);
//     values.push(ratings);
//     index++;
//   }

//   // Add search query
//   if (search) {
//     conditions.push(
//       `(p.name ILIKE $${index} OR p.description ILIKE $${index})`
//     );
//     values.push(`%${search}%`);
//     index++;
//   }

//   const whereClause = conditions.length
//     ? `WHERE ${conditions.join(" AND ")}`
//     : "";

//   // Get count of filtered products
//   const totalProductsResult = await database.query(
//     `SELECT COUNT(*) FROM products p ${whereClause}`,
//     values
//   );

//   const totalProducts = parseInt(totalProductsResult.rows[0].count);

//   paginationPlaceholders.limit = `$${index}`;
//   values.push(limit);
//   index++;

//   paginationPlaceholders.offset = `$${index}`;
//   values.push(offset);
//   index++;

//   // FETCH WITH REVIEWS
//   const query = `
//     SELECT p.*, 
//     COUNT(r.id) AS review_count 
//     FROM products p 
//     LEFT JOIN reviews r ON p.id = r.product_id
//     ${whereClause}
//     GROUP BY p.id
//     ORDER BY p.created_at DESC
//     LIMIT ${paginationPlaceholders.limit}
//     OFFSET ${paginationPlaceholders.offset}
//     `;

//   const result = await database.query(query, values);

//   // QUERY FOR FETCHING NEW PRODUCTS
//   const newProductsQuery = `
//     SELECT p.*,
//     COUNT(r.id) AS review_count
//     FROM products p
//     LEFT JOIN reviews r ON p.id = r.product_id
//     WHERE p.created_at >= NOW() - INTERVAL '30 days'
//     GROUP BY p.id 
//     ORDER BY p.created_at DESC
//     LIMIT 8
//   `;
//   const newProductsResult = await database.query(newProductsQuery);

//   // QUERY FOR FETCHING TOP RATING PRODUCTS (rating >= 4.5)
//   const topRatedQuery = `
//     SELECT p.*,
//     COUNT(r.id) AS review_count
//     FROM products p
//     LEFT JOIN reviews r ON p.id = r.product_id
//     WHERE p.ratings >= 4.5
//     GROUP BY p.id
//     ORDER BY p.ratings DESC, p.created_at DESC
//     LIMIT 8
//   `;
//   const topRatedResult = await database.query(topRatedQuery);

//   res.status(200).json({
//     success: true,
//     products: result.rows,
//     totalProducts,
//     newProducts: newProductsResult.rows,
//     topRatedProducts: topRatedResult.rows,
//   });
// });


export const fetchAllProducts = catchAsyncErrors(async (req, res, next) => {

  const { price, availability, ratings, category, search } = req.query;
  const conditions = [];
  let index = 1;
  let values = []

  if (availability === 'in-stock') {
    conditions.push(stock > 0)
  } else if (availability === 'out-of-stock') {
    conditions.push(stock = 0)
  }

  if (price) {
    const [minPrice, maxPrice] = split(price, "-");
    conditions.push(`price BETWEEN ${index} AND ${index + 1}`)
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
    conditions.push(`name ILIKE ${index + 1} OR description ILIKE ${index + 1}`)
    values.push(`%${search}%`, `%${search}%`)
  }
  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Get count of filtered products

  const totalProductsResult = await database.query(`SELECT COUNT(*) FROM products ${whereClause}`, values)
  const totalProducts = parseInt(totalProductsResult.rows[0].count);

  res.status(200).json({
    success: true,
    totalProducts
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

export const createProduct = catchAsyncErrors(async (req, res, next) => {

  const { name, description, price, category = "All", stock = 0 } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({
      success: false,
      message: "Please Fill Required Fields"
    })
  }

  if (!req.files && req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least One Image is required"
    })
  }
  const { images } = req.files;
  const result = await Promise.all(
    images.map(async (img) => {
      const imagesUplaod = await cloudinary.uploader.upload(img.tempFilePath, { folder: "AI Ecommerce/products" })
      return imagesUplaod;
    })
  )

  const Images = result.map((img, i) => {
    return (
      {
        url: img.secure_url,
        public_id: img.public_id
      }
    )
  })

  try {
    const Product = await database.query(`
      INSERT INTO products (name, description, price, category, stock, images,created_by) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
    `, [name, description, price, category, stock, JSON.stringify(Images), req.user.id])
    res.status(201).json({
      success: true,
      product: Product.rows[0],
      message: "Product Created Successfully"
    })
  } catch (error) {
    await Promise.all(
      images.map(async (img) => {
        const imagesUplaod = await cloudinary.uploader.upload(img.tempFilePath, { folder: "AI Ecommerce/products" })
        return imagesUplaod;
      })
    )
    res.status(400).json({
      success: true,
      message: "Failed to create Product"
    })
  }





})
