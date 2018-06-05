import expectEvent from 'openzeppelin-solidity/test/helpers/expectEvent';
const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const TransferableMock = artifacts.require('TransferableMock');

contract('Transferable', accounts => {
  const [
    owner,
    transferableAddress1,
    transferableAddress2,
    anyone,
    newOwner
  ] = accounts;

  const transferableAddresses = [transferableAddress1, transferableAddress2];

  before(async function () {
    this.mock = await TransferableMock.new();
  });

  it('should add an address to the Transferable', async function () {
    await expectEvent.inTransaction(
      this.mock.addTransferableAddress(transferableAddress1, {from: owner}),
      'TransferableAddressAdded'
    );

    (await this.mock.transferableAddresses(transferableAddress1)).should.be.equal(true);
  });

  it('should add addresses to the Transferable', async function () {
    await expectEvent.inTransaction(
      this.mock.addTransferableAddresses(transferableAddresses, {from: owner}),
      'TransferableAddressAdded'
    );

    for (let addr of transferableAddresses) {
      (await this.mock.transferableAddresses(addr)).should.be.equal(true);
    }
  });

  it('should not announce TransferableAddressAdded event if address is already in the Transferable', async function () {
    const {logs} = await this.mock.addTransferableAddress(transferableAddress1, {from: owner});
    logs.should.be.empty;
  });

  it('should remove an address from the Transferable', async function () {
    await expectEvent.inTransaction(
      this.mock.removeTransferableAddress(transferableAddress1, {from: owner}),
      'TransferableAddressRemoved'
    );
    (await this.mock.transferableAddresses(transferableAddress1)).should.be.equal(false);
  });

  it('should remove addresses from the the Transferable', async function () {
    await expectEvent.inTransaction(
      this.mock.removeTransferableAddresses(transferableAddresses, {from: owner}),
      'TransferableAddressRemoved'
    );
    for (let addr of transferableAddresses) {
      (await this.mock.transferableAddresses(addr)).should.be.equal(false);
    }
  });

  it('should not announce TransferableAddressRemoved event if address is not in the Transferable', async function () {
    const {logs} = await this.mock.removeTransferableAddress(transferableAddress1, {from: owner});
    logs.should.be.empty;
  });

  it('should allow transferable address to call #onlyTransferableCanDoThis', async function () {
    await this.mock.addTransferableAddress(transferableAddress1, {from: owner});
    await this.mock.onlyTransferableCanDoThis({from: transferableAddress1})
      .should.be.fulfilled;
  });

  it('should reject the #addTransferableAddress from anyone', async function () {
    await this.mock.addTransferableAddress(transferableAddress1, {from: anyone}).should.be.rejected;
  });

  it('should reject the #onlyTransferableCanDoThis from anyone', async function () {
    await this.mock.onlyTransferableCanDoThis({from: anyone}).should.be.rejected;
  });

  it('should transferOwnership', async function () {
    await this.mock.transferOwnership(newOwner).should.be.fulfilled;
    (await this.mock.owner()).should.be.equal(newOwner);
  });
});
