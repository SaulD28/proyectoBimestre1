import { Router } from 'express';
import {createCategory, removeCategory, editCategory, fetchCategories} from './category.controller.js';

const router = Router();

router.post('/create', createCategory);
router.get('/list', fetchCategories);
router.put('/update/:id', editCategory);
router.delete('/delete/:id', removeCategory);

export default router;
