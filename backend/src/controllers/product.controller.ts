import {type Request, type Response} from "express";
import db from "../db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category_id } = req.body

    const [product] = await db.query<ResultSetHeader>(
     `INSERT INTO products(name, price, stock, category_id)
      VALUES(?, ?, 0, ?)`,      
      [name, price, category_id]
      )

    const productId = product.insertId

    await db.query(
      `INSERT INTO transactions(product_id, quantity, type)
       VALUES(?, ?, ?)`,
       [productId, stock, "IN"]
    )
    return res.status(201).json({
      message: "Product created successfully",
      product_id: productId
    })
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const [products] = await db.query(
      "SELECT * FROM products"
    )
    return res.status(200).json(products)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const [product] = await db.query(
      "SELECT * FROM products WHERE product_id = ?", [id]
    )
    return res.status(200).json(product)  
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const { name, stock, price, category_id } = req.body

    const fields: string[] = [];
    const values: any[] = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }

    if (stock !== undefined) {
      fields.push("stock = ?");
      values.push(stock);
    }

    if (price !== undefined) {
      fields.push("price = ?");
      values.push(price);
    }

    if (category_id !== undefined) {
      fields.push("category_id = ?");
      values.push(category_id);
    }

    values.push(id);

    const [product] = await db.query(
      `UPDATE products
       SET ${fields.join(", ")}
       WHERE product_id = ?
      `, 
      values
    )
    return res.status(200).json(product)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    
    const [product] = await db.query(
      "DELETE FROM products WHERE product_id = ?", [id]
    )

    return res.status(200).json(product)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getProductsWithCategory = async (req: Request, res: Response) => {
  try {    
    const [product] = await db.query(
      `SELECT
        p.product_id,
        p.name,
        p.price,
        p.stock,
        c.name AS category
       FROM products p
       JOIN categories c
        USING (category_id)
      `
    )
    return res.status(200).json(product)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}

export const getProductsCount = async (req: Request, res: Response) => {
  try {
    const [products] = await db.query<RowDataPacket[]>(
      `SELECT 
        COUNT(product_id) AS product_count
      FROM products`
    )  
    return res.status(200).json(products[0])
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}

export const getLowStockProducts = async (req: Request, res: Response) => {
  try {
    const [products] = await db.query(
      `SELECT
        p.product_id,
        p.name,
        p.stock
       FROM products p
       WHERE stock <= 20
      `
    )
    return res.status(200).json(products)  
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}