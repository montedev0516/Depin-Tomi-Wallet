// @ts-nocheck
const express = require("express");
const Users = require("../../Schema/user.ts");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const authMiddleware = require("../../middleware/auth.js");
const router = express.Router();

router.post("/", async (req, res) => {
  const { address, amount, symbol } = req.body;
  console.log(address,req.body);
  if (!address ) return res.status(422).send({ error: "invalid input" ,address:address});
  // console.log("accept auth");
  let userData;
  await Users.findOne({ WalletAddress: address }).then((user) => {
    // console.log("check user",user)
    if (user) {
      userData = user;
      Users.updateOne(
        { WalletAddress: address }, 
        { $set: { Amount: amount, Symbol: symbol } } 
      );
      // console.log("There is this user already in database.", user.WalletAddress);
    } else {
      // console.log("no User")
      const new_User = new Users({
        WalletAddress: address,
        Amount: 0,
        Symbol: "",
      });
      new_User.save().then((user) => {
        if (!user.WalletAddress)
          res
            .status(402)
            .send({ message: "Registration failed. Please try again." });
        else {
          userData = user;
        }
      });
    }
  });
  console.log(userData);
  const tokenData = {
    _id: userData._id?.toString(),
    address: userData.WalletAddress,
  };
  console.log("secret",process.env.JWT_SECRET)
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: "1 days",
  });

  console.log(token);
  res.status(200).send({token:token});
});

module.exports = router;
