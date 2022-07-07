// const mongoose = require('mongoose');
import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb+srv://admin-suraj:itsgabru@clustermine.vrxpf.mongodb.net/publicx?retryWrites=true&w=majority' ,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error){
        console.error(`Error: ${error.message}`)
    }
}

// module.exports = connectDB;
export default connectDB