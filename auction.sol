// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Auction{
    uint public numA;
    uint public numB;
    uint public numC;
    uint public numD;

    function addLikeA() public {
        numA++;
    }
        function addLikeB() public {
        numB++;
    }
        function addLikeC() public {
        numC++;
    }
        function addLikeD() public {
        numD++;
    }

    function reviewA() public view returns(uint){
        return numA;
    }
        function reviewB() public view returns(uint){
        return numB;
    }
        function reviewC() public view returns(uint){
        return numC;
    }
        function reviewD() public view returns(uint){
        return numD;
    }


}