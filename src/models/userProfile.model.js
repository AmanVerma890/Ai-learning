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
