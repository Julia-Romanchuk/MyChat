//@ts-ignore
import cloudinaryStorage from "multer-storage-cloudinary"
import cloudinary from 'cloudinary'
import multer from 'multer'

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const upload = multer({ storage: storage })

export default upload