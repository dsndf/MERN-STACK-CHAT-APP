import randomUserAvatar from '../assets/random/chatIOUser.jpg';

export const users = [
    {
        name: "Neel Jain",
        avatar: {
            url:randomUserAvatar
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
            name: "Dhruv"
        } ,
        chatId: "chatId1",
        createdAt: '2024-01-23'
    }

]