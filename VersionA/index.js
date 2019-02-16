//NPM
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//Controllers
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

//Express + Connection
const app = new express();
mongoose.connect('mongodb://localhost/node-js-test-blog',{ useNewUrlParser: true });


app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

    //Custom Middleware
    const storePost = require('./middleware/storePost');

app.use('/posts/store', storePost)
    
app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);

// Localhost Port
app.listen(4000, () => {
    console.log("Listening on http://localhost:4000/");
})