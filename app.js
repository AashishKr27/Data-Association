// Importing important modules
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Setting up express
const express = require('express');
const app = express();

// Setting up ejs and other middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Rendering the index page
app.get("/", (req, res) => {
    res.render("index");
});

// Rendering the index page
app.get("/login", (req, res) => {
    res.render("login");
});

// Rendering the profile page
app.get("/profile", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts");;
    res.render("profile", { user });
});

// Handling the likes
app.get("/like/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    post.likes.indexOf(req.user.userid) === -1 
        ? post.likes.push(req.user.userid)
        : post.likes.splice(post.likes.indexOf(req.user.userid), 1)
    await post.save();
    res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    res.render("edit", { post });
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
    res.redirect("/profile");
});

// Creating a post
app.post("/post", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let post = await postModel.create({
        user: user._id,
        content: req.body.content,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
});

// Creating a user
app.post("/register", async (req, res) => {
    let { username, name, age, email, password } = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User already exists");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash,
            });
            let token = jwt.sign({ email, userid: user._id }, 'secretkey');
            res.cookie("token", token);
            res.send(user);
        });
    })
})

// Creating a user
app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
            let token = jwt.sign({ email, userid: user._id }, 'secretkey');
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        } else {
            res.redirect("/login");
        }
    })
})

// Rendering logout page
app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

function isLoggedIn (req, res, next){
    if(req.cookies.token === "")  res.redirect("/login");
    else {
        let data = jwt.verify(req.cookies.token, "secretkey");
        req.user = data;
        next();
    }
}

app.listen(3000);