import mongoose from "mongoose";

let connected = false;

async function connectDB(params) {
    mongoose.set("strictQuery", true);

    if (connected) {
        console.log("MongoDB is connected.")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;