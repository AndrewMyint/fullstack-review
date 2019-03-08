const express = require('express');
const bodyParser = require('body-parser');
const gitHubApi = require('../helpers/github');
const morgan = require('morgan');
const {save} = require('../database/index');
// console.log(save);
// console.log('*************', getReposByUsername);
let app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());
//app.get('/');
app.post('/', function (req, res) {
  // TODO - your code here!
  console.log('inside server', req.body);
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  gitHubApi.getReposByUsername(req.body, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("this is res ***********,", res);
      var body = JSON.parse(body);
      for (var i = 0; i < body.items.length; i++) {
        // console.log("\nthis is body ***********,", body.items[0].id, typeof(body.items[0].id));
        // console.log("this is body ***********,", body.items[0].name);
        // console.log("this is body ***********,", body.items[0].forks, typeof(body.items[0].forks));
        // console.log("this is body ***********,", body.items[0].html_url, typeof(body.items[0].html_url));
        save(String(body.items[i].id), body.items[i].name, body.items[i].html_url, body.items[i].forks);
      }
    }
  })
  res.redirect('/repos');
  res.end();

});

app.get('/repos', function (req, res) {
  res.send("hello")
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

