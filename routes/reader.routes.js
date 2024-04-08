import { Router } from "express";
import * as readerController from "../controllers/reader.controller.js";

const router =  Router();

router.get('/', readerController.getReaderList);
router.get('/:id', readerController.getReaderById);
router.post('/', readerController.createReader);
router.patch('/:id', readerController.updateReader);
router.delete('/:id', readerController.deleteReader);
router.post('/:id', readerController.createBookToReader);
router.delete('/:id', readerController.deleteBookFromReader);

export default router;