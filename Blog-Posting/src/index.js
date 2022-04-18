const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(require('./middleware/middlewares'));
app.listen(port, () => {
  console.log(`Blog-Posting app listening on port ${port}`);
});
