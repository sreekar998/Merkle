const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

let whitelistAddresses = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
    "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
];


//map() will create an array
//We are creating array of hash of all the white list addresses
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));

//Create merkle tree formed from the addresses using merkletreejs library
const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs : true});

const buff = x => '0x' + x.toString('hex')

//Get root hash of the merkle tree in hexa decimal format 0x
const RootHash = buff(merkleTree.getRoot());

console.log("merkle tree for whitelist addresses", merkleTree.toString());
console.log("Root hash is", RootHash);

//Check if the claiming address is in the merkleProof(whielist) or not:
const claimingAddress = leafNodes[3];

//getHexProof is used to get all the parent and neighbour nodes that will be required to derive merkle root hash
const hexProof = merkleTree.getHexProof(claimingAddress);

//returns neighbour nodes
console.log(hexProof);

//returns whether the address is whitelisted(in the merkle tree) or not
console.log(merkleTree.verify(hexProof, claimingAddress,  RootHash));

