import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://2022sairamkonar:3HYQEd3f4o8GjQyY@project.zoa4a.mongodb.net/");
        console.log(`Mongo Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
    }
    
}