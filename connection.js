const mongoose = require('mongoose');
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};
mongoose.set('strictQuery', true);
const connectDB = () => {
  return new Promise((resolve, reject) => {
    const mongoURL = `mongodb+srv://ragavi-ramasamy:4IJEEXXY0W2rJ27c@cluster0.idolg.mongodb.net/Halleyx`
    // const mongoURL = `mongodb://localhost:27017/dmn-engine-mtc`;
    // const mongoURL = process.env.MONGODB_URI;
    // const mongoURL = `mongodb+srv://ragavi:FskyUPWKbYnAT5jd@cluster0.zvo0i.mongodb.net/Halleyx`
    mongoose
      .connect(mongoURL, mongoOptions)
      .then((conn) => {
        console.info('connected', conn.connections[0].name);
        resolve(conn);
      })
      .catch((error) => {
        // console.log(error)
        reject(error);
      });
  });
};

module.exports = connectDB;
