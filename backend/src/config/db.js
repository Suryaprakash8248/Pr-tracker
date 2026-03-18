import mongoose from "mongoose";


const  connectDb = async ()=> { 
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
    
  } catch (error) {
    console.log('failed to connect db', "error - " + error);
    process.exit(1);
    
  }
  
}

export default connectDb;