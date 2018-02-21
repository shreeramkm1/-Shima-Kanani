const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'https://blood-donation-database-izvonkov.c9users.io',
  user: 'root',
  password: 'root',
});
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    throw err;
    return;
  }
  console.log('Connection established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
