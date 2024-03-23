import multer from "multer";

export const singleAvatar = multer({
    limits: {
        fieldSize: 5000000,
    }
}).single('avatar');
