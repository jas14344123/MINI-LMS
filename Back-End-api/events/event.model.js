const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        eventDate: { type: DataTypes.DATE, allowNull: false },
        eventDescription: { type: DataTypes.STRING, allowNull: false },
        createdDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('Event', attributes, options);
}
