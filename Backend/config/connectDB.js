import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
 
    mongoose.connect(`${process.env.DBConnection}`); 
    console.log("Connected to Database successfully!")
    } catch (error) {
        console.log("Can not connect to the database: " , error);
    }

}





