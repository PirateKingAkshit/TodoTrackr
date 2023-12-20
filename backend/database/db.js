import mongoose from "mongoose";
import colors from "colors"

 const Connection = () => {
    
    mongoose.connect(process.env.MONGODB_URI)
    
    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully".bgYellow.black)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected".red.bgWhite);
    });

    mongoose.connection.on("error", () => {
      console.log("Error while connecting with the database",error.message.bgYellow.white)
    });
}

export default Connection;