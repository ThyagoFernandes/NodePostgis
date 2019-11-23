const op = 1;
var readline = require('readline');
const { Pool, Client } = require('pg');
const fs = require('fs');
let restaurantsArray = new Array();
var myInterface = readline.createInterface({
  input: fs.createReadStream('primer-dataset.json')
});
const pool = new Pool({
  user: 'docker',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 25432,
})

switch (op) {
  case 1:
   
    var lineno = 0;
    
    myInterface.on('line', function (line) {
      lineno++;
      let restaurant = JSON.parse(line);
      restaurantsArray.push(restaurant)
      values = [restaurant.address.coord[0],restaurant.address.coord[1],restaurant.name]
      
      pool.query('insert into places values (ST_MakePoint($1, $2), $3);',values, (err, res) => {
        console.log(err,res);
      })
    });

    
    break;

  default:
    break;
}


console.log(restaurantsArray);
// pools will use environment variables
// for connection information



function setrestaurants(r)
{
  restaurantsArray = r;
}
