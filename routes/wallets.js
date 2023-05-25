const { Router } = require("express");
const walletsRouter = Router();

const checkAuthorized = (userId) => {
  // should use better auth method
  return userId !== "";
};

// GET: user's balance
walletsRouter.get("/", (req, res, next) => {
  // at minimum should have userId
  const { userId } = req.body; // equivalent to const body = req.body

  // you should always use this to authenticate user => maybe use middleware
  if (checkAuthorized(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not authorize");
  }

  // query user's balance in DB
  const balance = 999;

  // return response
  res.json({
    balance: balance,
  });
});

// SEEMS LIKE NOT IN THE SPECIFICATION (Could use the same logic of transfer from A to A)
// POST: exchange src crypto to target crypto with specified exchange rate
walletsRouter.post("/exchange", (req, res, next) => {
  // at minimum should have userId, srcCrypto, srcAmount, targetCrypto
  const { userId, srcCrypto, srcAmount, targetCrypto } = req.body;
  if (checkAuthorized(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not authorize");
  }

  // validate whether user have enough amount to exchange or not
  // query DB whether srcAmount <= balance
  const srcBalance = 999;
  if (srcAmount > srcBalance) {
    res.statusCode = 400; // bad request?
    res.send("not enough balance");
  }

  // query DB for exchange rate of srcCrypto -> targetCrypto
  const exchangeRate = 123;

  // apply change to DB
  // reduce srcCrypto, increase targetCrypto
  const targetCryptoIncrement = srcCrypto * exchangeRate;
  // update change to DB
  // srcCrypto -= srcAmount
  // targetCrypto += targetCryptoIncrement

  // query DB for new crypto amount
  const currentSrcCryptoAmount = 555;
  const currentTargetCryptoAmount = 666;

  res.json({
    userId: userId,
    currentSrcCryptoAmount: currentSrcCryptoAmount,
    srcCrypto: srcCrypto,
    currentTargetCryptoAmount: currentTargetCryptoAmount,
    targetCrypto: targetCrypto,
  });
});
// POST: trasfer src crypto to target crypto with specified exchange rate (to specified user)
walletsRouter.post("/trasfer", (req, res, next) => {
  // at minimum should have userId, srcCrypto, srcAmount, targetCrypto, targetAddress
  const { userId, srcCrypto, srcAmount, targetCrypto, targetAddress } =
    req.body;
  if (checkAuthorized(userId || "")) {
    res.statusCode = 401; // unauthorized error
    res.send("user is not authorize");
  }

  // validate whether user have enough amount to exchange or not
  // query DB whether srcAmount <= balance
  const srcBalance = 999;
  if (srcAmount > srcBalance) {
    res.statusCode = 400; // bad request?
    res.send("not enough balance");
  }

  // query DB for exchange rate of srcCrypto -> targetCrypto
  const exchangeRate = 123;

  // apply change to DB
  // reduce srcCrypto, increase targetCrypto
  const targetCryptoIncrement = srcCrypto * exchangeRate;
  // update change to DB
  // user's srcCrypto -= srcAmount
  // targetAddress's targetCrypto += targetCryptoIncrement

  // query DB for new crypto amount
  const currentSrcCryptoAmount = 555;

  res.json({
    userId: userId,
    currentSrcCryptoAmount: currentSrcCryptoAmount,
    srcCrypto: srcCrypto,
    targetAddress: targetAddress,
    targetCryptoIncrement: targetCryptoIncrement,
    targetCrypto: targetCrypto,
  });
});

module.exports = walletsRouter;
