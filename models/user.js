module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
    return User;
  };
  