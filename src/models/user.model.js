import { v7 as uuidv7 } from 'uuid';
import bcrypt from 'bcryptjs';

const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuidv7(),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      hooks: {
        beforeSave: async (user) => {
          if (user.changed('password')) {
            const SALT_ROUNDS = 10;
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
          }
        },
      },
      timestamps: true,
      underscored: true,
      indexes: [
        {
          fields: ['email'],
        },
      ],
    },
  );

  return User;
};

export default defineUserModel;
