import express from "express"
import cors from "cors"

import categoryRoute from "./routes/category.route.js"
import productRoute from "./routes/product.route.js"
import transactionRoute from "./routes/transaction.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/transactions", transactionRoute)

app.get("/", (req, res) => {
  res.json({ message: "Inventory API is running" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})