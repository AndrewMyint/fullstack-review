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
app.post('/repos', function (req, res) {
  // TODO - your code here!
  // console.log('inside server', req.body);
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database


  gitHubApi.getReposByUsername(req.body, (err, res, body) => {
    if (err) {
      console.log(err);
    } else {
      var body = JSON.parse(body);
      var repos = body.map((item, index)=> {
        return {
              id: item.id,
              name: item.name,
              url: item.html_url,
              fork_Counts: item.forks
        }
      });
      // console.log('repoooooooo',repos);
      save(repos);
    }
  });

  res.redirect('/repos');
  res.end();

});

app.get('/repos', function (req, res) {

  // TODO - your code here!
  // This route should send back the top 25 repos

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

