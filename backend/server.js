const express = require("express");
const { saveDataSet } = require("./api/api");
const app = express();
const port = 8080;
const cron = require("node-cron");
const fs = require("fs");
const JSONStream = require("JSONStream");
const es = require("event-stream");
const db = require("./db/models/index");

const cors = require("cors");
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST']
}

app.use(cors(corsOptions))

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const UserInstance = db.userInstance;

app.get("/", (req, res) => {
  res.send("Server running is ok!");
});

const API_BASE_URL = require("./api/api");

app.use("/api/", API_BASE_URL);

var getStream = function () {
  let fileData = "./FilteredDataHuman";
  var stream = fs.createReadStream(fileData, { encoding: "utf8" });
  var parser = JSONStream.parse("*");
  return stream.pipe(parser);
};

cron.schedule("42 * * * *", () => {
  console.log("running a task every minute");
  try {
    getStream().pipe(
      es.mapSync(async function (data) {
        const date = new Date(
          Number(data["timestamp"]["$date"]["$numberLong"])
        );
        if (date < new Date()) {
          const instances = data["instances"];
          // Object.keys(instances).forEach(async function (key) {
          //   await UserInstance.create({
          //     pos_x: instances[key]["pos_x"],
          //     pos_y: instances[key]["pos_y"],
          //     vel_x: instances[key]["vel_x"],
          //     vel_y: instances[key]["vel_y"],
          //     confidence: instances[key]["confidence"],
          //     humanID: Number(key),
          //     timestamp: date,
          //   });
          // });
        }
      })
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
