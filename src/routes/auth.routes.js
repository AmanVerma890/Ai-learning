import express from 'express';
import { signUp } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { signUpSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/sign-up', validate(signUpSchema), signUp);

// router.post('/');

export default router;
