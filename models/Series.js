const { crudControllers } = require("prattask-cmmn");

const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      // change this length accordingly
      minlength: 3,
    },
    chapters: [
      {
        name: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          minlength: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  }
);

const Series = mongoose.model("series", seriesSchema);

module.exports = {
  seriesCrud: crudControllers(Series),
  Series,
};
