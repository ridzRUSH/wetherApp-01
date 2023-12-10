const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const PORT = process.env.PORT || 3000;

const app = express();

// defining the path to the viiew dir
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// setup static web page
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Main",
    message: "this is dynamic content",
    name: "Adarsh",
  });
});

// app.use("/help", express.static(path.join(publicDirectoryPath, "/help.html")));

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Adarsh",
    title: "help",
  });
});

// app.use(
//   "/about",
//   express.static(path.join(publicDirectoryPath, "/about.html"))
// );
app.get("/about", (req, res) => {
  res.render("about", {
    name: "adarsh",
    title: "about",
  });
});
app.get("/weather", (req, res) => {
  // console.log(req.query);
  if (!req.query.name) {
    return res.send({
      error: "please enter a search field",
    });
  }
  geocode(req.query.name, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({
          error,
        });
      }
      // console.log(data);S`C
      res.send({ data: data, location: location });
    });
  });
});
// app.com ---> root url
// app.com/help
// app.com/about

app.get("/help/*", (req, res) => {
  // res.send("help article is not found");
  res.render("genericError", {
    title: "SomeThing Went Wrong",
    name: "adarsh",
    msg: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  // res.send("opps ! 404 Someting went Wrong");
  res.render("genericError", {
    title: "oops!",
    name: "adarsh",
    msg: "404 Error Page Not Found",
  });
});

// run app on this specific ports
app.listen(PORT, () => {
  console.log("server is up on port 3000");
});
``;
