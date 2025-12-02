import database from "../database/db";

export const register = catchAsyncErrors(async(req,res,next) => {

    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("Please Provide All Required Fields",400))
    }

    const isAlreadyRegistered = await database.query(`SELECT * FROM users WHERE email = $1`,[email]);
    if(isAlreadyRegistered){
        return next(new ErrorHandler("User Already Exist",400))
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await database.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *`,[name,email,password]);

    // SQL INJECTION

})
export const login = catchAsyncErrors(async(req,res,next) => {
    
})
export const getUser = catchAsyncErrors(async(req,res,next) => {
    
})
export const logout = catchAsyncErrors(async(req,res,next) => {
    
})