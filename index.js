const op = 3;
var d = new Date();
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
  database: 'post_geoloc',
  password: 'docker',
  port: 25432,
})
let labels = new Map();
labels.set('t1', 'tempo inserção ');
labels.set('t2', 'tempo de busca restaurants a 1km');
labels.set('t3', 'tempo de busca todos os restaurantes');
var finalTime = 0;
const before = Date.now();
switch (op) {
  case 1:
    pool.query('delete from places');

    insertRestaurants();
    
    break;
  case 2:

    pool.query('select *, ST_Distance(lat_lng, ST_MakePoint(-73.9903, 40.7570)::geography)from places where ST_DWithin(lat_lng, ST_MakePoint(-73.98241999999999, 40.579505)::geography, 1000)order by ST_Distance(lat_lng, ST_MakePoint(-126.4, 45.32)::geography);', (err, res) => {
      // for (i = 0; i < res.rows.length; i++);
      const list = res.rows;
      const after = Date.now();
      console.log((after - before) / 1000);
      console.log(list.length);
    })
    break;
  case 3:

    pool.query('select * from places', (err, res) => {
      const after = Date.now();
      console.log((after - before) / 1000);
      // finalTime = (after - before) / 1000;
      const list = res.rows;
      console.log(list.length);

    })
  default:
    break;
}

// pools will use environment variables
// for connection information
function insertRestaurants(r) {
  var lineno = 0;
  var execTime = 0;
  var variacao = 0;
  myInterface.on('line', function (line) {

    lineno++;
    let restaurant = JSON.parse(line);
    values = [restaurant.address.coord[0], restaurant.address.coord[1], restaurant.name]
    pool.query('insert into places values (ST_MakePoint($1, $2), $3);', values, (err, res) => {

      const after = Date.now();
      if (err) console.log('erro ao inserir');
      console.log((after - before) / 1000);
      
    })
    
    
  });
}
