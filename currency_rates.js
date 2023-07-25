import getArguments from "./src/getArguments.js";
import fetchData from "./src/fetchData.js";

async function main() {
  const args = getArguments();

  if (!args) return;

  const dataForAllCurrencies = await fetchData(args.date);

  if (!dataForAllCurrencies) return;

  const dataForUserCurrency = dataForAllCurrencies.find(
    (el) => el.CharCode[0] === args.code
  );

  if (!dataForUserCurrency || !dataForUserCurrency.Value) {
    return console.info(
      `Sorry, data for provided currency code (${args.code}) is not available.`
    );
  }

  const nominal = dataForUserCurrency.Nominal || 1;
  const name = dataForUserCurrency.Name;

  console.info(
    `${args.code} ${name ? `(${name})` : ""}: ${
      dataForUserCurrency.Value
    } RUB за ${nominal} ед.`
  );
}
main();
