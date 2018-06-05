import decodeLogs from 'openzeppelin-solidity/test/helpers/decodeLogs';

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Token = artifacts.require('HAECHIToken');

contract('HAECHIToken', accounts => {
  let token;
  const [
    creator,
    from,
    to
  ] = accounts;

  before(async function () {
    token = await Token.new({from: creator});
  });

  it('has a name', async function () {
    (await token.name()).should.be.equal('HAECHI Labs');
  });

  it('has a symbol', async function () {
    (await token.symbol()).should.be.equal('HAC');
  });

  it('has 18 decimals', async function () {
    (await token.decimals()).should.be.bignumber.equal(18);
  });

  it('assigns the initial total supply to the creator', async function () {
    const totalSupply = await token.totalSupply();
    (await token.balanceOf(creator)).should.be.bignumber.equal(totalSupply);

    const receipt = web3.eth.getTransactionReceipt(token.transactionHash);
    const logs = decodeLogs(receipt.logs, Token, token.address);
    assert.equal(logs.length, 1);
    assert.equal(logs[0].event, 'Transfer');
    assert.equal(logs[0].args.from.valueOf(), 0x0);
    assert.equal(logs[0].args.to.valueOf(), creator);
    assert(logs[0].args.value.eq(totalSupply));
  });

  it('should not transfer tokens before the owner unlock the Token', async function () {
    await token.transfer(1000, accounts[1], {from: creator}).should.be.rejected;
  });

  it('should transfer tokens after the owner unlock the Token', async function () {
    await token.unlock({from: creator}).should.be.fulfilled;
    const tokenAmount = new BigNumber(1000);
    await token.transfer(accounts[1], tokenAmount, {from: creator}).should.be.fulfilled;
    (await token.balanceOf(accounts[1])).should.be.bignumber.equal(tokenAmount);
  });

  it('should not #transferFrom before the owner unlock the Token', async function () {
    await token.transferFrom(from, to, new BigNumber(10), {from: creator}).should.be.rejected;
  });

  it('should #transferFrom after the owner unlock the Token', async function () {
    const tokenAmount = new BigNumber(10);
    await token.unlock({from: creator}).should.be.fulfilled;
    await token.transfer(from, tokenAmount, {from: creator}).should.be.fulfilled;
    await token.approve(creator, tokenAmount, {from: from}).should.be.fulfilled;
    (await token.allowance(from, creator)).should.be.bignumber.equal(tokenAmount);
    await token.transferFrom(from, to, tokenAmount, {from: creator}).should.be.fulfilled;
  });
});
