const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.listen(PORT, function () {
    console.log("Server is running...");
})
const fs = require("fs");


app.get("/",function (req,res) {
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    let title = "Home";
    article = orangize(article,3);
    res.render("home",
        {
            title: title,
            article:article
        });
});

app.get("/booking",function (req,res) {
    let title = "Book An Appoinment";
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    article = orangize(article,3);
    res.render("pageBooking",
        {
            title: title,
            article:article

        });
});


app.get("/shopping",function (req,res) {
    let title = "Shopping";
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    article = orangize(article,3);
    res.render("pageShop",
        {
            title: title,
            article:article
        });
});

app.get("/blog",function (req,res) {
    let title = "Blog";
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    article = orangize(article,3);
    res.render("pageBlog",
        {
            title: title,
            article:article

        });
});

app.get("/contact",function (req,res) {
    let title = "Contact Us";
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    article = orangize(article,3);
    res.render("pageContact",
        {
            title: title,
            article:article
        });
});

app.get("/blog/:id",function (req,res) {
    let title = "Article";
    let ID = req.params.id;

    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    articleNew = orangize(article,3);

    let count = 0;
    article.map(function (e) {
        count++;
        if(e.id == ID) {
            res.render("pageArticle", {
                cat: e,
                article:articleNew
            });
            count = 0;
        }
    })
    if(count >= article.length){
        res.send("Not found")
    }

});
function orangize(ary,num) {
    ary = ary.reverse()
    return ary.slice(0,num)
}

function tag(ary) {

}