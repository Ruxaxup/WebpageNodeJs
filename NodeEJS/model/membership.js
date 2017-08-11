var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var userSchema = require('user')

var membershipSchema = new Schema({
  memberId      : {type: String, required: true},
  user          : {type: Schema.Types.ObjectId, ref: 'User'},
  startDate     : {type: Date, required: true},
  expiringDate  : {type: Date, required: true},
  type          : {type: String,
                    enum :[
                      'A',
                      'B',
                      'C'
                    ],
                    default:'A' }
});

module.exports = mongoose.model('Membership', membershipSchema);
