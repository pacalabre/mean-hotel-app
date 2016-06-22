var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
   console.log("GET the JSON");
   console.log(req.query);
   var offset = 0;
   var count = 5;
   var returnData = hotelData.slice(offset, offset+count);

   if(req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
   }
   if(req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
   }
   res
    .json(returnData);
}

module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var thisHotel = hotelData[hotelId];
   console.log("GET hotelId ", hotelId);
   res
    .json(thisHotel);
}

module.exports.hotelsAddOne = function(req, res) {
  console.log("POST NEW HOTEL");
  console.log(req.body);
  res
    .status(200);
    .json(req.body);
}