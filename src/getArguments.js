// Все проверки на наличие и корректность аргументов командной строки будут здесь.

import dateformat from "dateformat";

function getArg(args, paramName) {
  const regex = new RegExp(`^--${paramName}=.`);
  return args.find((el) => regex.test(el))?.split("=")[1];
}

function timestampToISODate(timestamp) {
  timestamp = new Date(timestamp);
  const offset = timestamp.getTimezoneOffset();
  timestamp = new Date(timestamp.getTime() - offset * 60 * 1000);
  return dateformat(timestamp, "dd/mm/yyyy");
}

function getArguments() {
  const args = process.argv.slice(2);

  const defaultCurrency = "USD";
  let userCode = getArg(args, "code");
  if (!userCode) {
    console.info(
      `No currency specified or incorrect code provided. Default currency ${defaultCurrency} will be used.`
    );
  }
  userCode = userCode || "USD";

  const timestamp = Date.parse(getArg(args, "date"));
  if (!timestamp) {
    console.info(
      `No data specified or incorrect format provided. Please restart script with correct arguments.`
    );
    return;
  }
  const userDate = timestampToISODate(timestamp);

  return { code: userCode, date: userDate };
}

export default getArguments;
