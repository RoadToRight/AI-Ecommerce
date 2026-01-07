import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const generateJwtToken = (user, res, message, statusCode) => {

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "strict",
        secure: true
    }).json({
        success: true,
        message: message,
        user,
        token,
    })
}

// | Option     | Meaning                        |
// | ---------- | ------------------------------ |
// | `httpOnly` | JS can’t steal it              |
// | `sameSite` | Other sites can’t use it       |
// | `secure`   | Network attackers can’t see it |
