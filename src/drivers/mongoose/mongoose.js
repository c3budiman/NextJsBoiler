import mongoose from 'mongoose';
const User = require('../../models/mongoose/User')

const { MONGODB_URI } = process.env

const connectDB = async () => {
    // console.log(mongoose.connection.readyState)
    if (mongoose.connection.readyState !== 0) return;
    return await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, (err) => {
        console.log(err)
    });
}

const Models = { User }

module.exports = { Models, connectDB }