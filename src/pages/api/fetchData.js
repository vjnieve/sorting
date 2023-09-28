const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const parseData = (result = [], row = []) => {
  const [created_at, filename] = row;

  return result.concat({ created_at, filename });
};
export default function handler(_req, res) {
  // Perform server action

  try {
    let result = [];

    const csvDirectory = path.join(process.cwd(), "");

    // read the file
    fs.createReadStream(csvDirectory + "/data.csv")
      .pipe(parse({ delimiter: ";", from_line: 2 }))
      .on("data", function (row) {
        // parse the fiel
        result = parseData(result, row);
      })
      .on("end", function () {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
}
