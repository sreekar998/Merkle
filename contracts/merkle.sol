// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract merkle {
    bytes32 RootHash = 0x53c4e5e25bcbb26b82784b9793d8a74a02719aabab34c2d0358b26231e2f4bbe;

    mapping(address => bool) public Claimed;

    function whitelist(bytes32[] calldata data) public {
        require(!Claimed[msg.sender]);
        bytes32 leaf = keccak256(abi.encode(msg.sender));
       require( MerkleProof.verify(data, RootHash, leaf), "not true");
       Claimed[msg.sender] = true;
    }
}
