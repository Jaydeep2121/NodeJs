const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users_Router");
const topicRouter = require("./routers/topic_Router");
const postRouter = require('./routers/post_Router')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(topicRouter);
app.use(postRouter);
app.listen(port, () => {
  console.log(`Blog-Posting app listening on port ${port}`);
});
