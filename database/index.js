const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');


if (process.env.NODE_ENV === 'production') {
  // we are in production
  mongoose.connect(process.env.DATABASE_URL);
} else {
//   // we are in development
  mongoose.connect('mongodb://localhost/fetcher');
}


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
  id: { type: String, unique: true },
  name: String,
  url: String,
  fork_Counts: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arr, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.insertMany(arr, {ordered: false}, function(err, data) {
    if (err) cb(err, null);
    else
      cb(null, data);
  });

}
let findAll = (cb) => {
  Repo.find((err, data, res) => {
    if (err) {cd(err, null);}
    else {
      console.log("where is the data.....", data)
      cb(null, data);
    }
  }).sort({fork_Counts: -1}).limit(25);
}

module.exports.save = save;
module.exports.findAll = findAll;


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://andrew:<password>@cluster0-4bgyp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/