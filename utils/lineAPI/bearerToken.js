const { line100LineChannels } = require('../../models/index');

const bearerToken = async (authorization) => {
    try {
        if(!authorization) return res.status(401).json({ code: 401, status: 'error', message: 'Unauthorized'});

        const token = authorization.split(' ')[1];

        if(!token) return res.status(401).json({ code: 401, status: 'error', message: 'Unauthorized'});

        const result = await line100LineChannels.findOne({
            where: {
                channel_access_token: token
            }
        }).catch((err)=>{
            throw err;
        });

        if(!result) return res.status(401).json({ 
            code: 401, 
            status: `error`, 
            message: `Your account is not registered yet. Please contact the relevant person.`
        });

        return {
            channel_id: result?.channel_id,
            channel_access_token: result?.channel_access_token
        }
    } catch (error) {
        throw err;
    }
}

module.exports = bearerToken;
