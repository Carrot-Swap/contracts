// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

import {IFeeGovernance} from "./IFeeGovernance.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FeeGovernance is Ownable, IFeeGovernance {
    mapping(address => uint256) public fees;
    uint256 public defaultFee = 1e6 / 1000; // 0.1%
    address public tresury;

    constructor() Ownable() public {
        tresury = msg.sender;
    }
    
    function putFee(address pairAddress, uint256 fee) external onlyOwner {
        require(fee <= 1e6 / 10, "fee too high"); // max 10%
        fees[pairAddress] = fee;
    }

    function getFee(address pairAddress) external override view returns (uint) {
        return fees[pairAddress] == 0 ? defaultFee : fees[pairAddress];
    }

    function putDefaultFee(uint256 fee) external onlyOwner {
        require(fee <= 1e6 / 10, "fee too high"); // max 10%
        defaultFee = fee;
    }

    function putTreasury(address _tresury) external onlyOwner {
        tresury = _tresury;
    }

    function getTreasury() external override view returns (address) {
        return tresury;
    }
}