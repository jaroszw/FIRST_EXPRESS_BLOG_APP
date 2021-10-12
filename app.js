const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const blogRoutes = require("./routes/blogRoutes");
// express app
const app = express();

const dbURI = -> // PLACE MONGODB URI HEREE;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // listen for requests
    app.listen(3000);
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//midlleware ^ static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
