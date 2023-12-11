// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import "./pool/ICarrotPoolImmutables.sol";
import "./pool/ICarrotPoolState.sol";
import "./pool/ICarrotPoolDerivedState.sol";
import "./pool/ICarrotPoolActions.sol";
import "./pool/ICarrotPoolOwnerActions.sol";
import "./pool/ICarrotPoolEvents.sol";

/// @title The interface for a Uniswap V3 Pool
/// @notice A Uniswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface ICarrotPool is
    ICarrotPoolImmutables,
    ICarrotPoolState,
    ICarrotPoolDerivedState,
    ICarrotPoolActions,
    ICarrotPoolOwnerActions,
    ICarrotPoolEvents
{

}
