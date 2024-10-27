import express from 'express'
import mongoose from "mongoose";
import Expense from '../models/Expense.model.js'

export const getExpense = async(req,res) => {
    try {
        const expenses = await Expense.find({});
        return res.status(200).json({
            success: true,
            data: expenses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}

export const createExpense = async (req,res) => {
    const expense = req.body;

    if(!expense.amount || !expense.date ||!expense.category){
       return res.status(400).json({
           success:false,
           message: "Please provide all fields"
       })
    }

    const newExpense = new Expense(expense)
    try{
       await newExpense.save();
       res.status(201).json({
           success: true,
           message: "Income added successfully"
       })
    } catch (error){
       console.log("Error in add income: ", error.message);
       return res.status(500).json({
           success: false,
           message: "Server error"
       })
       
    }
}

export const deleteExpense = async (req,res)=>{
    const {id} = req.params
    
    try {
        await Expense.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Icome removed successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "income not found"
        })
    }
}