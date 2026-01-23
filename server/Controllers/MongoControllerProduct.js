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






