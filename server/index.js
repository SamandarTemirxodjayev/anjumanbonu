const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const router = require("./routes/router.js");
const AdminRouter = require("./routes/adminRouter.js");
const IncubatorRouter = require("./routes/incubatorRouter.js");

const app = express();
const options = {
  key:fs.readFileSync("./keys/key.pem"),
  cert:fs.readFileSync("./keys/cert.pem")
};

const port = 443;

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api/admin", AdminRouter);
app.use("/api/incubator", IncubatorRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/anjumanbonu?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Server is connecting on MongoDB");
    app.listen(3021, () => {
      console.log("Server is running on http://localhost:3021");
    });
    https.createServer(options, app).listen(port, () => {
      console.log("Server is running on https://localhost");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
