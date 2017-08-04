var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  name:         {type: String, uppercase: true},
  dadLastName:  {type: String, uppercase: true},
  momLastName:  {type: String, uppercase: true},
  birthday:     {type: Date, default:Date.now},
  age:          {type: Number, min: 18, max: 99},
  membershipID: {type: String, default: "000"},
  momInfo:      {type: userSchema, default: null},
  dadInfo:      {type: userSchema, default: null}
);

mongoose.model('User', userSchema);
