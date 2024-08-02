// SPDX-License-Identifier: GPL-3.0

pragma solidity =0.6.12;

interface IFeeGovernance {
    function getFee(address pairAddress) external view returns (uint);
    function getTreasury() external view returns (address);
}