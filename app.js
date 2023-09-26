//creating routing using express app
const express = require("express");
//for 3rd party middleware
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//creating express app
const app = express();
//for database connection string to mongodb
const dbUrl =
  "mongodb+srv://shraniksangat9:Shra9813@cluster0.pvj6teq.mongodb.net/node-blogs";
mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("server is running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");

//creating middleware
// app.use((req, res, next) => {
//   console.log("new request was made.");
//   console.log("Host:" + req.hostname);
//   console.log("Method:" + req.method);
//   console.log("Path:", req.path);
//   next();
// });
// app.use((req, res, next) => {
//   console.log("next middleware made.");
//   next();
// });

//creating middle ware using 3rd party middleware
app.use(morgan("dev"));

//middleware for static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// mongoose and mongo sandbox routes
//adding to datbase
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "new blog 2",
//     snippet: "about my new blog 2",
//     body: "more about my new blog 2",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //retrieving from database

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //retrieving single data by id
// app.get("/single-blog", (req, res) => {
//   Blog.findById("651064e1fb4dabcddd3cdb20")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//responding to the request
app.get("/", (req, res) => {
  // res.sendFile("./views/index.html", {
  // //   root: __dirname,
  // // });
  // const blogs = [
  //   {
  //     title: "Yoshi finds eggs",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "Mario finds stars",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  //   {
  //     title: "How to defeat bowser",
  //     snippet: "Lorem ipsum dolor sit amet consectetur",
  //   },
  // ];
  // res.render("index", {
  //   title: "Home",
  //   blogs,
  // });
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});
// //redirect
// app.get("/about-us", (req, res) => {
//   res.redirect("/about");
// });

app.use("/blogs", blogRoutes);

// making 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
  });
});
