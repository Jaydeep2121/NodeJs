const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://jaydeep:abcdefg@cluster0.5wyzh.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb://127.0.0.1:27017/blood-bank-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});