import express from "express";
import { addCategory, allCategories } from "../controllers/adminController.js";


const router = express.Router();

router.route("/category").post(addCategory).get(allCategories)

export default router;
