const express = require("express");
const db = require("../db/models/index");
const UserInstance = db.userInstance;
const router = express.Router();
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

/* Get all employees */
router.get("/", async (req, res, next) => {
  try {
    const startDate =
        req.query.startDate !== undefined ? new Date(req.query.startDate) : null;
    const endDate =
        req.query.endDate !== undefined ? new Date(req.query.endDate) : null;
    const option = req.query.option;
    const humanID = req.query.humanID !== undefined ? Number(req.query.humanID) : null;
    UserInstance.findAll({
      where: {
        ...(startDate && {
          timestamp: { [Op.gte]: startDate },
        }),
        ...(endDate && {
          timestamp: { [Op.lte]: endDate },
        }),
        ...(startDate &&
            endDate && {
              timestamp: { [Op.between]: [startDate, endDate] },
            }),
        ...(humanID && {
          humanID: {[Op.eq]: humanID},
        }),
      },
      ...(option === "HUMANXTIME" && { group: ["timestamp"] }),
      attributes:
          option === "HUMANXTIME"
              ? [
                "timestamp",
                [Sequelize.fn("COUNT", "timestamp"), "UserInstanceCount"],
              ]
              : ["timestamp", "pos_x", "pos_y"],
    })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: "An error occurred while fetching the data.",
          });
        });
  } catch (error) {
    next(error);
  }
});

/* Get a specific employee */
router.get("/humanIDs", async (req, res, next) => {
  try {
    UserInstance.findAll({
      group: ["humanID"],
      attributes: ["humanID"],
    })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: "An error occurred while fetching the data.",
          });
        });
  } catch (error) {
    next(error);
  }
});


module.exports = router;