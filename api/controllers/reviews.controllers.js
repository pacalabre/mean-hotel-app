var mongoose = require('mongoose');
var Hotel= mongoose.model('Hotel');


//GET all reviews for a hotel
module.exports.reviewsGetAll = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log("GET hotelId ", hotelId);

   Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
      console.log("returned doc", doc);
      res
      .status(200)
      .json(doc.reviews);
    });
}

//GET a single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  console.log("GET reviewId" + reviewId + "for hotelId " + hotelId);

   Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
      console.log("returned doc", hotel);
      var review = hotel.reviews.id(reviewId);
      res
      .status(200)
      .json(review);
    });
}

var _addReview = function(req, res, hotel) {
  hotel.reviews.push({
    name : req.body.name,
    rating : parseInt(req.body.rating, 10),
    review : req.body.review
  });

  hotel.save(function(err, hotelUpdate) {
    if(err) {
      res
        .status(500)
        .json(err)
    } else {
      res
        .status(201)
        .json(hotelUpdate.reviews[hotelUpdate.reviews.length -1]);
    }
  });
}


module.exports.reviewsAddOne = function(req, res) {
  var hotelId = req.params.hotelId;

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
    if(err){
      console.log("error finding hotel");
      response.status = 500;
      response.message = err;
    } else if(!doc) {
      console.log("hotel id not found");
      response.status = 404;
      response.message = {
        "message" : "Hotel ID not found"
      };
    }
    if(doc) {
      _addReview(req, res, doc);
    } else {
      res
        .status(response.status)
        .json(response.message);
    }
  })
}

var _splitArray = function(input){
  var output;
  if(input && input.length > 0){
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
}

module.exports.reviewsUpdateOne = function(req, res) {
var hotelId = req.params.hotelId;

  Hotel
    .findById(hotelId)
    .select("reviews")
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc
      };
      if(err) {
      console.log("error finding hotel");
      response.status = 500;
      response.message = err;
    } else if(!doc){
        response.status = 404;
        response.message = ({
          "message" : "Hotel ID not found."
        });
    }
    if(response.status !== 200) {
      res
        .status(response.status)
        .json(response.message);
    } else {
      doc.name = req.body.name;
      doc.description = req.body.description;
      doc.stars = parseInt(req.body.stars, 10);
      doc.services = _splitArray(req.body.services);
      doc.photos =  _splitArray(req.body.photos);
      doc.currency = req.body.currency;
      doc.reviews = {
        name : req.body.name,
        rating: parseInt(req.body.rating),
        review: req.body.review
      }
      doc.location = {
        address : req.body.address,
        coordinates : [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)
        ]
      };
      doc.save(function(err, reviewUpdated){
        if(err) {
          res
            .status(500)
            .json(err);
        } else {
          res
            .status(204)
            .json();
        }
      });
    }
  });
}
