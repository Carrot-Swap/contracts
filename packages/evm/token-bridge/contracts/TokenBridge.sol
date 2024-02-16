// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

import "@carrot-swap/bridge-evm/contracts/CarrotBridgeInteractor.sol";
import "@carrot-swap/bridge-evm/contracts/interfaces/CarrotBridgeInterfaces.sol";
import "./interfaces/IERC20.sol";

contract TokenBridge is CarrotBridgeInteractor, CarrotBridgeReceiver {
    mapping(uint256 => address) tokenMap;

    constructor(
        address carrotBridgeConnectorAddress
    ) public CarrotBridgeInteractor(carrotBridgeConnectorAddress) Ownable(msg.sender) {}

    function onBridgeMessage(
        CarrotBridgeInterfaces.BridgeMessage calldata message
    ) external override isValidMessageCall(message) {
        (uint256 tokenId, address to, uint256 amount) = abi.decode(
            message.message,
            (uint256, address, uint256)
        );
        mint(message.sourceChainId, message.txSenderAddress, tokenId, to, amount);
    }

    function onBridgeRevert(
        CarrotBridgeInterfaces.BridgeRevert calldata bridgeRevert
    ) external override isValidRevertCall(bridgeRevert) {}

    function mint(
        uint256 sourceChainId,
        address txSenderAddress,
        uint256 tokenId,
        address to,
        uint256 amount
    ) internal {
        require(
            address(connector) == _msgSender() || connector.tssAddress() == _msgSender(),
            "Permission Denied"
        );
        require(tokenId == currentChainId || tokenMap[tokenId] != address(0), "Not valid chain id");
        if (tokenId == currentChainId) {
            payable(to).transfer(amount);
        } else {
            IERC20(tokenMap[tokenId]).mint(to, amount);
        }
        emit Minted(tokenId, to, amount);
    }

    function sendETH(address toAddress, uint256 chainId) external payable {
        require(interactorsByChainId[chainId] != address(0), "Not valid chain id");
        emit Burned(currentChainId, msg.sender, msg.value);
        connector.send(
            CarrotBridgeInterfaces.SendInput({
                destinationChainId: chainId,
                destinationAddress: interactorsByChainId[chainId],
                destinationGasLimit: 0,
                message: abi.encode(currentChainId, toAddress, msg.value),
                bridgeParams: abi.encode("")
            })
        );
    }

    function sendERC20(
        address toAddress,
        uint256 chainId,
        uint256 tokenId,
        uint256 amount
    ) external {
        require(tokenMap[tokenId] != address(0), "Not valid chain id");
        require(interactorsByChainId[chainId] != address(0), "Not valid chain id");
        IERC20(tokenMap[tokenId]).transferFrom(msg.sender, address(this), amount);
        IERC20(tokenMap[tokenId]).burn(amount);
        emit Burned(tokenId, msg.sender, amount);
        connector.send(
            CarrotBridgeInterfaces.SendInput({
                destinationChainId: chainId,
                destinationAddress: interactorsByChainId[chainId],
                destinationGasLimit: 0,
                message: abi.encode(tokenId, toAddress, amount),
                bridgeParams: abi.encode("")
            })
        );
    }

    function setToken(uint256 tokenId, address tokenAddress) external onlyOwner {
        tokenMap[tokenId] = tokenAddress;
    }

    event Minted(uint256 tokenId, address to, uint256 amount);
    event Burned(uint256 tokenId, address from, uint256 amount);

    modifier onlyTssOrConnector() {
        if (address(connector) != _msgSender() && connector.tssAddress() != _msgSender()) {
            revert("Permission Denied");
        }
        _;
    }
}
