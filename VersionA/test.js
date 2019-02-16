const mongoose = require('mongoose')

const Post = require('./database/models/Post')


mongoose.connect('mongodb://localhost/node-js-test-blog')

// Create Function (Write)
/*
Post.create({
    title: 'My Second Blog',
    description: 'Tester',
    content: 'This Is A Test.'
}, (error, post)=> {
    console.log(error, post)
})


// Find Function (Read)



Post.find({}, (error, posts ) => {
    console.log(error, posts)
})


/*


Post.find({
    // Add Parameters To Sort 
    title: 'My Second Blog'
}, (error, posts ) => {
    console.log(error, posts)
})


Post.findById("5c65e457abb48d22a0f99ee4", (error, post) => {
    console.log(error, post)
})


Post.findByIdAndUpdate("5c65e457abb48d22a0f99ee4", {
    title: 'This Has Been Changed'
}, (error, post) => {
    console.log(error, post)
})

*/