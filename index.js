const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.static("public"));
app.set("view engine","ejs");
app.listen(PORT, function () {
    console.log("Server is running...");
})

app.get("/",function (req,res) {
    let title = "Home";
    res.render("home",
        {
            title: title,
        });
});

app.get("/blog",function (req,res) {
    let title = "Home";
    res.render("home",
        {
            title: title,
        });
});

app.get("/shop",function (req,res) {
    let title = "Home";
    res.render("home",
        {
            title: title,
        });
});

app.get("/blog/:id",function (req,res) {
    let title = "Home";
    res.render("home",
        {
            title: title,
        });
});