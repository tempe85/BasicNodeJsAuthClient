"use strict";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require("express");
const { auth } = require("express-openid-connect");
require("dotenv").config();

let app = express();
app.use(
  auth({
    authorizationParams: {
      response_type: "code",
      audience: "https://bestsellerauthentication.azurewebsites.net/",
      scope:
        "openid profile bestSeller.fullaccess IdentityServerApi roles user_data",
      clientSecret: process.env.CLIENT_SECRET,
    },
  })
);

// App settings
app.set("view engine", "pug");

// App middleware
app.use("/static", express.static("static"));

// App routes
app.get("/", async (req, res) => {
  //this will log out the token along with the entire response body, will need to figure out how to actually use it
  console.log("res", res);
  res.render("index");
  // let { token_type, access_token } = req.oidc.accessToken;
  // // const products = await request.get("https://api.example.com/products", {
  // //   headers: {
  // //     Authorization: `${token_type} ${access_token}`,
  // //   },
  // // });
  // // res.send(`Products: ${products}`);
});

app.get("/callback", (req, res) => {
  console.log(res);
  res.render("index");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/logout", (req, res) => {
  res.redirect("/");
});

app.set("trust proxy", true);
app.listen(3000, () => console.log("listening at http://localhost:3000"));
