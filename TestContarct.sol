// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract DemoAddress {
    address myAddress = "address of the msg.sender";

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
