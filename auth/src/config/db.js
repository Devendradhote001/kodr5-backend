const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ddhote780_db_user:kz9CYW9PDYhwRru8@auth.s1gkomm.mongodb.net/"
    );
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

module.exports = connectDB;
