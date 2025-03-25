const axios = require('axios');
const { 
    line100LineChannels, 
    line102LineUrlApi, 
    line104LineEventLogs 
} = require('../../models/index');

module.exports = {
    messagePush: async(params) => {
        try {
            const { channel_id, channel_access_token, group_id, messages } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Send push message",
                    method: "post"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            const value =  await axios.post(`${api?.url}`, {
                to: group_id,
                messages: [
                    {
                        type: 'text',
                        text: messages
                    }
                ]
            }, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                await line104LineEventLogs.create({
                    channel_id,
                    group_id,
                    catagory: 'webhook',
                    type: 'sentMessages',
                    body: response.data
                }).catch((err)=>{
                    throw err;
                });

                return response.data;
            }).catch((err) => {
                throw err;
            });
    
            return value;
        } catch (err) {
            throw err;
        }
    }, 
    messageQuota: async(params) => {
        try {
            const { channel_id, channel_access_token } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Get the target limit for sending messages this month",
                    method: "get"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            await axios.get(`${api?.url}`, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                const { value } = response.data;

                await line100LineChannels.update({
                    limited: value
                }, {
                    where: {
                        channel_id
                    }
                }).catch((err) => {
                    throw err;
                });
            }).catch((err) => {
                console.error(err);
                throw err;
            });
    
            return params;
        } catch (err) {
            throw err;
        }
    }, 
    messageQuotaConsumption: async(params) => {
        try {
            const { channel_id, channel_access_token } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Get number of messages sent this month",
                    method: "get"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            await axios.get(`${api?.url}`, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                const { totalUsage } = response.data;

                await line100LineChannels.update({
                    total: totalUsage
                }, {
                    where: {
                        channel_id
                    }
                }).catch((err) => {
                    throw err;
                });
            }).catch((err) => {
                console.error(err);
                throw err;
            });
    
            return params;
        } catch (err) {
            throw err;
        }
    }
}