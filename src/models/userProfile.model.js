import { v7 as uuidv7 } from 'uuid';

const defineUserProfileModel = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuidv7(),
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timeZone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'UserProfiles',
      timestamps: true,
      underscored: true,
    },
  );

  return UserProfile;
};

export default defineUserProfileModel;
