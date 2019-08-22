import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.resolve(__dirname, "../../web/build")));

app.use("/", (req, res) => {
  res.status(200).send({ message: "SUCCESS" });
});

export default app;
