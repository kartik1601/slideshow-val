import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', (msg) => {
            console.log('MongoDB connected. ' + msg);
        });
        
        connection.on('error', (err) => {
            console.log('MongoDB connection error. ' + err);
            process.exit();
        });

    } catch (error) {
        console.log('Something went wrong in conneccting to DB.');
        console.log(error);
    }
}