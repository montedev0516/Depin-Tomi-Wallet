// @ts-nocheck

// import hash from "bcrypt";
// import logger from 'morgan';
// import cookieParser from 'cookie-parser';

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:8888', // Specify the allowed origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/Tomi-Depin", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // dbName: 'Tomi-User',
  })
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log(`Error connecting to MongoDB:${err}`));

const api = require("./api/index.ts");
app.use("/api", api);

// const passport = require("passport")
// const JwtCookieComboStrategy = require('passport-jwt-cookiecombo')
//load usserRouter
// const userRouter = require('./routes/api/user')

//load middleware
// const Auth = require("./middleware/auth")

// app.use(passport.initialize());

// const api = require("./api/index");
// app.use('/api', api);

// passport.use(new JwtCookieComboStrategy({
//   secretOrPublicKey: 'StRoNGs3crE7'
// }, (payload: { user: any; }, done: (arg0: null, arg1: any) => any) => {
//   return done(null, payload.user);
// }));

//api
// app.get('/', (req:Request, res:Response) => {
//   res.status(200).json({msg:"okay"});
// })
// //api middleware test
// app.get("*", Auth, (req:Request, res:Response) => {
//   res.status(200).json({msg:"Passed!"});

// })

app.listen(port, () => {
  console.log(`Server is running on ${port} port.`);
});

app.get("/test", (req, res) => {
  res.send({ message: "hello" });
});
module.exports = app;
