import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config/env.config.js';

export const generateTokens = async (user) => {
  try {
    const accessToken = jwt.sign(
      {
        userId: user.id,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      },
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export const generateHashedToken = async () => {
  try {
    return crypto.randomBytes(40).toString('hex');
  } catch (error) {
    return error;
  }
};
