const mongoose = require("mongoose");
const User = require("../models/usermodel");

const databaseUrl = "mongodb://127.0.0.1:27017/AI";
  const main = async () => {
      await mongoose.connect(databaseUrl);
  }
  main()
  .then(()=>[console.log("database server connected")])
  .catch((err)=>{console.log(err)});


  const user1 = {email:"agoel2992@gmail.com"};
  const newuser = new User(user1);
  newuser.save();