pragma solidity ^0.4.21;

import "../Transferable.sol";


contract TransferableMock is Transferable {

    function onlyTransferableCanDoThis() public onlyTransferable {
    }
}
