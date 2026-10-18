import express from "express"
import { createCategory, deleteCategoryById, getAllCategories, getCategoriesCount, getCategoryById, getCategoryWithProductCount, updateCategoryById } from "../controllers/category.controller.js"

const router = express.Router()

router.get("/", getAllCategories)
router.get("/with-product-count", getCategoryWithProductCount)
router.get("/count", getCategoriesCount)
router.get("/:id", getCategoryById)
router.post("/", createCategory)
router.patch("/:id", updateCategoryById)
router.delete("/:id", deleteCategoryById)

export default router