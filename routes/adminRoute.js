import express from "express";
import {
  adImageRequest,
  addCategory,
  allCategories,
} from "../controllers/adminController.js";

const router = express.Router();

router.route("/category").post(addCategory).get(allCategories);
router.route("/adImageRequest").post(adImageRequest);

export default router;
