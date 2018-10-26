const _ = require("lodash");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt')
const saltRounds = 10;

const {
  ClientError,
} = require("../error");

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

User.statics.findOneByEmail = async function(email){
  // return User.findOne({
  // User 대신 this로 사용해야 한다.
  return this.findOne({
    email
  }).exec();
};

// Mongoose 에서는 model에 새로운 기능을 추가할 수 있습니다.
// signUp
// User.signUp: static method
// user.signUp: instance method
// static으로 만들어야된다. 유저가 만들어지기 전이기 때문에

// 여기서는 람다 금지
User.statics.signUp = async function(data){

  const{
    email,
    password,
  } = data;

  const exist = await this.findOneByEmail(email);

  if (!_.isNil(exist)) {
    throw new ClientError("Already exist email")
  }

  const passwordHash = await bcrypt.hash(password,saltRounds);
  
  // new User()로 하면 안됨!! 주의
  const user = new this({
    ...data,
    password: passwordHash,
  });

  await user.save();

  const ret = user.toObject();
  delete ret.password;

  return ret;
};

User.methods.verifyPassword = async function(password){
  return bcrypt.compare(password, user.password)
};

User.statics.signIn = async function(data){
  const{
    email,
    password,
  }= data;

  const user = await this.findOneByEmail(email);

  if (_.isNil(user)) {
      throw new NotFoundError("User not found");
  }

  const verified = await user.verifyPassword(password);
  // 여기서는 this가 아닌 user
  // User.methods에 추가했기 때문에 (?)

  if (!verified) {
      throw new ClientError("Invalid password");
  }

  return user.generateToken();
}

User.methods.generateToken = function () {
  return jwt.sign({
    data: {
      user: this._id,
    }
  }, jwtSecret, {
    expiresIn: '3h'
  });
}

module.exports = mongoose.model("User", User);