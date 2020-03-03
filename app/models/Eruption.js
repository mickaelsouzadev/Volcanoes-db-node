module.exports = (sequelize, DataTypes) => {

    const Eruption = sequelize.define('Eruption', {
        year: DataTypes.STRING,
        description: DataTypes.STRING,
        vei_index: DataTypes.INTEGER,
        type_id: DataTypes.INTEGER,
        volcano_id: DataTypes.INTEGER
    }, { tableName: 'eruptions', timestamps: false});

    Eruption.associate = function(models) {
        Eruption.belongsTo(models.EruptionType, {foreignKey: 'type_id', as: 'type', targetKey: 'id'}),
        Eruption.belongsTo(models.Volcano, {foreignKey: 'volcano_id', as: 'volcano', targetKey: 'id'})
    };
   
    return Eruption;
}

