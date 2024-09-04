// import { redirect } from "next/navigation.js";

// @ts-nocheck
const jwt = require("jsonwebtoken");
const Users = require("../Schema/user.ts");
const SECRET_KEY = process.env.JWT_SECRET;

function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
  return Date.now() >= payload.exp * 1000; // Check expiration
}

const middleware = async (req, res, next) => {
  const redirect = require("next/navigation.js")
  require("dotenv").config();
  console.log("arrived");
  console.log("arrived at middleware.", req.headers)
  // try {

  //   const token = req.cookies.token;
  //   console.log("this is token.", token)
  //   if (!token) {
  //     throw new Error();
  //   }

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.token = decoded;

  //   next();
  // } catch (err) {
  //   res.status(401).send("Please authenticate");
  // }

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, { complete: true }, (err, decoded) => {
      if (err) {
        console.log('Token is invalid or expired:', err.message);
        res.status(301);
      } else {
        console.log('Token is valid:', decoded);
        const address = decoded.payload.address;
        console.log(address)
        req.address = address
        next()
      }
    })
    // console.log("token", payload)
    if (token) {
      // const user = jwt.decode(token);
      // const isToken = await Users.findOne({ _id: user._id });
      // console.log(user)

      // req.user = isToken;
      next();
    } else {
      return res.status(200).send({ error: "invalid" });
    }
  } else {
    return res.status(200).send({ error: "invalid" });
  }
};

module.exports = middleware