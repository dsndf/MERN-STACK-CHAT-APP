import multer from "multer";
const upload =  multer({
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

export const singleAvatar = upload.single('avatar');
export const multipleFiles = upload.array("files",5);
