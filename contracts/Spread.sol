///SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Spread {
    ERC20 public _token;

    function getToken(ERC20 userToken) public returns(ERC20) {
        _token = userToken;
        return _token;
    }

    function getbalance() 
    public view 
    returns(uint) {
        return _token.balanceOf(msg.sender);
    }

    function getTokenName() 
    public view 
    returns(string memory) {
        return _token.name();
    }

    function getTokenSymbol() 
    public view 
    returns(string memory) {
        return _token.symbol();
    }

    function getContractAddress() 
    public view 
    returns(address) {
        return address(this);
    }


    function batchTransfer(address[] calldata addressesTo, uint256[] calldata amounts) 
    external 
    returns (uint, bool)
    {
        require(addressesTo.length == amounts.length, "Invalid input parameters");

        uint256 sum = 0;
        for(uint256 i = 0; i < addressesTo.length; i++) {
            require(_token.balanceOf(msg.sender) >= amounts[i], "Insufficient funds");
            require(addressesTo[i] != address(0), "Invalid Address");
            require(amounts[i] != 0, "Invalid transfer amount");
            
            require(_token.transferFrom(msg.sender, addressesTo[i], amounts[i]* 10 ** 18), "Unable to transfer token to the account");
            sum += amounts[i];
        }
        return(sum, true);
    }

}