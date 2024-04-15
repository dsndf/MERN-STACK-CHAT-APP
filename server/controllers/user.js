import { tokenCookieOptions } from "../constants/cookie.js";
import { emitEvent } from "../events/emitEvent.js";
import { ALERT, NOTIFICATION } from "../events/eventTypes.js";
import { getOtherMembers } from "../lib/helper.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { sendUserResponse } from "../utils/sendUserResponse.js";
import { validatePassword } from "../utils/validatePassword.js";

export const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, username, bio, password } = req.body;
  const file = req.file;
  if (!file) return next(new ErrorHandler("Avatar is required",400));
  console.log(Object.keys(file));

  const user = await User.create({ name, username, bio, password });
  res.statusCode = 201;

  sendUserResponse(user, res, "Signed up seccessfully");
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Username", 400));
  if (!(await validatePassword(user.password, password)))
    return next(new ErrorHandler("Invalid Password", 400));
  sendUserResponse(user, res, "Logged in successfully");
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const profile = req.user;
  res.json({ success: true, profile });
});

export const searchUsers = catchAsyncError(async (req, res, next) => {
  const { keyword } = req.query;

  const myFriends = req.user.friends;
  let users = await User.find({
    name: { $regex: keyword || "", $options: "i" },
    _id: { $nin: myFriends },
  }).select({ name: true, avatar: { url: true } });

  users = users.map((user) => {
    return { name: user.name, _id: user._id, avatar: user.avatar.url };
  });

  const message = users.length + " users found";
  res.json({ success: true, message, users });
});

export const sendFreindRequest = catchAsyncError(async (req, res, next) => {
  const { users } = req.body;
  const me = req.user._id;

  if (!users || !users.length)
    return next(
      new ErrorHandler("Required at least one user to send friend request", 400)
    );

  const promises = [];

  for (let id of users) {
    const user = await User.findById(id);
    if (!user) {
      return next(
        new ErrorHandler("User with userId " + id + " not found", 400)
      );
    }
    const request = await Request.findOne({
      $or: [
        { sender: me, reciever: id },
        { sender: id, reciever: me },
      ],
    });
    if (request) {
      return next(new ErrorHandler(`Request had already been sent.`, 409));
    }
    promises.push(Request.create({ sender: me, reciever: id }));
  }
  const requests = await Promise.all(promises);
  emitEvent(req, NOTIFICATION, { users }, "Notification recieved");
  res.status(201).json({ suucess: true, requests });
});

export const getMyNotifications = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;

  const notifications = await Request.find({
    $and: [
      { reciever: me },
      { $or: [{ status: "Pending" }, { status: "Accepted" }] },
    ],
  });
  const newNotifications = notifications.filter(
    (notification) => notification.status === "Pending"
  );
  const otherNotifications = notifications.filter(
    (notification) => notification.status !== "Pending"
  );
  const noOfNewNotifications = newNotifications.length;

  res.json({
    success: true,
    noOfNewNotifications,
    newNotifications,
    otherNotifications,
  });
});

export const replyfriendRequest = catchAsyncError(async (req, res, next) => {
  const { reply } = req.body;
  const { id } = req.params;
  const me = req.user._id;

  const request = await Request.findById(id);
  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }
  if (String(request.reciever) !== String(me)) {
    return next(new ErrorHandler("You are not allowed to reply.", 403));
  }
  if (request.status !== "Pending") {
    return next(new ErrorHandler("You already replied.", 409));
  }
  request.status = reply;
  if (reply === "Accepted") {
    req.user.friends.push(request.sender);
    const [sender] = await Promise.all([
      User.findById(request.sender),
      req.user.save(),
      Chat.create({
        name: `${request.sender}-${request.reciever}`,
        members: [request.sender, request.reciever],
        creator: request.reciever,
      }),
    ]);
    sender.friends.push(req.user._id);
    await sender.save();
  }

  await request.save();
  emitEvent(
    req,
    ALERT,
    { users: [request.sender] },
    `${req.user.name} accepted friend request`
  );
  res.json({ success: true, message: "Replied successfully." });
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.clearCookie("chatIoToken", tokenCookieOptions);
  res.json({ success: true, message: "Logged out successfully" });
});

export const getMyFriends = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;
  const { chat_id } = req.query;
  let friends = [];
  if (chat_id) {
    const chat = await Chat.findById(chat_id).populate(
      "members",
      "name avatar"
    );
    if (!chat) return next(new ErrorHandler("Chat not found", 404));
    friends = getOtherMembers(chat.members, me);
  }
  friends = await User.findById({ _id: me })
    .populate("friends", "name avatar")
    .select("friends");
  res.json({
    success: true,
    friends,
  });
});
