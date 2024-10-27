import Income from "../models/Income.model.js";
import express from 'express'
import mongoose from "mongoose";
import { createIncome, deleteIncome, getIncome } from "../controller/Income.controller.js";

const router = express.Router()

router.get("/", getIncome)
router.post("/", createIncome)
router.delete("/delete/:id", deleteIncome)

export default router