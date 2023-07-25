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

  console.log(dataForUserCurrency);
}
main();
