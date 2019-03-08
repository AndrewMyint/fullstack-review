const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('connected', () => {
  console.log("mongoose is connected to database");
})
db.on('error', (err) => {
  console.log("mongoose connection error", err);
})
db.on('disconnected', () => {
  console.log("mongoose is disconnected from database");
})

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: String, unique: true},
  name: String,
  url: String,
  fork_Counts: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoId, repoName, url, forkCounts) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repo = new Repo({
    id: repoId,
    name: repoName,
    url: url,
    fork_Counts: forkCounts
  })
  repo.save((err) => {
    if (err) console.log('repo is not saved: ', err);
    else console.log('repo is saved');
  })
}

module.exports.save = save;