const mongoose=require('mongoose')

MONGOURI="mongodb+srv://prathyusha:12345@cluster0.qqcfh.mongodb.net/users?retryWrites=true&w=majority"
const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(MONGOURI, {
        useNewUrlParser: true
      });
      console.log("Connected to DB !!");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  module.exports = InitiateMongoServer;
  