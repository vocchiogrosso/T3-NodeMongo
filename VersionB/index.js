// NPM
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

// Controllers
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

// Express + Mongo Integration
const app = new express();
mongoose.connect("mongodb://localhost/node-js-blog");

  // 
app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storePost = require('./middleware/storePost')

    //Call Middleware
    app.use('/posts/store', storePost)
    //Call Controllers
    app.get("/", homePageController);
    app.get("/post/:id", getPostController);
    app.get("/posts/new", createPostController);
    app.post("/posts/store", storePostController);

// Run On Port
app.listen(4000, () => {
  console.log("App is live at: http://localhost:4000/");
});
