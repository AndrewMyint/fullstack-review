const express = require('express');
const bodyParser = require('body-parser');
const gitHubApi = require('../helpers/github');
// console.log('*************', getReposByUsername);
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text());
//app.get('/');
app.post('/repos', function (req, res) {
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
      console.log("this is body ***********,", body.items[0].name);
    }
  })


});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

