import { Router } from "express";
import * as reviewController from "../controllers/review.controller.js";

const router =  Router();

router.post('/:id', reviewController.addReviewToBook);

export default router;