// @ts-nocheck
const express = require("express");
const Users = require("../../Schema/user.ts");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const middleware = require("../../middleware/auth.js");
const router = express.Router();

router.get("/skip",middleware, async(req, res) => {
  const address = req.address;
  console.log(req.address)
  if (!address ) return res.status(422).send({ error: "invalid input" });
  let userData;
  await Users.findOne({ WalletAddress: address }).then((user) => {
    // console.log("check user",user)
    const comData = user.Datas;
    if(!comData.currentDate || !operatingSystem || !cpu || !ram  || !totalHd || !remainHd || !gpu || !networkSpeed || !location) {
      console.log("nodata");
      res.status(302);
    }
    else res.status(200).send({comData:comData})
  });
});


module.exports = router;
