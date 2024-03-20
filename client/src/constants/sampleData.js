import randomUserAvatar from '../assets/random/chatIOUser.jpg';

export const users = [
    {
        name: "Neel Jain",
        avatar: {
            url: randomUserAvatar
        },
        _id: "101"
    },
    {
        name: "Arjav Jain",
        avatar: "",
        _id: "104"
    },
]

export const notifications = [
    {
        sender: {
            name: "Dhruv",
            avatar: randomUserAvatar
        }
        ,
        _id: "dmpwdkw"
    },
    {
        sender: {
            name: "Rahul",
            avatar: randomUserAvatar
        }
        ,
        _id: "dmkdnfsd"
    },

]


export const sampleMessages = [
    {
        _id: "Dsodnsondaos",
        content: "Hii Every one how r u ?",
        attachments: [
            {
                public_id: "pid1",
                url: "https://cdn.wallpapersafari.com/40/52/lHEsPO.jpg"
            },
        ],
        sender: {
            _id: "user_id1",
            name: "Dhruv",
            avatar: randomUserAvatar
        },
        chatId: "chatId1",
        createdAt: '2024-01-23'
    },
    {
        _id: "Dsodnsdsondaos",
        content: "Hii Every one how r u ?",
        attachments: [
            {
                public_id: "pid1",
                url: "https://cdn.wallpapersafari.com/40/52/lHEsPO.jpg"
            },
        ],
        sender: {
            _id: "user_id1",
            name: "Dhruv",
            avatar: randomUserAvatar
        },
        chatId: "chatId1",
        createdAt: '2024-01-23'
    }

]
export const userTableData = [
    {
        _id: 101,
        name: "Gaurav Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 11
    }
    ,
    {
        _id: 1021,
        name: "Gaurav Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 11
    }
    ,
    {
        _id: 10321,
        name: "Gaurav Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 11
    }
    ,
    {
        _id: 102,
        name: "Kunal Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 4
    },
    {
        _id: 104,
        name: "Kunal Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 4
    },
    {
        _id: 103,
        name: "Kunal Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 4
    },
    {
        _id: 100,
        name: "Kunal Jain",
        avatar: randomUserAvatar,
        groups: 22,
        friends: 4
    },

] 

export const chats = [
{
    name:"snd dsdr rfj",
    avatar:[randomUserAvatar,randomUserAvatar,randomUserAvatar],
    _id:1,
    members:[1,2],
    totalMembers:2,
    totalMessages:20,
    creator:{
        name:"John Doe",
        avatar:randomUserAvatar
    }
}
]