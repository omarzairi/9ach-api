import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://omar:omaromar@cluster0.gvuusw6.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`Error Connecting to DataBase : ${error}`);
    process.exit(1);
  }
};
export default connectDB;
