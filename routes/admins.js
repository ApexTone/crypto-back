const { Router } = require("express");
const adminsRouter = Router();

const checkIsAdmin = (userId) => {
  // should use better auth method
  if (userId === "") {
    return false;
  }

  //query DB for user's role
  const role = "admin";
  return role === "admin";
};

adminsRouter.get("/cryptos", (req, res, next) => {
  // at minimum should have userId
  const { userId } = req.body;
  if (checkIsAdmin(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not admin");
  }

  // query DB for all crypto list and all balance
  const dbRes = [
    { crypto: "ETH", balance: 500 },
    { crypto: "BTC", balance: 600 },
    { crypto: "LUN", balance: 700 },
  ];

  res.json(dbRes);
});

adminsRouter.post("/increase-crypto", (req, res, next) => {
  // at minimum should have userId, targetUser, targetCrypto, incrementAmount
  const { userId, targetUser, targetCrypto, incrementAmount } = req.body;
  if (checkIsAdmin(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not admin");
  }

  if (incrementAmount < 0) {
    res.statusCode = 400; // bad request
    res.send("increment amount should be positive");
  }

  // update DB target crypto
  // targetUser's targetCrypto += incrementAmount
  // query DB for new crypto amount
  const currentTargetCryptoAmount = 555;

  res.json({
    targetUser: targetUser,
    currentTargetCryptoAmount: currentTargetCryptoAmount,
    targetCrypto: targetCrypto,
  });
});

adminsRouter.post("/decrease-crypto", (req, res, next) => {
  // at minimum should have userId, targetUser, targetCrypto, decreaseAmount
  const { userId, targetUser, targetCrypto, decreaseAmount } = req.body;
  if (checkIsAdmin(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not admin");
  }

  if (decreaseAmount < 0) {
    res.statusCode = 400; // bad request
    res.send("decrease amount should be positive");
  }

  // update DB target crypto
  // targetUser's targetCrypto -= decreaseAmount
  // query DB for new crypto amount
  const currentTargetCryptoAmount = 555;

  res.json({
    targetUser: targetUser,
    currentTargetCryptoAmount: currentTargetCryptoAmount,
    targetCrypto: targetCrypto,
  });
});

adminsRouter.post("/add-crypto", (req, res, next) => {
  // at minimum should have userId, cryptoName, exchangeRates
  const { userId, cryptoName, exchangeRates } = req.body;
  // exchangeRates is a list containing object
  // object = {targetCrypto: string, exchangeRate: double} // exchangeRate must be positive number

  if (checkIsAdmin(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not admin");
  }

  // add crypto name to DB
  // add default exchange rate? or specified?
  // add data to DB for all crypto exchange rate => must read all crypto list first
  // cryptoName => cryptoA and cryptoA => cryptoName (calculate from 1/excangeRate)

  res.json({
    text: "add new crypto successfully",
    cryptoName: cryptoName,
  });
});
adminsRouter.put("/edit-exchange-rate", (req, res, next) => {
  // at minimum should have userId,  srcCryptoName, targetCryptoName, rate  // rate must be positive number
  const { userId, srcCryptoName, targetCryptoName, rate } = req.body;

  if (checkIsAdmin(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not admin");
  }

  // must validate that srcCryptoName and targetCryptoName must exists
  // query it from database
  // CODE HERE

  // update exchange rate of cryptoName => cryptoA and cryptoA => cryptoName (calculate from 1/excangeRate)
  // CODE HERE

  res.json({
    text: "update exchange rate successfully",
    srcCryptoName: srcCryptoName,
    targetCryptoName: targetCryptoName,
    toRate: rate,
  });
});

module.exports = adminsRouter;
