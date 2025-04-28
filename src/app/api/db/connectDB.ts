import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${connect.connection.host}`);

    } catch (error: any) {
        console.log("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};