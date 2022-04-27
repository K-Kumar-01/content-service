const express = require("express");
const seriesRoutes = require('./routes/series');
const { errorHandler, NotFoundError, connectDB} = require("prattask-cmmn");

const app = express();

// const DB_STRING = "mongodb://mongo-content:27017/content";
// const DB_STRING = "mongodb://127.0.0.1:27017/content";
const DB_STRING = "mongodb+srv://kushal:pratilipi@content.zadre.mongodb.net/content?retryWrites=true&w=majority";

connectDB(DB_STRING);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/series', seriesRoutes)

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
