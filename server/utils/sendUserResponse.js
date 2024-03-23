export const sendUserResponse = async (user, req, res, message) => {
    const chatIoToken = await user.generateAuthToken();
    res.cookie("chatIoToken", chatIoToken).json({
        success: true,
        message
    })
}