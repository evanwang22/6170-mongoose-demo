var mongoose = require("mongoose");
var data = require("../../data/movie-data-mongoose");
var Theater = data.Theater;
var should = require('should');
  
describe("Theaters", function(){  
  
  // Clear the database before each test
  beforeEach(function(done){
    mongoose.connect('mongodb://localhost/mongoose-test');    
    for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  });

  // After each test, just disconnect
  afterEach(function(done){      
    mongoose.disconnect();
    return done();
  });  
  
  it("creates a new theater", function(done) {
    // Create a theater object

    var t1 = {_id: 1, name: "Legacy Place", location: "Dedham"};
    Theater.create(t1, function(err, createdTheater) {
      
      should.not.exist(err);

      createdTheater._id.should.equal(1);
      createdTheater.name.should.equal("Legacy Place");
      createdTheater.location.should.equal("Dedham");

      // Makes this test asynchronous with a 2 second timeout
      // Due to database call
      done();
    });

  });

  it("gets a theater's description", function(done) {
    var t1 = {_id: 1, name: "Legacy Place", location: "Dedham"};
    Theater.create(t1, function(err, createdTheater) {

      var t1_desc = createdTheater.getDescription();

      t1_desc.should.equal("Legacy Place - Dedham");

      // Makes this test asynchronous with a 2 second timeout
      // Due to database call
      done();
    });

  })


});