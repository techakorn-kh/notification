const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const md000Users = sequelize.define('md_000_users', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "username": {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel ID',
            },
            notNull: {
                msg: 'Channel ID',
            },
            isEvent(value) {
                if(value.length > 50) {
                    throw 'จำนวนข้อความมีมากกว่า 50 ตัวอักษร';
                }
            }
        }
    },
    
}, { 
    indexes: [
        {
            unique: false,
            fields: ['channel_id', 'group_id']
        }
    ]
});

md000Users.sync({ force: true });

module.exports = md000Users;