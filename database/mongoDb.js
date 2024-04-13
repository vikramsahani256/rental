const mongoose = require('mongoose')

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://localhost:27017/rental-db');
      console.log("db connected");
    }
    return
  } catch (error) {
    console.log("======error======",error.message)
    return
  }
};

module.exports = connectMongoDB;
