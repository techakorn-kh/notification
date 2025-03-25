const { line100LineChannels } = require('../../../models/index');
const { handleErrorSQL } = require('../../../utils/sequelizeSQL');

module.exports = {
    get: async(req, res) => {
        try {
            const [data, count] = await Promise.all([
                await line100LineChannels.findAll({
                    raw: true
                }),
                await line100LineChannels.count({
                    raw: true
                })
            ])
            return res.status(200).json({ 
                code: 200, 
                status: 'success', 
                message: 'Data retrieval successful',
                count,
                data
            });
        } catch (err) {
            console.log(err);

            if (err?.data) {
                return res.status(err?.code).json({ 
                    code: err?.code, 
                    status: `${err?.status}`, 
                    message: `${err?.message || 'เกิดข้อผิดพลาด'}`,
                    data: err?.data || {}
                });
            } else {
                return res.status(404).json({ 
                    code: 404, 
                    status: 'error', 
                    message: `${err?.response ? err?.response?.statusText : err}`,
                    data: {}
                });
            }
        }
    },
    create: async(req, res) => {
        try {
            const { channel_id, channel_name, channel_desc, channel_secret, channel_access_token, channel_icon, active } = req.body;

            await line100LineChannels.create({
                channel_id, 
                channel_name, 
                channel_desc, 
                channel_secret, 
                channel_access_token, 
                channel_icon: channel_icon || null,
                active: active || false
            }).catch(async (err) => {
                console.log(err);
                throw await handleErrorSQL(res, err); 
            });
           
            return res.status(200).json({ 
                code: 200, 
                status: 'success', 
                message: 'Data saved successfully'
            });
        } catch (err) {
            console.log(err);

            if (err?.data) {
                return res.status(err?.code).json({ 
                    code: err?.code, 
                    status: `${err?.status}`, 
                    message: `${err?.message || 'เกิดข้อผิดพลาด'}`,
                    data: err?.data || {}
                });
            } else {
                return res.status(404).json({ 
                    code: 404, 
                    status: 'error', 
                    message: `${err?.response ? err?.response?.statusText : err}`,
                    data: {}
                });
            }
        }
    }
}