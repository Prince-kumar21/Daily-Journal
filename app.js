//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "The gentle breeze whispered through the trees, rustling the leaves in a soothing melody. A meandering river flowed gracefully through the picturesque meadows, reflecting the vibrant hues of the blooming flowers. The scent of fresh earth mingled with the fragrance of wildflowers, creating an enchanting aroma. In the distance, majestic mountains stood tall, their peaks adorned with glistening snow. A diverse array of wildlife roamed freely, harmoniously coexisting in this pristine environment. As the day progressed, the sky transformed into a canvas of mesmerizing colors, painting a breathtaking sunset. The symphony of nature's beauty was a reminder of the wonders that surround us.";
const aboutContent =
  "Our company, XYZ Enterprises, was founded with a vision to revolutionize the industry and provide innovative solutions to our clients. With a team of highly skilled professionals, we strive to deliver exceptional products and services that exceed expectations. Our commitment to quality and customer satisfaction drives us to continually improve and adapt to the ever-changing market demands. We value transparency, integrity, and teamwork, fostering a collaborative environment where ideas flourish. Our dedication to continuous learning and growth empowers us to stay at the forefront of technology advancements. Trust us to be your partner in success and experience excellence in every interaction with our company.";
const contactContent =
  "To contact us, please use the provided information or fill out the contact form. We look forward to hearing from you and will respond promptly.";

const app = express();

let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});



app.post("/compose", function (req, res) {
  const post = {
    postTitle: req.body.title,
    content: req.body.postText,
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postID", (req, res) => {
  const requestedTitle =  _.lowerCase(req.params.postID);
 
  posts.forEach(function (post) {
    const storedTitle =  _.lowerCase(post.postTitle);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        post1Title: post.postTitle,
        post1Content: post.content
      })
    } 
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
