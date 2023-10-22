// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0;

interface Mintable {
    function mint(address to, uint amount) external;

    function burn(uint amount) external;
}
