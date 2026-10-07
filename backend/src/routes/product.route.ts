import express from "express"
import { createProduct, deleteProductById, getAllProducts, getLowStockProducts, getProductById, getProductsCount, getProductsWithCategory, updateProductById } from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", getAllProducts)
router.get("/with-category", getProductsWithCategory)
router.get("/count", getProductsCount)
router.get("/low-stock", getLowStockProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.patch("/:id", updateProductById)
router.delete("/:id", deleteProductById)

export default router