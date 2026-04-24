import db from '../models/index.js';
import logger from '../utils/logger.util.js';
const { User } = db;

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { password },
    });

    if (!created) {
      return res.status(409).json({
        success: false,
        message: 'Email is already exists.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User sign-up successfully',
    });
  } catch (error) {
    console.log('🚀 ~ signUp ~ error:', error);

    logger.error('An error occurred while signup controller : %s', error.message, {
      stack: error.stack,
    });

    return res.status(error?.statusCode ?? 500).json({
      success: false,
      message: error?.message ?? `An error occurred while login: ${error.message}`,
    });
  }
};
