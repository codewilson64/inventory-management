import {type Request, type Response} from "express"
import db from "../db.js"
import type { RowDataPacket } from "mysql2"

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, type } = req.body

    const [transaction] = await db.query(
      `INSERT INTO transactions(product_id, quantity, type)
       VALUES(?, ?, ?)`, 
       [product_id, quantity, type]
      )
    return res.status(201).json(transaction)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const [transactions] = await db.query(
      "SELECT * FROM transactions"
    )
    return res.status(200).json(transactions)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const [transaction] = await db.query(
      "SELECT * FROM transactions WHERE transaction_id = ?", [id]
    )
    return res.status(200).json(transaction)  
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const updateTransactionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const { product_id, quantity, type } = req.body

    const fields: string[] = [];
    const values: any[] = [];

    if (product_id !== undefined) {
      fields.push("product_id = ?");
      values.push(product_id);
    }

    if (quantity !== undefined) {
      fields.push("quantity = ?");
      values.push(quantity);
    }

    if (type !== undefined) {
      fields.push("type = ?");
      values.push(type);
    }

    values.push(id);

    const [transaction] = await db.query(
      `UPDATE transactions
       SET ${fields.join(", ")}
       WHERE transaction_id = ?
      `, 
      values
    )
    return res.status(200).json(transaction)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const deleteTransactionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    
    const [transaction] = await db.query(
      "DELETE FROM transactions WHERE transaction_id = ?", [id]
    )
    return res.status(200).json(transaction)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getTransactionHistory = async (req: Request, res: Response) => {
  try {
    const [transaction] = await db.query(
      `SELECT
        t.transaction_id,
        p.name AS product_name,
        t.quantity,
        t.type,
        t.created_at
       FROM transactions t
       JOIN products p
       USING (product_id)` 
    ) 
    return res.status(200).json(transaction) 
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getTransactionsWithProduct = async (req: Request, res: Response) => {
  try {
    const [transactions] = await db.query(
      `SELECT
        t.transaction_id,
        p.name,
        t.type,
        t.quantity,
        t.created_at
       FROM transactions t
       JOIN products p
       USING (product_id)
       ORDER BY t.created_at DESC`
    ) 
    return res.status(200).json(transactions) 
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getStockInCount = async (req: Request, res: Response) => {
  try {
    const [stockIn] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(type) AS stockIn_count 
       FROM transactions 
       WHERE type = 'IN'
      `
    )  
    return res.status(200).json(stockIn[0])
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getStockOutCount = async (req: Request, res: Response) => {
  try {
    const [stockOut] = await db.query<RowDataPacket[]>(
      `SELECT COUNT(type) AS stockOut_count 
       FROM transactions 
       WHERE type = 'OUT'
      `
    )  
    return res.status(200).json(stockOut[0])
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}

export const getRecentTransactions = async (req: Request, res: Response) => {
  try {
    const [transactions] = await db.query(
      `SELECT
        t.transaction_id,
        p.name,
        t.type,
        t.quantity,
        t.created_at
      FROM transactions t
      JOIN products p
        USING (product_id)
      ORDER BY created_at DESC
      LIMIT 4`
    )  
    return res.status(200).json(transactions)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}