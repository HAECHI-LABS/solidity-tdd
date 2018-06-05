const Token = artifacts.require('HAECHIToken');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(Token);
};
