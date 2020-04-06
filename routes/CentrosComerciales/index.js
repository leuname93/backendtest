const api = require("express").Router();
const passport = require("passport");
const Schema = require("../../models/CentrosComerciales");
const mall = require("../../controllers/CentrosComerciales");

module.exports = (() => {
  api.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    Schema.validBodyCentroComercial,
    mall.setMall
  );

  api.get("/", passport.authenticate("jwt", { session: false }), mall.getMall);

  api.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    Schema.validEdit,
    mall.updateMall
  );

  api.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    mall.deleteMall
  );

  return api;
})();
