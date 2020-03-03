module.exports = (sequelize, DataTypes) => {

    const Volcano = sequelize.define('Volcano', {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        description: DataTypes.TEXT,
        type_id: DataTypes.INTEGER
    }, { tableName: 'volcanoes'});

    Volcano.associate = function(models) {
        Volcano.belongsTo(models.VolcanoType, {foreignKey: 'type_id', as: 'type', targetKey: 'id'})
    };
   
    return Volcano;
}

