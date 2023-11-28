import express from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../Controllers/categoryController.js";

const router = express.Router();

router.get('/', getCategories);
router.get('/find/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;