const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
dotenv.config();


//dbconfig
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(()=>console.log("DB Connected!!"))

mongoose.connection.on("error", err=>{
    console.log(`DB Connection error : ${err.message}`);
})

// bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//middleware
app.use(morgan("dev"));
//app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());
app.use(expressValidator());
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.get("/", (req, res)=>{
    fs.readFile("docs/apiDocs.json", (err, data)=>{
      if(err)
      return res.status(400).json({
        error : err
      });
      const docs = JSON.parse(data);
      res.json(docs);
    })
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error : "Unauthorised!"});
    }
  });

const port=process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`Working on port : ${port}`);
});