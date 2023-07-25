import axios from "axios";
import xml2js from "xml2js";

async function fetchData(date) {
  let res = await axios
    .get(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${date}`)
    .then((res) => res.data);

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
