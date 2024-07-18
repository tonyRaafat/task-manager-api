import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { loginSchema, userSchema } from './users.validations.js';
import { addUser, login, userProfile } from './users.controllers.js';
import { auth } from '../../middlewares/auth.js';

const router = new Router();

router.post('/', validate(userSchema), addUser);

router.post('/login', validate(loginSchema),login);

router.get('/me', auth, userProfile);

export default router;
