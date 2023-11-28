import express from "express";
import { createTag, deleteTag, getTag, getTags, updateTag } from "../Controllers/tagContoller.js";

const router = express.Router();


router.get('/query', getTags);
router.get('/find/:id', getTag);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);


export default router;
 