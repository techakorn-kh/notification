const axios = require('axios');
const config = require('../../config');
const encodeUrl = require('../encodeUrl');
const { line101LineGroups, line102LineUrlApi } = require('../../models/index');
const { handleErrorSQL } = require('../../utils/sequelizeSQL');

module.exports = {
    groupSummary: async(params) => {
        try {
            const { channel_id, channel_access_token, groupId } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Get group chat summary",
                    method: "get"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            const url = encodeUrl(api?.url, `{groupId}`, groupId);

            await axios.get(`${url}`, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                const { groupId, groupName, pictureUrl } = response.data;
    
                await line101LineGroups.update({
                    group_name: groupName || '',
                    picture_url: pictureUrl || ''
                },{
                    where: {
                        channel_id,
                        group_id: groupId
                    }
                }).catch(async (err) => {
                    throw await handleErrorSQL(res, err); 
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
    groupMembersCount: async(params) => {
        try {
            const { channel_id, channel_access_token, groupId } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Get number of users in a group chat",
                    method: "get"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            const url = encodeUrl(api?.url, `{groupId}`, groupId);

            await axios.get(`${url}`, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                const { count } = response.data;
    
                await line101LineGroups.update({
                    member: count
                },{
                    where: {
                        channel_id,
                        group_id: groupId
                    }
                }).catch(async (err) => {
                    throw await handleErrorSQL(res, err); 
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
    groupMembersIds: async(params) => {
        try {
            const { channel_id, channel_access_token, groupId } = params;

            const api = await line102LineUrlApi.findOne({
                where: {
                    url_desc: "Get group chat member user IDs",
                    method: "get"
                },
                raw: true
            }).catch((err) => {
                throw err;
            });

            const url = encodeUrl(api?.url, `{groupId}`, groupId);

            await axios.get(`${url}`, {
                headers: { 
                    Authorization: `Bearer ${channel_access_token}`
                }
            }).then(async (response) => {
                console.log(response.data);
                return
            }).catch((err) => {
                console.error(err);
                throw err;
            });
    
            return params;
        } catch (err) {
            throw err;
        }
    }
};