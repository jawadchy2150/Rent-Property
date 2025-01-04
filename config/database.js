import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    //if the database is already connected, then don't connect again
    if (connected) {
        console.log("MongoDB is already connected")
        return;
    }

    //connect to mongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;