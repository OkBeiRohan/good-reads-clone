const config = require("./index");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connectDB = async () => {
  
  /****************
   * MongoDB Memory Server is a locally running MongoDB for testing and development purposes
   */
  const mongo = new MongoMemoryServer();
  try {

    /**************
     * If the mode is development, it will use MongoMemoryServer and else(production), it will use real database
     */
    let dbUrl =
      config.mode === "development" ? await mongo.getUri() : config.databaseUrl;
      
    /**************
     * Try connecting to MongoDB and throw error if couldn't.
     */
    const conn = await mongoose.connect(`${dbUrl}`, {
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
