const fs = require("fs");

function data() {
  const json = fs.readFileSync("./library.json");
  const arr = JSON.parse(json);
  return arr;
}
function getDataById(id) {
  const arr = data();
  const result = arr.filter((el) => el.id == id);
  return result;
}
function postDataByLabel(label, category, priority) {
  const arr = data();
  const id = label.toLowerCase().split(" ").join("");
  const idArr = arr.map((el) => el.id);
  !idArr.includes(id)
    ? fs.writeFileSync(
        "./library.json",
        JSON.stringify([{ id, label, category, priority }, ...arr])
      )
    : null;
  return arr;
}

function putData(id, label, category, priority) {
  const arr = data();
  const result = arr.map((el) =>
    id == el.id ? { id, label, category, priority } : el
  );
  fs.writeFileSync("./library.json", JSON.stringify(result));
  return result;
}

function deleteData(id) {
  const arr = data();
  const result = arr.filter((el) => id !== el.id);
  fs.writeFileSync("./library.json", JSON.stringify(result));
  return result;
}

module.exports = { data, getDataById, postDataByLabel, putData, deleteData };
