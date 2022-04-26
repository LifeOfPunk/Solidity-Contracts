// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DemoAddress {
    address myAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    function receiveFunds () public payable {
    }

    function getBalance (address targetAddr) public view returns (uint) {
       return targetAddr.balance;
    }

    function transferTo (address targetAddr,uint amount) public {
        address payable _to = payable (targetAddr);
        _to.transfer(amount); 

    }

    

}
