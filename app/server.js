const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

const DB_USERNAME = process.env.MONGO_DB_USERNAME;
const DB_PASSWORD = process.env.MONGO_DB_PWD;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

const mongoUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@mongodb`;

const mongoClientOptions = {
  useUnifiedTopology: true,
  useUnifiedTopology: true,
};

const databaseName = "docker-test";
const collectionName = "docker-collection";

app.post("/fetch-data", function (req, res) {
  let response = {};
  MongoClient.connect(mongoUrl, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { myquery: 1 };

    db.collection(collectionName).findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();
      res.send(response ? response : {});
    });
  });
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
