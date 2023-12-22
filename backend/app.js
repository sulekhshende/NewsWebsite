//require("./src/connection")
const express = require('express');
const { sequelize } = require('./models');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const newsRoute = require("./routes/news");
const locationRoute = require("./routes/locations");
const newsCategory = require("./routes/categories");
const Tags = require("./routes/tags");
const newsTags = require("./routes/news_tags");
const reportsRoute = require("./routes/reports");
const newsReports = require("./routes/news_reports");
const approvedUser = require("./routes/approved");
const reportedNews = require("./routes/reportsnews");
const cors = require("cors");

app.use(cors('*'));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/news", newsRoute);
app.use("/api/locations", locationRoute);
app.use("/api/category", newsCategory);
app.use("/api/tags", Tags);
app.use("/api/news_tags", newsTags);
app.use("/api/reports", reportsRoute);
app.use("/api/news_reports", newsReports);
app.use("/api/approved", approvedUser);
app.use("/api/reportsnews", reportedNews);

let PORT = process.env.PORT || 7700
app.listen(PORT , async () => {
    console.log("Backend started running on port " + PORT);
    await sequelize.authenticate();
    //await sequelize.sync({ force: true });
    console.log("Database Connected using Sequelize! on Port  " + PORT)
});
    
