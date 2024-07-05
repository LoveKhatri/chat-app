import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("Connected to MongoDB");
        })
    } catch (error) {
        console.log("Failed to connect to MONGODB")
        console.log("Error: ", error);
    }
}

export default connectToMongoDB;