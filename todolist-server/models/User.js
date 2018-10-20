const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password:{
    type: String,
  },
});

// 몽구스에서는 모델에 새로운 기능을 추가할 수 있다.
// static으로 만들어야된다. 유저가 만들어지기 전이기 때문에

// 여기서는 람다 금지
User.statics.signUp = async function(data){

};

module.exports = mongoose.model("User", User);