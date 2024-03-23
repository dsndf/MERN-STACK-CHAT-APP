import { catchAsyncError } from "../utils/catchAsyncError";

export const signupUser = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;
    res.json({ success: true, file: req.file })
})