const express = require('express')
var mongo = require('mongodb')
var MongoClient = require('mongodb').MongoClient

const app = express()
const PORT = 3000
const server = app.listen(PORT, function(){
    const host = 'localhost'
    // const host = server.address().address
    const port = server.address().port
    console.log('Listening on http://%s:%s',host,port)
})

app.get('/', function(req,res){
    // console.log('Get Running')
    res.send('Hello, Matt!')
})
const url = "mongodb://localhost:27017"
MongoClient.connect(url,
    function (err, db) {
      if (err) throw err
      console.log()
      console.log("Database connected!")
      console.log()
      
    // Initialise Database to connect to. **
    const dbTest = 'test_db'
      var test_db = db.db(dbTest)
      const dbTestCustomers = 'test_customers'
      var test_customers = db.db(dbTestCustomers)
    //Log Database Details
    //   console.log(test_db)

    const students_collection = 'students'
    const customers_collection = 'test_customers'

    const mongoose = require('mongoose');
    const mongoURI = 'mongodb://localhost:27017/' + dbTest
    const conn = mongoose.createConnection(mongoURI);
    const state = conn.on('open', function () {
        conn.db.listCollections().toArray(function (err, data) {
          if (err) {
            console.log(err);
            return;
          }
            console.log(data.length);
            console.log(data);
            
            let fileData = []
            if (data.length >0) {
                console.log('Collections Exits in Database');
                for (let index = 0; index < data.length; index++) {
                    element = data[index].name;
                    fileData.push(element)
                }
                console.log(fileData);
            }
            conn.close();
            var isIn = fileData.includes('gamers')
            console.log(isIn)
        });
    });

  
    
    // console.log(state);
    

    // Data to be written into Mondo DB Instance
      const objFile = {"name": "James", "marks": 900}
    
    // writes the document in MongoDB
    //   test_db.collection("camops").insertOne(
    //     objFile, function(err, res) {
    //       if (err) throw err
    //       console.log("1 Doc Inserted")
    //       db.close()
    //     }
    //   )

    
        // Find all documents in a  collection **students**
        var result = test_db.collection("students").find({})
    if (result.ns === dbTest+"."+students_collection) {
        console.log('Logging from Students Collections\n')
        result.forEach(row => {
            console.log();
            console.log(row)
            console.log();
        })
    } else {
        console.log('No Records in Collection')
    }
    

    // // Logs all documents in the collection
    // console.log('Logging from Students Collection')
    //   result.forEach(row => {
    //     console.log(row)
    //   })

      var myobj = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
      ]

    // test_customers.collection("test_customers").insertMany(myobj, function(err, res){
    //     if (err) throw err

    //     console.log('Number of Documents inserted is :', res.insertedCount)
    //     db.close()  
    // })
    
    // Find all documents in a  collection **customers**
   
    var result = test_customers.collection(customers_collection).find()
    // console.log(result);
    
    // Logs all documents in the collection
    if (result.ns === dbTestCustomers+"."+customers_collection) {
        console.log('Logging from Test Customers Collections\n')
        result.forEach(row => {
            console.log(row)
        })
    } else {
        console.log('No Records in Collection')
    }

    // test_customers.collection("test_customers").drop(function(err, delOK) {
    //     if (err) {
    //         console.log('\n\nCollection Deleted : Not Available\n\n',err.errmsg,':',err.codeName)
    //     }
    //     // throw err
    //     if (delOK) console.log("Collection deleted")
    //     db.close()
    //   })
    })
