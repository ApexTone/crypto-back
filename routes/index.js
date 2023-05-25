// api
// admin increase and decrease any user's crypto balance
// admin see total balance of all crypto
// admin add other crypto currency
// admin change exchange rate between crypto
// user can transfer crypto (relate to exchange rate)

// use this file to export all routers
const walletsRouter = require("./wallets");
const adminsRouter = require("./admins");

module.exports = {
  walletsRouter,
  adminsRouter,
};
