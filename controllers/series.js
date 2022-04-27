const { BadRequestError } = require("prattask-cmmn");
const { seriesCrud } = require("../models/Series");
const axios = require("axios").default;

exports.fetchAllContent = async (req, res, next) => {
  try {
    const options = req.query.selectOpts || "-__v -updatedat";
    const data = await seriesCrud.getManyDocs({
      findBy: {},
      selectOpts: options,
    });

    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

exports.createContentOne = async (req, res, next) => {
  try {
    const existingContent = await seriesCrud.getOne({
      findBy: { name: req.body.name },
    });
    if (existingContent) {
      throw new BadRequestError("Content with same title exists");
    }

    const createdContent = await seriesCrud.createOne({ body: req.body });
    return res.status(200).json({ data: createdContent });
  } catch (error) {
    next(error);
  }
};

exports.createContentMany = async (req, res, next) => {
  try {
    const createdContent = await seriesCrud.createMany({ body: req.body });
    const modifiedContent = createdContent.map((element) => {
      let content = {
        series_id: element._id.toString(),
        lastChapter: Math.min(4, element.chapters.length),
        totalChapters: element.chapters.length,
      };
      return content;
    });
    await axios.put("http://localhost:4000/dailyPass/series", {
      series: modifiedContent,
    });
    return res.status(200).json({ data: createdContent });
  } catch (error) {
    next(error);
  }
};

exports.fetchContentForUser = async (req, res, next) => {
  try {
    const userID = req.query.userId;
    const seriesID = req.params.id;
    const userContentDetails = await axios.get(`http://localhost:4000/dailypass/details?seriesId=${seriesID}&userId=${userID}`);
    return res.status(200).json({data:userContentDetails.data.data});
  } catch (error) {
    console.log(error)
    next(error);
  }
};
