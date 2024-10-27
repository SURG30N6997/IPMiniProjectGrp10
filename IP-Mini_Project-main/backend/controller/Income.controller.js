import express from 'express'
import mongoose from "mongoose";
import Income from '../models/Income.model.js'

export const getIncome = async(req,res) => {
    try {
        const incomes = await Income.find({});
        return res.status(200).json({
            success: true,
            data: incomes
        })
    } catch (error) {
        console.log("Error in fetching products");        
        return res.status(500).json({
            success:false,
            message: "Server Error"
        })
    }
}

export const createIncome = async (req,res) => {
    const income = req.body;

    if(!income.amount || !income.date ||!income.category){
       return res.status(400).json({
           success:false,
           message: "Please provide all fields"
       })
    }

    const newIncome = new Income(income)
    try{
       await newIncome.save();
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
};

export const deleteIncome = async (req,res)=>{
    const {id} = req.params
    
    try {
        await Income.findByIdAndDelete(id);
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