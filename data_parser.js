require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function parser() {
  // web URL
  const url = process.env.WEB_URL;
  const response = await axios.get(url);
  const html = response.data;

  // parsing html
  const $ = cheerio.load(html);
  const data = $(process.env.DATA_POS);
  const text_data = [];
  data.each((i, elem) => {
    text_data.push($(elem).text());
  });

  return text_data;
}

function dataProcess(data) {
  const data_group = [];
  keys = [
    "timestamp",
    "first_place_name",
    "first_place_score",
    "second_place_name",
    "second_place_score",
    "third_place_name",
    "third_place_score",
    "fourth_place_name",
    "fourth_place_score",
    "checksum",
    "comment",
  ];

  for (let i = 2 * keys.length; i < data.length; i += keys.length) {
    const group = {};

    // check end of data
    if (data[i] == "") {
      break;
    }

    for (let j = 0; j < keys.length; j++) {
      group[keys[j]] = data[i + j];
    }

    data_group.push(group);
  }
  return data_group;
}

function saveToJson(data_group) {
  const data_json = JSON.stringify(data_group);

  fs.writeFile("data.json", data_json, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}

async function main() {
  const data = await parser();

  const data_group = dataProcess(data);
  saveToJson(data_group);
}

main();
