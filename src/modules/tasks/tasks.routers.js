import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { taskSchema, updateTaskSchema } from './tasks.validations.js';
import { addTask, deleteTask, getTaskById, getTasks, updateTask } from './tasks.controllers.js';

const router = new Router();

router.post('/', auth,validate(taskSchema), addTask);

router.get('/', auth, getTasks);

router.get('/:id', auth, getTaskById);

router.patch('/:id', auth, validate(updateTaskSchema),updateTask);

router.delete('/:id', auth, deleteTask);

export default router;
