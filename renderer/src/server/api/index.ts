const express = require('express')
const path = require("path")
const router = express.Router()
const auth = require("./routes/auth.ts")
const check = require("./routes/check.ts")

router.use("/auth", auth)
router.use("/check", check)


module.exports = router