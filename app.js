const dotenv = require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const request = require("request");

const mongoose = require("mongoose");

const nodemailer = require("nodemailer");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

secret = process.env["SESSION_SECRET"];

app.use(express.json());

app.use(
  session({
    secret: secret, //env here
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env["MONGODB_CLOUD_LINK"]);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Inject User

// const user = new User({
//   username: "test",
//   password: "test",
// });

// user.save();

// start routing for pages

app.get("/", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("home", { authHeader: "true", authFooter: "true" });
  } else {
    res.render("home", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

app.get("/home", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("home", { authHeader: "true", authFooter: "true" });
  } else {
    res.render("home", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

app.get("/sign-in", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("sign-in", { authHeader: "true", authFooter: "true" });
  } else {
    res.render("sign-in", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

app.post("/sign-in", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/sign-in");
    } else {
      passport.authenticate("local", { failureRedirect: "/sign-in" })(
        req,
        res,
        function () {
          res.redirect("/home");
        }
      );
    }
  });
});

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/sign-in");
  });
});

// app.get("/register", function (req, res) {
//   res.render("register");
// });

// app.post("/register", function (req, res) {
//   User.register(
//     { username: req.body.username },
//     req.body.password,
//     function (err, user) {
//       if (err) {
//         console.log(err);
//         res.redirect("/register");
//       } else {
//         passport.authenticate("local")(req, res, function () {
//           res.redirect("/");
//         });
//       }
//     }
//   );
// });

app.get("/samples", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("samples", { authHeader: "true", authFooter: "true" });
  } else {
    res.render("samples", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

app.get("/programming", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("programming");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/monthly-promo-packs", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("monthly-promo-packs");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/featured-resource", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("featured-resource");
  } else {
    res.redirect("/sign-in");
  }
});

app.post("/featured-resource", function (req, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env["NODE_EMAIL"], //env here
      pass: process.env["NODE_EMAIL_PASSWORD"], //env here
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env["NODE_EMAIL"], //env here
    subject: `LBM: ${req.body.radioStation} is requesting the Featured Resource`,
    text: `${req.body.firstName} ${req.body.lastName} at ${req.body.email} would like ${req.body.quantity} of the featured resource`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("email sent: " + info.response);
      res.send("success");
    }
  });
});

app.get("/marketing-resources-IFLC", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("marketing-resources-IFLC");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/marketing-resources-LIFETRAC", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("marketing-resources-LIFETRAC");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/marketing-resources-PAWS", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("marketing-resources-PAWS");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/contact", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("contact", { authHeader: "true", authFooter: "true" });
  } else {
    res.render("contact", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

// FAQ section

app.get("/FAQ", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/what-is-livingbridge", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/what-is-livingbridge");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/what-amb-os", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/what-amb-os");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/ftp-instructions", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/ftp-instructions");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/promo-packs", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/promo-packs");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/featured-resources", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/featured-resources");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/when-swindoll-visiting-my-area", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/when-swindoll-visiting-my-area");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/promos", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/promos");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/loop-email", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/loop-email");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/customized-web-banner", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/customized-web-banner");
  } else {
    res.redirect("/sign-in");
  }
});

app.get("/FAQ-answers/can-someone-sponsor-insight-living", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("FAQ-answers/can-someone-sponsor-insight-living");
  } else {
    res.redirect("/sign-in");
  }
});

// end routing for pages

// start posting

// contact form

app.post("/contact", function (req, res) {
  if (
    req.body.captcha === undefined ||
    req.body.captcha === "" ||
    req.body.captcha === null
  ) {
    return res.json({ "success:": false, message: "Please complete captcha" });
  }

  // Secret Key
  const secretKey = process.env["CAPTCHA_SERVER_KEY"]; //env here

  // Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.socket.remoteAddress}`;

  // Make Request To Verify URL
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    // If not successful
    if (body.success !== undefined && !body.success) {
      return res.json({
        "success:": false,
        message: "Failed captcha verification",
      });
    }
    // If successful

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env["NODE_EMAIL"], //env here
        pass: process.env["NODE_EMAIL_PASSWORD"], //env here
      },
    });

    const mailOptions = {
      from: req.body.email,
      to: process.env["NODE_EMAIL"], //env here
      subject: `LBM: ${req.body.username} at ${req.body.email}: ${req.body.subject}`,
      text: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent: " + info.response);
        res.send("success");
      }
    });

    return res.json({ "success:": true, message: "Email Sent" });
  });
});

// end posting

app.all("*", (req, res) => {
  if (req.isAuthenticated()) {
    res
      .status(404)
      .render("404page", { authHeader: "true", authFooter: "true" });
  } else {
    res.status(404).render("404page", {
      authHeader: "false",
      authFooter: "false",
    });
  }
});

const PORT = 3000;

app.listen(PORT, function () {
  console.log("server is running on port: " + PORT);
});
