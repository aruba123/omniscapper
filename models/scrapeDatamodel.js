var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema with the Object Constructor Schema 

var ScrapedDataSchema = new Schema({



  title: {
      type:String

  },

  link: {
      type:String

  },

  // Let The Schema take an array "notes" which consists of array 
// `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the NOTE model
  // This allows us to populate the Notes with any associated Comments
  notes: [{

    type: Schema.Types.ObjectId,
    ref:'Note'

  }]

  });
// Create a model for export
//This creates our model from the above schema, using mongoose's model method
  var ScrapedData = mongoose.model('ScrapedData' , ScrapedDataSchema);

  module.exports = ScrapedData;
