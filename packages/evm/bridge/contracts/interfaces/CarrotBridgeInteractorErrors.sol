// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

/**
 * @dev Interface with Bridge Interactor errors
 */
interface CarrotBridgeInteractorErrors {
    // @dev Thrown when try to send a message or tokens to a non whitelisted chain
    error InvalidDestinationChainId();

    // @dev Thrown when the caller is invalid. e.g.: if onBridgeMessage or onBridgeRevert are not called by Connector
    error InvalidCaller(address caller);

    // @dev Thrown when message on onBridgeMessage has the wrong format
    error InvalidBridgeMessageCall();

    // @dev Thrown when message on onBridgeRevert has the wrong format
    error InvalidBridgeRevertCall();
}
