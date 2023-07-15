const express = require("express");
const router = require("./routes/router.js");
const AdminRouter = require("./routes/adminRouter.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api/admin", AdminRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/amjumanbonu?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
    app.listen(3021, () => {
      console.log("Example app listening on port 3021!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
