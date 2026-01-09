import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

export const SingleProductAPI = catchAsyncErrors(async (req, res, next) => {

    const { name, collection } = req.params;
    if (!name) {
        return next(new ErrorHandler("Product name not provided", 400));
    }

    if (collection) {
        await ProductModel.aggregate([

        ])
    }

})






const productName = nameParam;
const collectionName = collectionParam;

const result = await ProductModel.aggregate([
  // match product name first (efficient)
  {
    $match: { name: productName }
  },

  // join product_collections
  {
    $lookup: {
      from: "product_collections",
      localField: "_id",
      foreignField: "product_id",
      as: "productCollections"
    }
  },
  { $unwind: "$productCollections" },

  // join collections
  {
    $lookup: {
      from: "collections",
      localField: "productCollections.collection_id",
      foreignField: "_id",
      as: "collection"
    }
  },
  { $unwind: "$collection" },

  // match collection name
  {
    $match: {
      "collection.name": collectionName
    }
  },

  // limit 1
  { $limit: 1 },

  // optional: return only product fields
  {
    $project: {
      productCollections: 0,
      collection: 0
    }
  }
]);
