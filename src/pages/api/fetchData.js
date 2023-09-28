const fs = require("fs");
const { parse } = require("csv-parse");

const parseData = (result = [], row = []) => {
  const [created_at, filename] = row;

  return result.concat({ created_at, filename });
};
export default function handler(_req, res) {
  // Perform server action

  let result = [];

  console.log("joining here");

  return res.sendStatus(200);

  // read the file
  fs.createReadStream("./data.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      // parse the fiel
      result = parseData(result, row);
    })
    .on("end", function () {
      res.send(result);
    });
}
