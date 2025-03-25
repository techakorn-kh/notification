const arr = [
    {
        url: "https://api.line.me/v2/bot/group/{groupId}/summary",
        url_desc: "Get group chat summary",
        method: "get"
    },
    {
        url: "https://api.line.me/v2/bot/group/{groupId}/members/count",
        url_desc: "Get number of users in a group chat",
        method: "get"
    },
    {
        url: "https://api.line.me/v2/bot/group/{groupId}/members/ids",
        url_desc: "Get group chat member user IDs",
        method: "get"
    },
    {
        url: "https://api.line.me/v2/bot/message/quota",
        url_desc: "Get the target limit for sending messages this month",
        method: "get"
    },
    {
        url: "https://api.line.me/v2/bot/message/quota/consumption",
        url_desc: "Get number of messages sent this month",
        method: "get"
    },
    {
        url: "https://api.line.me/v2/bot/message/push",
        url_desc: "Send push message",
        method: "post"
    }
];

module.exports = arr;