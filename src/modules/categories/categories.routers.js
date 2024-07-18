import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { categorySchema, updateCategorySchema } from './categories.validations.js';
import { addCategry, deleteCategory, getCategories, getCategoryById, UpdateCategory } from './categories.controllers.js';

const router = new Router();

router.post('/', auth,validate(categorySchema),addCategry);

router.get('/', auth,getCategories);

router.get('/:id', auth, getCategoryById);

router.patch('/:id', auth,validate(updateCategorySchema),UpdateCategory);

router.delete('/:id', auth,deleteCategory );

export default router;
