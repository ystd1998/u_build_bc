const BlockChain = require('./blockchain');

const bc = new BlockChain();

for (let i=0; i<10; i++) {
  let block = bc.addBlock(`foo ${i}`);
  console.log(block.toString());
}