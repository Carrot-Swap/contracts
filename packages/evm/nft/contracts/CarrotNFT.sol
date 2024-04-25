// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarrotNFT is ERC1155, Ownable {

    constructor(
        string uri
    ) public ERC1155(uri) Ownable(msg.sender) {}

    function mintBatch(uint256 id, address[] memory accounts) external onlyOwner {
        for(uint256 i = 0; i < accounts.length; i++) {
            _mint(accounts[i], id, 1, bytes(0));
        }
        emit MintBatch(accounts, id);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) external onlyOwner {
        _mint(account, id, amount, data);
    }

    function putUri(string memory uri) external onlyOwner {
        putUri(uri);
    }

    event MintBatch {
        address[] accounts;
        uint256 tokenId;
    }
}
