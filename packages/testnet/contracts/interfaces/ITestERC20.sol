// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12;

import "./IERC20.sol";

interface ITestERC20 is IERC20Uniswap {
    function mint(address to, uint amount) external;

    function burn(uint amount) external;
}
