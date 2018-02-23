var express = require('express');
var router = express.Router();
var app = express();




/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//scrape data and save to database
// Making a request to Nigeriaworld newspaper. The page's HTML is passed as the callback's third argument
app.get('/scrape', function (req, res) {
  request('http://www.nigeriaworld.com/', function (error, response, html) {


    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'

    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var result = [];


    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)

    $("title").each(function (i, element) {

      // Save the text of the element in a "title" variable
      var title = $(this).text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have

      var link = $(element).children().attr('href');

      if (title && link) {
        var newScapedData = new ScrapeData({
          title: title,
          link: link
        })

        // Save these results in an object that we'll push into the results array we defined earlier

        // mongoose save data


        newScrapedData.save(function (err, doc) {
          if (err) {

            console.log(err) // res.send(err)

          } else {

            console.log(doc) // res.send(doc)


          }


        });
      }

    });

  });

  res.send("scrapped saved");

})

// get data from the database

// Route for getting all Items  from the db
app.get('/getItems', function (req, res) {
  // mongoose find data
  // Using our Note model, "find" every Item  in our db
  var newScapedData = new
  ScrapedData.find({}, function (err, dbResults) {

    // If an error occurs, send it back to the user   
    if (err) {

      res.send(err)
    } else {

      // If any Items are found, send them to the user
      res.send(dbResults);
    }

  });
});


// Route to see what Item looks like WITH populating
app.get("/populated", function (req, res) {
  // Using our Item model, "find" every Item in our db and populate them with any associated notes
  db.Library.find({})
    // Specify that we want to populate the retrieved Items with any associated notes
    .populate("notes")

  // If an error occurs, send it back to the user   
  if (err) {

    res.send(err)
  } else {

    // If any Items are found, send them to the user
    res.send(dbResults);
  }

});





// delete all data from the database

app.get('/deleteAll', function (req, res) {

  //mongoose removess data from ScrapedData and Note Collections

  ScrapedData.remove({}, function (err, dbResults) {

    if (err) {
      res.send(err)


    } else {
      res.send(dbResults)
    }


  })


});


//delete an Item from the database

app.get("/delete/:id", function (req, res) {

  var id = req.params.id;
  console.log(req.params.id)

  ScrapedData.remove({
    _id: id
  }, function (err, dbResults) {

    if (err) {
      res.send(err);
    } else {
      res.send(dbResults)
    }
  });


});
// POST route for saving a new Note to the db and associating it with an Item 
app.post('/submit/:id', function (req, res) {

  var newNote = new Note(req.body);
  var id = req.params,
    id;

  //Save the new note
  // If a Note was created successfully, find one Item and push the new Note's _id to the Item `notes` array
  // { new: true } tells the query that we want it to return the updated Item  -- it returns the original by default


  newNote.save(function (err, doc) {
    if (err) {
      res.send(err);
    } else {

    }

    //find the scraped data item and push the new note id into the Item

    ScapedData.findOneAndUpdate({
      _id: id
    }, { $push: {  'notes': doc._id } }, { new: true });
    if (err) {
      res.send(err);

    } else {
      console.log(doc) // res.send(doc)
    }
  });
});


module.exports = router;