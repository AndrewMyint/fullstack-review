const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: String,
  url: String,
  forkCounts: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repoDocument) => {
  // TODO: Your code here
  if (err) {
    console.log(err);
  }
  // This function should save a repo or repos to
  // the MongoDB

}

module.exports.save = save;