import { tokenCookieOptions } from "../constants/cookie.js";
import { emitEvent } from "../events/emitEvent.js";
import {
  ALERT,
  NOTIFICATION_ALERT,
  OFFLINE,
  REFETCH_CHATS,
} from "../events/serverEvents.js";
import { cloudinaryInstance, getDataUri } from "../lib/helper.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { User } from "../models/user.js";
import { usersSocket } from "../server.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { sendUserResponse } from "../utils/sendUserResponse.js";
import { validatePassword } from "../utils/validatePassword.js";

export const signupUser = catchAsyncError(async (req, res, next) => {
  const { name, username, bio, password } = req.body;
  const file = req.file;
  if (!file) return next(new ErrorHandler("Avatar is required", 400));
  const user = await User.create({
    name,
    username,
    bio,
    password,
  });
  const { content } = await getDataUri(file);
  const mycloud = await cloudinaryInstance.v2.uploader.upload(content, {
    folder: "Chat App",
  });
  user.avatar = {
    url: mycloud.secure_url,
    public_id: mycloud.public_id,
  };
  await user.save();
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
  console.log("called");
  const myFriends = req.user.friends;
  const me = req.user._id;
  let users = await User.aggregate([
    {
      $match: {
        $and: [
          { name: { $regex: keyword, $options: "i" } },
          { _id: { $nin: myFriends } },
          {
            _id: { $ne: me },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "requests", // we can use only that name which is used by mongodb like Request -> requests
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$$userId", "$reciever"],
                  },
                  {
                    $eq: [me, "$sender"],
                  },
                  {
                    $eq: ["Pending", "$status"],
                  },
                ],
              },
            },
          },
        ],

        as: "requestRecievedUsers",
      },
    },
    // {
    //   $match: {
    //     requestRecievedUsers: [],
    //   },
    // },
  ]);
  console.log("this s", { users });
  users = users.map((user) => {
    return {
      name: user.name,
      _id: user._id,
      avatar: user.avatar,
      sendStatus: user?.requestRecievedUsers?.length > 0 ? true : false,
    };
  });

  const message = users.length + " users found";
  res.json({ success: true, message, users });
});

export const sendFreindRequest = catchAsyncError(async (req, res, next) => {
  const { userId } = req.body;
  const me = req.user._id;
  let id = userId;
  const promises = [];

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User with userId " + id + " not found", 400));
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

  const requests = await Promise.all(promises);
  emitEvent(req, NOTIFICATION_ALERT, { users: [userId] });
  res
    .status(201)
    .json({ suucess: true, requests, message: "Request Sent to " + user.name });
});

export const getMyNotifications = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;

  const notifications = await Request.find({
    $and: [
      { reciever: me },
      { $or: [{ status: "Pending" }, { status: "Accepted" }] },
    ],
  }).populate("sender", "name avatar");
  const newNotifications = notifications.filter(
    (notification) => notification.status === "Pending"
  );
  const otherNotifications = notifications.filter(
    (notification) => notification.status !== "Pending"
  );

  res.json({
    success: true,
    newNotifications,
    otherNotifications,
  });
});

export const replyfriendRequest = catchAsyncError(async (req, res, next) => {
  console.log("REQUEST");
  const { accepted } = req.body;
  const { id } = req.params;
  const me = req.user._id;
  const reply = accepted ? "Accepted" : "Denied";
  console.log({ reply });
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
    await request.save();
  } else if (reply === "Denied") await Request.findByIdAndDelete(request._id);
  emitEvent(req, REFETCH_CHATS, { users: [request.sender, me] });
  res.json({ success: true, message: "Replied successfully." });
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.clearCookie("chatIoToken");
  const myFriends = req.user.friends;
  emitEvent(req, OFFLINE, { users: myFriends });
  res.json({ success: true, message: "Logged out successfully" });
});

export const getMyFriends = catchAsyncError(async (req, res, next) => {
  const me = req.user._id;
  const { keyword } = req.query;
  const myFriends = await User.findById({ _id: me })
    .populate("friends", "name avatar")
    .select("friends -_id");

  const filteredFriends = myFriends.friends.filter((friend) => {
    let regex = new RegExp(keyword, "gi");
    return regex.test(friend.name);
  });

  res.json({
    success: true,
    friends: filteredFriends,
  });
});
