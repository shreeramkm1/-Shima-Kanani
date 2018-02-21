
var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'blood_database'
});


var app = express();

var port = 8082;

var router = express.Router();

var userID = 111;


 //function to generate appoitnment ID's
  var appID = 4000; //hard-code to the last existing ID
  



// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});


connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

//general thing
router.get("/",function(req,res){
  // test route to make sure everything is working (accessed at GET http://localhost:8081/)
  console.log(req);
  res.json({ message: 'Welcome to our Blood Database API!' });
});

//get login info
router.get("/login/:email/:password",function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  var email = req.params.email;
  var password = req.params.password;
  
  connection.query(
    'SELECT userID, email, donorPassword FROM Donor WHERE email=? AND donorPassword=?',[ email, password ],  
      function(err, rows, fields) {
        
        
        if (!err) {
          if(rows.length == 0){
            res.json("ERROR");
            console.log('no userID');
          }else{
            userID = rows[0].userID;  //saves userID after login
            res.json(rows);
          }
         }
         else
           console.log('Error while performing Query.');
         });
});

router.get("/locations",function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query('SELECT * from LocationInformation', function(err, rows, fields) {
    if (!err) {
      res.json(rows);
   }
   else
     console.log('Error while performing Query.');
   });
});

router.get('/eventInfo/:city/:date',function(req,res){
  var city = req.params.city;
  var date = req.params.date;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query('SELECT eventName, eventDate,  openTime, closeTime FROM DonationEvent WHERE fk_locationid = (SELECT locationID FROM LocationInformation  WHERE city=? ) AND eventDate=? ORDER BY eventDate', [city, date], 
  function(err, rows, fields) {
    if (!err) {
      res.json(rows);
   }
   else
     console.log('Error while performing Query.');
   });
});

router.get("/eligibility",function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  connection.query('SELECT MAX(temp.mostRecentDate) AS lastDate FROM( SELECT MAX(b.donationDate) AS mostRecentDate  FROM Donor d LEFT JOIN BloodDonation b ON d.userID = b.fk_userID  WHERE  d.HIVpositive = "No"   AND  b.bloodAmount > 0 AND d.userID = ? GROUP BY d.HIVpositive, b.bloodAmount ORDER BY mostRecentDate DESC) AS temp', [userID, userID]
  ,function(err, rows, fields) {
    
    if (!err) {
      console.log(rows);
      res.json(rows);
   }
   else
     console.log('Error while performing Query.');
   });
});


router.get("/history",function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(userID);
connection.query('SELECT d.userID, de.eventName, b.donationDate, b.donationTime,  b.bloodAmount,  loc.locationName , loc.unitNo , loc.streetNo , loc.streetName , loc.city , loc.province , loc.postalCode , loc.numStaff FROM Donor d JOIN BloodDonation b ON b.fk_userID=d.userID JOIN DonationEvent de ON b.fk_donationEventID = de.donationEventID JOIN LocationInformation loc ON de.fk_locationID = loc.locationID GROUP BY d.userID, de.eventName, b.donationDate, b.donationTime,  b.bloodAmount,  loc.locationName , loc.unitNo , loc.streetNo , loc.streetName , loc.city , loc.province , loc.postalCode , loc.numStaff HAVING userID=?', [userID], 
function(err, rows, fields) {
    if (!err) {
      
      //console.log(rows);
      res.json(rows);
   }
   else{
     throw err;
     console.log('Error while performing Query.');
   }
   });
});

router.get('/ranking',function(req,res){ 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  
  connection.query('SELECT SUM(b.bloodAmount) AS sumDonationAmount, COUNT(b.bloodAmount) AS countDonationTimes FROM Donor d LEFT JOIN BloodDonation b ON b.fk_userID=d.userID WHERE d.userID =?',[userID],
  function(err, rows, fields) { if (!err) { 
    res.json(rows); 
  } 
  else 
  console.log('Error while performing Query.'); 
  }); 
});

router.get('/profile', function(req, res){
  //res.setHeader('Access-Control-Allow-Methods', '*');
  //res.setHeader('Access-Control-Allow-Origin', '*'); 
  
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://blood-donation-database-izvonkov.c9users.io:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  
  connection.query('SELECT * FROM Donor  WHERE  userID=?', [userID],function (err, rows, fields) {
       
       if (!err) {
          console.log("Success");
          console.log(rows);
          res.json(rows);
        }else{
          res.json({message: err});
          console.log('fairl');
          throw err;
        }
    });
});


router.get('/update/:firstName/:lastName/:email/:healthCardNo/:hiv/:insuranceNo',function(req,res){ 
    res.setHeader('Access-Control-Allow-Methods', '*');
    
    console.log("im in");
  
    var donorName = req.params.firstName + req.params.lastName;
    var email = req.params.email;
    var healthCardNo = parseInt(req.params.healthCardNo);
    var hiv = req.params.hiv;
    var insuranceNo = parseInt(req.params.insuranceNo);

    //console.log("name:" +donorName);
    //console.log("insurance:"+insuranceNo);
    
    connection.query('UPDATE Donor SET donorName=?, email=?, healthCardNo=?, HIVpositive=?, insuranceNo=? WHERE userID=?', 
    [donorName, email, healthCardNo, hiv, insuranceNo, userID],function (err, rows, fields) {
        if (!err) {
          console.log("Success");
            res.json(rows);
        }else{
          res.json({message: err});
          console.log('fairl');
          throw err;
        }
    });
});


router.get('/appointment/:donationDate/:eventName/:donationTime', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  var donationTime = req.params.donationTime;
  var donationDate = req.params.donationDate;
  var eventName = req.params.eventName; //user selected donation event name to get id  
  console.log("appointment: "+donationDate +" "+eventName);
  var currentMilliseconds = new Date().getTime();
  appID = currentMilliseconds - 1512000000000;   //generate appoitnment id 
  connection.query('INSERT INTO BloodDonation(appointmentID, bloodAmount, donationDate, donationTime, fk_donationEventID, fk_userID) VALUES (?,400,  ?, ?, (SELECT donationEventID FROM DonationEvent WHERE eventName=?), ?)', 
   [appID, donationDate, donationTime, eventName, userID],
   function (err, rows, fields) {
        if (!err) {
            res.json({message: "Appointment booked!"});
        }else{
          throw err;
        }
    });
});


  
app.use('/api', router);

app.listen(port);
