const mongoose = require('mongoose');
var url = "mongodb+srv://crypto:SWlAGFewvOhzmHoW@jupiter0.kzq80.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    console.log('DB INVOKED');
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('=> database connected :)');
  } catch (err) {
    console.log('console : EreR  ' + err.message);
    //process exit when failure
    process.exit(1);
  }
}

module.exports = connectDB;