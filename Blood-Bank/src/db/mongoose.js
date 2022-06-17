const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://jaydeep:abcdefg@cluster0.5wyzh.mongodb.net/blood_bank_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log("no connection");
  });

/* Local Connection 
    mongoose.connect("mongodb://127.0.0.1:27017/blood-bank-api", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  */
