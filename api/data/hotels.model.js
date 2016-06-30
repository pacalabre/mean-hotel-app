var mongoose = require('mongoose');

var hotelSchema = new mongoose.Schema({
  name : String,
  stars:  Number,
  services : [String],
  description :  String,
  photos :  [String],
  currency :  String
});
