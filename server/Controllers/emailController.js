import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { sendEmail } from "../utils/sendEmail.js";

export const Subscribe_Mail = catchAsyncErrors(async (req, res, next) => {

    const { email } = req.body;

    sendEmail({ header: true, subject: "Subscription Email", message: "Subscribe to get new offers", email: email })

})