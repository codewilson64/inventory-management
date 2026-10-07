import {type Request, type Response} from "express"
import db from "../db.js"
import type { RowDataPacket } from "mysql2"

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const [category] = await db.query(
      `INSERT INTO categories(name)
       VALUES(?)`, 
       [name]
      )
    return res.status(201).json(category)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.query(
      "SELECT * FROM categories"
    )
    return res.status(200).json(categories)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const [category] = await db.query(
      "SELECT * FROM categories WHERE category_id = ?", [id]
    ) 
    return res.status(200).json(category) 
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    const { name } = req.body

    const [category] = await db.query(
      `UPDATE categories
       SET name = ?
       WHERE category_id = ?
      `, 
      [name, id]
    )
    return res.status(200).json(category)
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string
    
    const [category] = await db.query(
      "DELETE FROM categories WHERE category_id = ?", [id]
    )
    return res.status(200).json(category)
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getProductsByCategoryId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string

    const [products] = await db.query(
      `SELECT
        p.product_id,
        p.name,
        p.price
      FROM products p
      WHERE p.category_id = ?
      `,
      [id]
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

export const getCategoryWithProductCount = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.query(
      `SELECT
        c.category_id,
        c.name,
        COUNT(p.category_id) AS product_count
      FROM categories c
      JOIN products p
      USING (category_id)
      GROUP BY 
        c.category_id,
	      c.name`
    )
    return res.status(200).json(categories)  
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Database error"
    })
  }
}

export const getCategoriesCount = async (req: Request, res: Response) => {
  try {
    const [categories] = await db.query<RowDataPacket[]>(
      `SELECT 
        COUNT(category_id) AS category_count
      FROM categories`
    )  
    return res.status(200).json(categories[0])
  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Database error" })
  }
}