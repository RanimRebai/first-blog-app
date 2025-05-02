import bodyParser from "body-parser";
import express from "express";

const app=express();
const port = 3000;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let posts = [];


app.get("/",(req,res)=>{
    res.render("index",{
        posts : posts
    });
});

app.get("/post",(req,res)=>{
    res.render("postPage");
    
});
app.get("/del", (req, res) => {
    const n = parseInt(req.query.index);
    if (!isNaN(n) && n >= 0 && n < posts.length) {
        posts.splice(n, 1);
    }
    res.redirect("/");
});


app.post("/submit",(req,res)=>{
    const {title , object , description} = req.body;
    posts.push({title , object , description});
    res.render("ValidPage");
})

app.get("/edit",(req,res)=>{
    const n = parseInt(req.query.index);
    const post = posts[n];
    res.render("edit",{title:post.title,
        object: post.object,
        description:post.description,
        index:n
    })
});

app.post("/submitEdit",(req,res)=>{
    const n = parseInt(req.body.index);
    const editedPost = {
        title: req.body.title,
        object: req.body.object,
        description: req.body.description
    };
    posts[n] = editedPost;
    res.render("index",{posts:posts});
})


app.listen(port ,()=>{
    console.log(`server launched at port ${port}`);
})