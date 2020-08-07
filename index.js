const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.listen(PORT, function () {
    console.log("Server is running...");
})
const fs = require("fs");
var article = fs.readFileSync("data/data-article.json","UTF-8");
article = JSON.parse(article);


app.get("/",function (req,res) {
    let title = "Home";
    article = slide(article,3);
    res.render("home",
        {
            title: title,
            article:article
        });
});

app.get("/booking",function (req,res) {
    let title = "Book An Appoinment";
    article = slide(article,3);
    res.render("pageBooking",
        {
            title: title,
            article:article

        });
});


app.get("/shopping",function (req,res) {
    let title = "Shopping";
    article = slide(article,3);
    res.render("pageShop",
        {
            title: title,
            article:article
        });
});

app.get("/blog",function (req,res) {
    let title = "Blog";
    article = slide(article,3);
    res.render("pageBlog",
        {
            title: title,
            article:article

        });
});

app.get("/contact",function (req,res) {
    let title = "Contact Us";
    article = slide(article,3);
    res.render("pageContact",
        {
            title: title,
            article:article
        });
});

app.get("/blog/:id",function (req,res) {
    let ID = req.params.id;
    let article = fs.readFileSync("data/data-article.json","UTF-8");
    article = JSON.parse(article);
    articleNew = slide(article,3);
    let count = 0;
    article.map(function (e) {
        count++;
        if(e.id == ID) {
            res.render("pageArticle", {
                title: e.title,
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

function compareValues(key, order = 'tang_dan') {
    return function innerSort(a, b) {
        const obj_to_compare_A = a[key];
        const obj_to_compare_B = b[key];

        let comparison = 0;
        if (obj_to_compare_A > obj_to_compare_B) {
            comparison = 1;
        } else if (obj_to_compare_A < obj_to_compare_B) {
            comparison = -1;
        }
        return (
            (order === 'giam_dan') ? (comparison * -1) : comparison
        );
    };
}

function slide(ary,num) {
    // ary = ary.reverse()
    return ary.slice(ary.length-num,ary.length).sort(compareValues('id','giam_dan'))
}



function tag(ary) {

}