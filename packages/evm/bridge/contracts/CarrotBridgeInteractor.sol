// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

import "./libraries/Ownable.sol";
import "./interfaces/CarrotBridgeInterfaces.sol";
import "./interfaces/CarrotBridgeInteractorErrors.sol";
import "./CarrotBridgeConnector.base.sol";

abstract contract CarrotBridgeInteractor is Ownable, CarrotBridgeInteractorErrors {
    bytes32 constant ZERO_BYTES = keccak256(new bytes(0));
    uint256 internal immutable currentChainId;
    CarrotBridgeConnectorBase public immutable connector;

    /**
     * @dev Maps a chain id to its corresponding address of the MultiChainSwap contract
     * The address is expressed in bytes to allow non-EVM chains
     * This mapping is useful, mainly, for two reasons:
     *  - Given a chain id, the contract is able to route a transaction to its corresponding address
     *  - To check that the messages (onBridgeMessage, onBridgeRevert) come from a trusted source
     */
    mapping(uint256 => address) public interactorsByChainId;

    modifier isValidMessageCall(CarrotBridgeInterfaces.BridgeMessage calldata bridgeMessage) {
        _isValidCaller();
        if ((bridgeMessage.txSenderAddress) != (interactorsByChainId[bridgeMessage.sourceChainId]))
            revert InvalidBridgeMessageCall();
        _;
    }

    modifier isValidRevertCall(CarrotBridgeInterfaces.BridgeRevert calldata bridgeRevert) {
        _isValidCaller();
        if (bridgeRevert.txSenderAddress != address(this)) revert InvalidBridgeRevertCall();
        if (bridgeRevert.sourceChainId != currentChainId) revert InvalidBridgeRevertCall();
        _;
    }

    constructor(address carrotBridgeConnectorAddress) {
        if (carrotBridgeConnectorAddress == address(0)) revert CommonErrors.InvalidAddress();
        currentChainId = block.chainid;
        connector = CarrotBridgeConnectorBase(carrotBridgeConnectorAddress);
    }

    function _isValidCaller() private view {
        if (msg.sender != address(connector)) revert InvalidCaller(msg.sender);
    }

    /**
     * @dev Useful for contracts that inherit from this one
     */
    function _isValidChainId(uint256 chainId) internal view returns (bool) {
        return ((interactorsByChainId[chainId]) != address(0));
    }

    function setInteractorByChainId(
        uint256 destinationChainId,
        address contractAddress
    ) external onlyOwner {
        interactorsByChainId[destinationChainId] = contractAddress;
    }
}
