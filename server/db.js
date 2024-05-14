const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const uri =
    "mongodb+srv://olapetruk2003:BUHqMNZSnG99Jp7f@cluster0.mtijgvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  try {
    await mongoose.connect(uri);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    console.log("Could not connect to database!");
  }
};

module.exports = connectToDatabase;
