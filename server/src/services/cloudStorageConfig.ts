//@ts-ignore
import cloudinaryStorage from "multer-storage-cloudinary"
import cloudinary from 'cloudinary'
import multer from 'multer'

cloudinary.v2.config({
    cloud_name: 'jully',
    api_key: 819578326313225,
    api_secret: 'rTbhbDja86sr-f8Z1scDqbal-bw'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const upload = multer({ storage: storage })

export default upload