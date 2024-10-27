import Expense from "../models/Expense.model.js";
import express, { Router } from 'express'
import mongoose from "mongoose";
import { createExpense, deleteExpense, getExpense } from "../controller/Expense.controller.js";

const router = express.Router()

router.get("/", getExpense)
router.post("/", createExpense)
router.delete("/delete/:id", deleteExpense)

export default router