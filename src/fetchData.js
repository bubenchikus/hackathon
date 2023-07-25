import axios from "axios";
import xml2js from "xml2js";
// такая кодировка была указана в принятом xml-файле.
import * as windows1251 from "windows-1251";

async function fetchData(date) {
  let res = await axios
    .request({
      method: "GET",
      url: `http://www.cbr.ru/scripts/XML_daily.asp?date_req=${date}`,
      responseType: "arraybuffer",
      responseEncoding: "binary",
    })
    .then((res) => windows1251.decode(res.data.toString("binary")));

  xml2js.parseString(res, function (err, result) {
    if (err) throw err;
    res = result?.ValCurs?.Valute;
    if (!res) {
      return console.info(
        `Sorry, valute data for this date (${date}) is not available.`
      );
    }
  });

  return res;
}

export default fetchData;
