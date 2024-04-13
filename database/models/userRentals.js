
const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");

const schema = new Schema({

    
  user_email : {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isEmail(value) ,
            message: 'Invalid email',
        },
  },

  rental_item : {
        type: String,
        required: true,
    },

  amount : {
    type: Number,
    required: true,
  },

  location : {
    type: String,
    required: false,
},

pick_up_date : {
  type: String,
  required: true,
},

return_date : {
  type: String,
  required: true,
},

}
, {
    timestamps: true
});

const userRentals = mongoose.models.userRentals || mongoose.model("userRentals", schema);


module.exports = userRentals ;