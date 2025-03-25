const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");
const arr = require('../../utils/import/lineMessageAPI');

const line102LineUrlApi = sequelize.define('line_102_line_url_api', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "url": {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    "url_desc": {
        type: DataTypes.STRING(255),
        primaryKey: true,
        allowNull: false
    },
    "method": {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false
    }
}, { 
    indexes: [
        {
            unique: false,
            fields: ['url','method']
        }
    ]
});

line102LineUrlApi.sync({ force: true }).then(async () => {
    if(arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            await line102LineUrlApi.findOrCreate({
                where: {
                    url: arr[i]?.url,
                    method: arr[i]?.method
                },
                defaults: arr[i]
            }).catch((err) => {
                console.error(err);
            });
        }
    }
});

module.exports = line102LineUrlApi;