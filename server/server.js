import app from './app.js';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})