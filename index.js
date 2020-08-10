const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.listen(PORT, function () {
    console.log("Server is running...");
});
const fs = require("fs");
var article = fs.readFileSync("data/data-article.json","UTF-8");
article = JSON.parse(article);
articleRecentPost = slide(article,3);

var tagDict = new Map();
article.map(function (a) {
    a.tag.map(function (tag) {
        if(tagDict.has(tag)){
            tagDict.set(tag, tagDict.get(tag) + 1);
        } else {
            tagDict.set(tag, 1);
        }

    })
})
tagDict = sort_object(tagDict);

app.get("/",function (req,res) {
    let title = "Home";
    res.render("home",
        {
            title: title,
            tagDict: tagDict,
            articleRecentPost:articleRecentPost
        });
});

app.get("/booking",function (req,res) {
    let title = "Book An Appointment";
    res.render("pageBooking",
        {
            title: title,
            tagDict: tagDict,
            articleRecentPost:articleRecentPost

        });
});

app.get("/shopping",function (req,res) {
    let title = "Shopping";
    res.render("pageShop",
        {
            title: title,
            tagDict: tagDict,
            articleRecentPost:articleRecentPost
        });
});

app.get("/contact",function (req,res) {
    let title = "Contact Us";
    res.render("pageContact",
        {
            title: title,
            tagDict: tagDict,
            articleRecentPost:articleRecentPost
        });
});

app.get("/blog",function (req,res) {
    let title = "Blog";
    res.render("pageBlog",
        {
            article: article,
            title: title,
            tagDict: tagDict,
            articleRecentPost:articleRecentPost

        });
});

app.get("/blog/:id",function (req,res) {
    let ID = req.params.id;
    var currentArticle = article.filter(obj => {
        return obj.id == ID
    })
    let count = 0;
    article.map(function (e) {
        count++;
        if(e.id == ID) {
            res.render("pageArticle", {
                title: e.title,
                tagDict: tagDict,
                article:articleRecentPost,
                currentArticle: currentArticle
            });
            count = 0;
        }
    })
    if(count >= article.length){
        res.send("Not found")
    }
});

app.get("/archive/:tag",function (req,res) {
    let TAG = req.params.tag;

    var currentArticle = article.filter(obj => {
        for(var i=0;i<obj.tag.length;i++){
            if(obj.tag[i]==TAG){
                return obj.tag[i]== TAG
            }
        }
    })
    var num= tagDict.get(TAG)

    let count = 0;
    article.map(function (e) {
        count++;
        e.tag.map (function (tag) {
            if(tag === TAG) {
                res.render("pageArchive", {
                    title:" tag #" +tag,
                    tagDict: tagDict,
                    article:articleRecentPost,
                    currentArticle: currentArticle,
                    num: num
                });
                count = 0;
            }
        })
    })
    if(count >= article.length){
        res.send("Not found")
    }
});

app.get("/archive/:time",function (req,res) {
    let TIME = req.params.time;
    var currentArticle = article.filter(obj => {
        return obj.time == TIME
    })
    console.log("currentArticle", currentArticle);

    let count = 0;
    currentArticle.map(function (e) {
        count++;
        if(e.time == TIME) {
            res.render("pageArchive", {
                title: e.title,
                tagDict: tagDict,
                article:articleRecentPost,
                currentArticle: currentArticle
            });
            count = 0;
        }
    })
    if(count >= currentArticle.length){
        res.send("Not found")
    }
})

function compareValues(key, order = "ascending") {
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
            (order === "descending") ? (comparison * -1) : comparison
        );
    };
}

function slide(ary,num) {
    return ary.sort(compareValues("time","descending")).slice(0,num)
}

function sort_object(obj) {
    items = []
    obj.forEach(function(value, key, map) {
        items.push([key, value]);
    });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    sorted_obj= new Map()
    items.forEach(function(v) {
        use_key = v[0]
        use_value = v[1]
        sorted_obj.set(use_key, use_value)
    })
    return(sorted_obj)
}
