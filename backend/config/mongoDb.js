import mongoose from "mongoose"

const connectDb = async() => { console.log('connect db now')
    mongoose.connection.on('connected', () => console.log("database connected") )
 await mongoose.connect(`${process.env.MONGODB_URI}/unitycare`)
}

export default connectDb