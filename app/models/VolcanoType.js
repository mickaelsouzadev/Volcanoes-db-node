module.exports = (sequelize, DataTypes) => {
    const VolcanoType = sequelize.define('VolcanoType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
    }, { tableName: 'volcano_types'});

    return VolcanoType;
} 