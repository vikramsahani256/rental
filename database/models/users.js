
const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");

const schema = new Schema({

  fullName : {
    type: String,
    required: true,
  } ,
    
  email: {
        type: String,
        required: true,
        unique   : true ,
        validate: {
            validator: value => validator.isEmail(value) ,
            message: 'Invalid email',
        },
  },

  isActive : {
        type: Boolean,
        required: false,
        default : true
    },

  password : {
      type: String,
      required: true,
    } ,

  accessToken : {
      type: String,
      required: true,
    }

}
, {
    timestamps: true
});

const users = mongoose.models.users || mongoose.model("users", schema);


module.exports = users ;