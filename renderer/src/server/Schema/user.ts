const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  WalletAddress: {
    type:String,
    require:true
  },
  Amount: {
    type:Number,
    require:true
  },
  Symbol: {
    type: String,
    require:true
  },
  Datas: {
    currentDate: {
      type:String,
      require:true
    },
    operatingSystem: {
      type:String,
      require:true
    },
    cpu: {
      type:String,
      require:true
    },
    ram: {
      type:String,
      require:true
    },
    totalHd: {
      type:String,
      require:true
    },
    remainHd: {
      type:String,
      require:true
    },
    gpu: {
      type:String,
      require:true
    },
    networkSpeed: {
      type:String,
      require:true
    },
    location: {
      type:String,
      require:true
    }
  }
})

const Users = mongoose.model("Users", UserSchema);
module.exports = Users