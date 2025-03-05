import { Router } from 'express';
import {createCategory, updateCategory, getCategories} from './category.controller.js';

const router = Router();

router.post('/create', createCategory);
router.get('/list', getCategories);
router.put('/update/:id', updateCategory);

export default router;
