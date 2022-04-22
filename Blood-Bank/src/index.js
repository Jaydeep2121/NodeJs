const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.get('/getData',(req,res)=>{
    res.json({
        "statuscode":200,
        "statusmessage":"success"
    })
});


app.use(express.json());
app.use(require('./middleware/middlewares'));
app.listen(port, () => {
  console.log(`Blood-Bank app listening on port ${port}`);
});
