// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.12;

import "../libraries/SafeMath.sol";
import "./../TestERC20.sol";

contract WBTC is TestERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimal_
    ) public TestERC20(name_, symbol_, decimal_) {}
}
