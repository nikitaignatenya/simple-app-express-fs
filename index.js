const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const {
  data,
  getDataById,
  postDataByLabel,
  putData,
  deleteData,
} = require("./srvice");

app.use(bodyparser.json());

app.get("/", (request, response) => {
  const result = data();
  response.status(200).send(result);
});
app.get("/:id", (request, response) => {
  const { id } = request.params;
  const result = getDataById(id);
  response.status(200).send(result);
});
app.post("/", (request, response) => {
  const { label, category, priority } = request.body;
  const result = postDataByLabel(label, category, priority);
  response.status(200).send(result);
});
app.put("/:id", (request, response) => {
  const { id } = request.params;
  const { label, category, priority } = request.body;
  const result = putData(id, label, category, priority);
  response.status(200).send(result);
});
app.delete("/:id", (request, response) => {
  const { id } = request.params;
  const result = deleteData(id);
  response.status(200).send(result);
});

app.listen(3000, () => {
  console.log("Success");
});
