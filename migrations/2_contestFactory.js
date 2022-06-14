const ContestFactory = artifacts.require("ContestFactory");

module.exports = function (deployer) {
  deployer.deploy(ContestFactory);
};