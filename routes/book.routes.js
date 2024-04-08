import { Router } from "express";
import * as bookController from "../controllers/book.controller.js";

const router =  Router();

router.get('/', bookController.getBookList);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.patch('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;