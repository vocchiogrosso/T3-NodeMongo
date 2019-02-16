const path = require('path');
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');

const app = new express();
mongoose.connect('mongodb://localhost/node-js-test-blog',{ useNewUrlParser: true });


app.use(fileUpload())

app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))
/*| Custom Middleware |*/

const customMiddleware = (req, res, next) => {
    console.log('I HAVE BEEN CALLED');
    next();
}

app.use(customMiddleware)

/*||*/

app.get('/', async (req,res)=>{
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

    app.get('/posts/new',(req,res)=>{
        res.render('create');
    })

    app.post("/posts/store", (req, res) => {
        const { image } = req.files
      
        image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
          Post.create({
            ...req.body,
            image: `/posts/${image.name}`
          }, (error, post) => {
            res.redirect("/");
          });
        })
      });

    app.get('/post/:id', async (req, res) => {
        const post = await Post.findById(req.params.id)
        res.render('post', {
            post
        })
    })

app.get('/blog',(req,res)=>{
    res.render('blog');
})

app.get('/status',(req,res)=>{
    res.render('status');
})

app.get('/store',(req,res)=>{
    res.render('store');
})

app.listen(4000, () => {
    console.log("Listening on http://localhost:4000/");
})