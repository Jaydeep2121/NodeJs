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

/*
  const Post = require('./models/post_Model')
  const main = async ()=>{  
      const user = await Post.findById('62590f8171287118d83da469')
      await user.populate('user_owner')
      console.log(user)
  }
  main()
*/