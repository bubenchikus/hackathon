import dateformat from "dateformat";
import iso4217 from "./iso4217.js";

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

  let userCode = getArg(args, "code");
  if (!userCode || !iso4217[userCode]) {
    return console.info(`No currency specified or incorrect code provided.`);
  }

  const timestamp = Date.parse(getArg(args, "date"));
  if (!timestamp) {
    return console.info(
      `No data specified or incorrect format provided. Please restart script with correct arguments.`
    );
  }
  const userDate = timestampToISODate(timestamp);

  return { code: userCode, date: userDate };
}

export default getArguments;
