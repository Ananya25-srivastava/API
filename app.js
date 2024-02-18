const express = require ("express");
const bodyParser = require ("body-parser");
const ejs = require("ejs");
const mongoose = require ('mongoose');

const app = express ();

app. set('view engine', 'ejs');

app.use(express.urlencoded ({extended: true})); 
app.use(express.static("public"));
mongoose. connect ("mongodb://localhost:27017/api",{
    useNewUrlParser: true
});

const articleSchema = {
    title: String, 
    content : String
};

const Article = mongoose.model("items", articleSchema);

app.get("/articles",function(req,res){
    Article.find().then(function (found) {
        res.send(found);
      }).catch(function (err) {
        console.log(err);
      });
});

app.post("/articles", function (req, res){
    const element1 = new Article({
    title: req.body.title,
    content: req.body.content
    });
    element1.save();
    res.send(element1);
});

app.delete("/articles",function(req,res){
    Article.deleteMany().then(function () {
        res.send("deleted");
      }).catch(function (err) {
        res.send(err);
      });
});

app.get("/articles/:articleTitle",function(req,res){
    Article.findOne({title:req.params.articleTitle}).then(function (found) {
        res.send(found);
      }).catch(function (err) {
        console.log(err);
      });
});

app.put("/articles/:articleTitle",function(req,res){
    Article.updateMany(
        {title:req.params.articleTitle},
        {title:req.body.title , content:req.body.content},
        {overwrite:true}).then(function () {
        res.send("updated");
      }).catch(function (err) {
        console.log(err);
      });
});

app.patch("/articles/:articleTitle",function(req,res){
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set: {content:req.body.content}}).then(function () {
        res.send("updated");
      }).catch(function (err) {
        console.log(err);
      });
});

app.delete("/articles/:articleTitle",function(req,res){
    Article.deleteOne({title:req.params.articleTitle }).then(function () {
        res.send("deleted");
      }).catch(function (err) {
        res.send(err);
      });
});

app.listen(3000, function() {
console. log("Server started on port 3000");
});
