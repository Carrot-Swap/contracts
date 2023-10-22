// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

interface CarrotBridgeInterfaces {
    /**
     * @dev Use SendInput to interact with the Connector: connector.send(SendInput)
     */
    struct SendInput {
        /// @dev Chain id of the destination chain.
        uint256 destinationChainId;
        /// @dev Address receiving the message on the destination chain (expressed in bytes since it can be non-EVM)
        address destinationAddress;
        /// @dev Gas limit for the destination chain's transaction
        uint256 destinationGasLimit;
        /// @dev An encoded, arbitrary message to be parsed by the destination contract
        bytes message;
        /// @dev Optional parameters for the CarrotBridge protocol
        bytes bridgeParams;
    }

    /**
     * @dev Our Connector calls onBridgeMessage with this struct as argument
     */
    struct BridgeMessage {
        address txSenderAddress;
        uint256 sourceChainId;
        address destinationAddress;
        bytes message;
    }

    /**
     * @dev Our Connector calls onBridgeRevert with this struct as argument
     */
    struct BridgeRevert {
        address txSenderAddress;
        uint256 sourceChainId;
        address destinationAddress;
        uint256 destinationChainId;
        bytes message;
    }
}

interface CarrotBridgeConnector {
    /**
     * @dev Sending value and data cross-chain is as easy as calling connector.send(SendInput)
     */
    function send(CarrotBridgeInterfaces.SendInput calldata input) external;
}

interface CarrotBridgeReceiver {
    /**
     * @dev onBridgeMessage is called when a cross-chain message reaches a contract
     */
    function onBridgeMessage(CarrotBridgeInterfaces.BridgeMessage calldata bridgeMessage) external;

    /**
     * @dev onBridgeRevert is called when a cross-chain message reverts.
     * It's useful to rollback to the original state
     */
    function onBridgeRevert(CarrotBridgeInterfaces.BridgeRevert calldata bridgeRevert) external;
}

interface CommonErrors {
    error InvalidAddress();
}
