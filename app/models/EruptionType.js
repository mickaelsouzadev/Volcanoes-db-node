module.exports = (sequelize, DataTypes) => {
    const EruptionType = sequelize.define('EruptionType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
    }, { tableName: 'eruption_types', timestamps: false});

    return EruptionType;
} 