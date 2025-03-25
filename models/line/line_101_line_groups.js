const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const line101LineGroups = sequelize.define('line_101_line_groups', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "channel_id": {
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
    "group_id": {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    "group_name": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "member": {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    "type": {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    "picture_url": {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    indexes: [
        {
            unique: false,
            fields: ['channel_id', 'group_id']
        }
    ]
});

line101LineGroups.sync({ alter: true });

module.exports = line101LineGroups;