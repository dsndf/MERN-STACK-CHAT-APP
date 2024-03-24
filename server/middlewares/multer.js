import multer from "multer";
const upload =  multer({
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});
export const singleAvatar = upload.single('avatar');
export const multiAvatar = upload.array("avatar",3);
// export const fields  = upload.fields([{name:"avatar",maxCount:1},{name:"product",maxCount:2}])
