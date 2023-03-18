// SPDX-License-Identifier: UNLICENCED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal{
    uint256  totalWaves;
    mapping(address=>uint) ownerToWaveCount;
    constructor(){
        console.log("Yooo hooo, I am a contract I am smart");
    }

    function wave() public{
        totalWaves+=1;
        console.log("%s has waved", msg.sender);
        ownerToWaveCount[msg.sender] += totalWaves;
    }

    function getTotalWaves( ) public view returns(uint256){
        console.log("We have %d total waves!",totalWaves);
        return totalWaves;
    }
}
