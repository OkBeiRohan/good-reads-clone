const config = require("./index");
const mongoose = require("mongoose");

const connectDB = async () => {
  /***************
   * Try connecting to MongoDB and throw error if couldn't.
   */

  try {
    const conn = await mongoose.connect(`${config.databaseUrl}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
