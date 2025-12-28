import database from "../database/db.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"
import bcrypt from "bcrypt";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import { generateResetPasswordToken } from "../utils/generateResetPasswordToken.js";
import { generateEmailTemplate } from "../utils/generateForgetPasswordEmailTemplate.js";
import crypto from "crypto"

export const register = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {

        return next(new ErrorHandler("Please Provide All Required Fields", 400))
    }

    const isAlreadyRegistered = await database.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (isAlreadyRegistered.rows.length > 0) {
        return next(new ErrorHandler("User Already Exist", 400))
    }

    if (password.length < 6 || password.length > 16) {
        return next(new ErrorHandler("Password must be between 6 and 16 characters", 400))
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await database.query(`INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *`, [name, email, hashedPassword, role]);

    // SQL INJECTION

    generateJwtToken(user.rows[0], res, "Registered Successfully", 201);

})  
export const login = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Provide All Required Fields", 400));
    }

    const user = await database.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]);
    if (!user.rows.length === 0) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    generateJwtToken(user.rows[0], res, "Logged In Successfully", 200);

})
export const getUser = (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
}
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged Out Successfully"
    })
})
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    const isUser = await database.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]);

    if (isUser.rows.length === 0) {
        return next(new ErrorHandler("User not found with this email", 404));
    }
    const user = user.rows[0];

    const { resetToken, hashedToken, resetPasswordExpireTime } = generateResetPasswordToken();

    await database.query(`UPDATE users SET reset_password_token = $1 , reset_password_expire = to_timestamp($2) WHERE email = $3`, [hashedToken, resetPasswordExpireTime / 1000, email]);

    // postgres support seconds not milliseconds for to_timestamp function

    const resetPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = generateEmailTemplate(resetPasswordURL);

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message
        })
    } catch (error) {
        await database.query("UPDATE users SET reset_password_token = NULL , reset_password_expire = NULL WHERE email = $1", [email]);

        return next(new ErrorHandler("Error could not be sent.", 500))
    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await database.query("SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expire > NOW()", [resetPasswordToken]);

    if (user.rows.length === 0) {
        return next(new ErrorHandler("Invalid or Expired Password Reset Request", 400))
    }

    if (!password || !confirmPassword) {
        return next(new ErrorHandler("Please Provide All Required Fields", 400))
    }

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400))
    }
    if (password.length < 6 || password.length < 16 || confirmPassword.length < 6 || confirmPassword.length < 16) {
        return next(new ErrorHandler("Password must be between 6 and 16 characters", 400))
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await database.query("UPDATE users SET password = $1 , reset_password_token = NULL , reset_password_expire = NULL WHERE id = $2 RETURNING *", [hashedPassword, user.rows[0].id])

    generateJwtToken(updatedUser, res, "Password Reset Successfully", 200);

})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
        next(new ErrorHandler("Please Provide All Required Fields", 400))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm Password do not match", 400))
    }
    if (password.length < 6 || password.length < 16 || confirmPassword.length < 6 || confirmPassword.length < 16) {
        return next(new ErrorHandler("Password must be between 6 and 16 characters", 400))
    }



    const user = await database.query("UPDATE ")

})

export const updateProfile = catchAsyncErrors(async (req, res, next) => {

})

export const getUsers = catchAsyncErrors(async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2`
    const countQuery = `SELECT COUNT(*) AS total FROM users`

    const users = await database.query(query, [limit, offset]);
    const countResult = await database.query(countQuery);
    const total = Number(countResult.rows[0].total)

    res.status(200).json({
        success: true,
        data: users.rows,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    })
})