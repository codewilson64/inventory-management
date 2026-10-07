import express from "express"
import { createTransaction, deleteTransactionById, getAllTransactions, getRecentTransactions, getStockInCount, getStockOutCount, getTransactionById, getTransactionHistory, getTransactionsWithProduct, updateTransactionById } from "../controllers/transaction.controller.js"

const router = express.Router()

router.get("/", getAllTransactions)
router.get("/history", getTransactionHistory)
router.get("/with-product", getTransactionsWithProduct)
router.get("/stock-in-count", getStockInCount)
router.get("/stock-out-count", getStockOutCount)
router.get("/recent", getRecentTransactions)
router.get("/:id", getTransactionById)
router.post("/", createTransaction)
router.patch("/:id", updateTransactionById)
router.delete("/:id", deleteTransactionById)

export default router