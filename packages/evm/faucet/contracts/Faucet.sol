// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./interfaces/IERC20.sol";
import "./libraries/Ownable.sol";

contract Faucet is Ownable {
    mapping(address => uint) cache;
    address[] tokens;
    uint[] amounts;

    constructor(address[] memory _tokens, uint[] memory _amounts) Ownable(msg.sender) {
        tokens = _tokens;
        amounts = _amounts;
    }

    function drip(address payable[] calldata to) public onlyOwner {
        for (uint i = 0; i < to.length; i++) {
            address payable target = to[i];
            for (uint j = 0; j < tokens.length; j++) {
                address token = tokens[j];
                uint amount = amounts[j];
                if (token == address(0)) {
                    target.transfer(amount);
                } else {
                    IERC20(token).transfer(target, amount);
                }
            }
        }
    }

    function witdraw(uint[] calldata amounts2) public onlyOwner {
        for (uint j = 0; j < tokens.length; j++) {
            address token = tokens[j];
            uint amount = amounts2[j];
            if (token == address(0)) {
                payable(msg.sender).transfer(amount);
            } else {
                IERC20(token).transfer(msg.sender, amount);
            }
        }
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
