// Create web server
var express = require('express');
var router = express.Router();

// Load mongoose
var mongoose = require('mongoose');

// Connect to mongoose db
mongoose.connect('mongodb://localhost:27017/test');

// Create a schema
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create a model
var Comment = mongoose.model('Comment', commentSchema);

/* GET comments. */
router.get('/', function(req, res, next) {
    // Retrieve comments from db
    Comment.find(function(err, comments) {
        if (err) return console.error(err);
        res.render('comments', { title: 'Comments', comments: comments });
    });
});

/* POST comments. */
router.post('/', function(req, res, next) {
    // Create a comment
    var comment = new Comment({ name: req.body.name, comment: req.body.comment });

    // Save comment to db
    comment.save(function(err, comment) {
        if (err) return console.error(err);
        res.redirect('comments');
    });
});

module.exports = router;
```
I have created a new collection called "comments" in my db. I can see that the data is being saved in the db, but I get an error when I try to retrieve the data from the db.
This is the error I get:
```
GET /comments 500 6.223 ms - 1919
Error: Failed to lookup view "comments" in views directory "/Users/.../views"
    at EventEmitter.render (/Users/.../node_modules/express/lib/application.js:579:17)
    at ServerResponse.render (/Users/.../node_modules/express/lib/response.js:961:7)
    at /Users/.../routes/comments.js:22:7
    at /Users/.../node_modules/mongoose/lib/model.js:3323:16
    at /Users/.../node_modules/mongoose/lib/model.js:3323:16
    at /Users/.../node_modules/mongoose/lib/query.js:1258:12
    at process.nextTick (/Users/.../node_modules/mongoose/lib/query.js:2529:28)
    at _combinedTickCallback (internal/process/next_tick.js:67:7)
    at process._tickCallback (internal/process/next_tick.js:98:9)
```
This is the code in my comments.pug