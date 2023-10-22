// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

import "./interfaces/IERC20.sol";

import "./interfaces/ConnectorErrors.sol";
import "./CarrotBridgeConnector.base.sol";
import "./interfaces/CarrotBridgeInterfaces.sol";

/**
 * @dev ETH implementation of CarrotBridgeConnector.
 * This contract manages interactions between TSS and different chains.
 */
contract CarrotBridgeConnectorNonFee is CarrotBridgeConnectorBase {
    constructor(
        address tssAddress_,
        address tssAddressUpdater_,
        address pauserAddress_
    ) CarrotBridgeConnectorBase(tssAddress_, tssAddressUpdater_, pauserAddress_) {}

    /**
     * @dev Entrypoint to send data through CarrotBridge
     * This call locks the token on the contract and emits an event with all the data needed by the protocol.
     */
    function send(CarrotBridgeInterfaces.SendInput calldata input) external override whenNotPaused {
        emit BridgeMessageSent(
            tx.origin,
            msg.sender,
            input.destinationChainId,
            input.destinationAddress,
            input.destinationGasLimit,
            input.message,
            input.bridgeParams
        );
    }

    /**
     * @dev Handler to receive data from other chain.
     * This method can be called only by TSS.
     */
    function onReceive(
        address txSenderAddress,
        uint256 sourceChainId,
        address destinationAddress,
        bytes calldata message,
        bytes32 internalSendHash
    ) external override onlyTssAddress {
        if (message.length > 0) {
            CarrotBridgeReceiver(destinationAddress).onBridgeMessage(
                CarrotBridgeInterfaces.BridgeMessage(
                    txSenderAddress,
                    sourceChainId,
                    destinationAddress,
                    message
                )
            );
        }

        emit BridgeMessageReceived(
            txSenderAddress,
            sourceChainId,
            destinationAddress,
            message,
            internalSendHash
        );
    }

    /**
     * @dev Handler to receive errors from other chain.
     * This method can be called only by TSS.
     */
    function onRevert(
        address txSenderAddress,
        uint256 sourceChainId,
        address destinationAddress,
        uint256 destinationChainId,
        bytes calldata message,
        bytes32 internalSendHash
    ) external override whenNotPaused onlyTssAddress {
        if (message.length > 0) {
            CarrotBridgeReceiver(txSenderAddress).onBridgeRevert(
                CarrotBridgeInterfaces.BridgeRevert(
                    txSenderAddress,
                    sourceChainId,
                    destinationAddress,
                    destinationChainId,
                    message
                )
            );
        }

        emit BridgeMessageReverted(
            txSenderAddress,
            sourceChainId,
            destinationChainId,
            destinationAddress,
            message,
            internalSendHash
        );
    }
}
