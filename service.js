const { error } = require("console");
const fs = require("fs");

function data() {
  const json = fs.readFileSync("./library.json");
  const arr = JSON.parse(json);
  return arr;
}
function getDataById(id) {
  try {
    const arr = data();
    const idArr = arr.map((el) => el.id);
    if (!idArr.includes(id)) throw new Error("В массиве нет подходящего ID");
    const result = arr.filter((el) => el.id == id);
    return result;
  } catch (error) {
    return error.message;
  }
}
function postDataByLabel(label, category, priority) {
  try {
    const arr = data();
    const id = label.toLowerCase().split(" ").join("");
    const idArr = arr.map((el) => el.id);

    if (!idArr.includes(id)) {
      const newArr = [{ id, label, category, priority }, ...arr];
      fs.writeFileSync("./library.json", JSON.stringify(newArr));
      return newArr;
    } else {
      throw new Error("В массиве уже есть такой ID");
    }
  } catch (error) {
    return error.message;
  }
}

function putData(id, label, category, priority) {
  try {
    const arr = data();
    const idArr = arr.map((el) => el.id);
    const newId = label.toLowerCase().split(" ").join("");
    if (
      idArr.includes(id) &&
      typeof priority == "number" &&
      typeof category == "string"
    ) {
      const result = arr.map((el) =>
        id == el.id ? { id: newId, label, category, priority } : el
      );
      fs.writeFileSync("./library.json", JSON.stringify(result));
      return result;
    } else throw new Error("Нет совпадений ID");
  } catch (error) {
    return error.message;
  }
}

function deleteData(id) {
  try {
    const arr = data();
    const idArr = arr.map((el) => el.id);
    if (idArr.includes(id)) {
      const result = arr.filter((el) => id !== el.id);
      fs.writeFileSync("./library.json", JSON.stringify(result));
      return result;
    } else throw new Error("Нет совпадений ID");
  } catch (error) {
    return error.message;
  }
}

module.exports = { data, getDataById, postDataByLabel, putData, deleteData };
