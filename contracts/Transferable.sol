pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


/**
 * @title Transferable
 */
contract Transferable is Ownable {
    bool public isLock;

    mapping (address => bool) public transferableAddresses;

    function Transferable() public {
        isLock = true;
    }

    event Unlock();
    event TransferableAddressAdded(address indexed addr);
    event TransferableAddressRemoved(address indexed addr);

    modifier onlyTransferable() {
        require(!isLock || transferableAddresses[msg.sender]);
        _;
    }

    function unlock() public onlyOwner {
        isLock = false;
        emit Unlock();
    }

    function addTransferableAddresses(address[] addrs) public onlyOwner returns(bool success) {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (addTransferableAddress(addrs[i])) {
                success = true;
            }
        }
    }

    function addTransferableAddress(address addr) public onlyOwner returns(bool success) {
        if (!transferableAddresses[addr]) {
            transferableAddresses[addr] = true;
            emit TransferableAddressAdded(addr);
            success = true;
        }
    }

    function removeTransferableAddresses(address[] addrs) public onlyOwner returns(bool success) {
        for (uint256 i = 0; i < addrs.length; i++) {
            if (removeTransferableAddress(addrs[i])) {
                success = true;
            }
        }
    }

    function removeTransferableAddress(address addr) public onlyOwner returns(bool success) {
        if (transferableAddresses[addr]) {
            transferableAddresses[addr] = false;
            emit TransferableAddressRemoved(addr);
            success = true;
        }
    }
}
