const connectDB = require('./connection');
const switchDB = async (dbName, dbSchema) => {
  console.log("🚀 ~ switchDB ~ dbName:", dbName)
  const mongoose = await connectDB();
  try {
    
    if (mongoose.connection.readyState === 1) {
      const db = mongoose.connection.useDb(dbName, { useCache: true });
    // Prevent from schema re-registration
    if (!Object.keys(db.models).length) {
      // // console.log("true");
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      });
    } else {
      dbSchema.forEach((schema, modelName) => {
        db.model(modelName, schema);
      });
    }
    return db;
  }
  throw new Error('err');
} catch (error) {
 console.log("🚀 ~ switchDB ~ error:", error)
 throw new Error(error) 
}
};

const getDBModel = async (db, modelName) => {
  try {
    
    return db.model(modelName);
  } catch (error) {
    console.log(error,"db")
 throw new Error(error) 

  }
};

module.exports = { switchDB, getDBModel };
