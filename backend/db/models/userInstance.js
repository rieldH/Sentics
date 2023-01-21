module.exports = (sequelize, Sequelize) => {
  const UserInstance = sequelize.define("userInstance", {
    pos_x: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    pos_y: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    vel_x: {
      allowNull: false,
      type: Sequelize.FLOAT,
      default: 0,
    },
    vel_y: {
      allowNull: false,
      type: Sequelize.FLOAT,
      default: 0,
    },
    confidence: {
      allowNull: true,
      type: Sequelize.INTEGER,
      default: 0,
    },
    humanID: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    timestamp: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  return UserInstance;
};
