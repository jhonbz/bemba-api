module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: { type: DataTypes.STRING, allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: true },
      url_youtube: { type: DataTypes.STRING, allowNull: false },
      estado: { type: DataTypes.ENUM("Activa", "Inactiva"), defaultValue: "Activa" },
    });
  
    return Session;
  };
  