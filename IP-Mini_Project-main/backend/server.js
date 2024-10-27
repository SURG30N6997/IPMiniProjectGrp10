import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import Income from './models/Income.model.js';
import Expense from './models/Expense.model.js';
import incomeRoutes from './routes/Income.route.js'
import expenseRoutes from './routes/Expense.route.js'
import cors from 'cors'
// import userRoutes from './routes/User.routes.js'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/income", incomeRoutes)
app.use("/api/expense", expenseRoutes)
// app.use("/api/users", userRoutes)

console.log(process.env.MONGO_URI); // Check if the URI is printed
const port = 5000
app.listen(port, () => {
    connectDB();
    console.log(`Server started on ${port}`);
    
})