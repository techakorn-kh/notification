const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const line104LineEventLogs = sequelize.define('line_104_line_event_logs', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "channel_id": {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    "group_id": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "catagory": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "type": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "body": {
        type: DataTypes.JSON,
        allowNull: true
    }
}, { 
    indexes: [
        {
            fields: ['channel_id']
        }
    ]
});

line104LineEventLogs.sync({ alter: true });

module.exports = line104LineEventLogs;