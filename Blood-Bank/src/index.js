const express = require("express");
const cors = require('cors');
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  credentials:true,
  origin:['http://localhost:4200']
}));
app.use(require('cookie-parser')());
app.use(express.json());
app.use(require('./middleware/middlewares'));
app.listen(port, () => {
  console.log(`Blood-Bank app listening on port ${port}`);
});