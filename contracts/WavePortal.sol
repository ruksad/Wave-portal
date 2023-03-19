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
    constructor(){
        console.log("Yooo hooo, I am a contract I am version 2.0");
    }

    function wave(string memory _message) public{
        totalWaves+=1;
        console.log("%s has waved w/ message %s", msg.sender, _message);
        ownerToWaveCount[msg.sender] += totalWaves;

        waves.push(Wave(msg.sender,_message,block.timestamp));

        emit NewWave(msg.sender,block.timestamp,_message);
    }

    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves( ) public view returns(uint256){
        console.log("We have %d total waves!",totalWaves);
        return totalWaves;
    }
}
