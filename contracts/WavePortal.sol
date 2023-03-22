// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal{
    uint256  totalWaves;
    event NewWave(address indexed from, uint256 timestamp,string message);
    struct Wave{
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;


    mapping(address=>uint) ownerToWaveCount;
    constructor() payable{
        console.log("Yooo hooo, I am a contract I am version 2.0");
    }

    function wave(string memory _message) public{
        totalWaves+=1;
        console.log("%s has waved with message %s", msg.sender, _message);
        ownerToWaveCount[msg.sender] += totalWaves;

        waves.push(Wave(msg.sender,_message,block.timestamp));

        emit NewWave(msg.sender,block.timestamp,_message);

        uint256 prizeAmount= 0.0001 ether;
        require(prizeAmount<=address(this).balance,"Trying to withdraw money more than contract has.");

        (bool success,)=(msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }
 
    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves( ) public view returns(uint256){
        console.log("We have %d total waves!",totalWaves);
        return totalWaves;
    }
}
