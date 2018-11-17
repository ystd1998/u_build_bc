const TransactionPool = require('../wallet/transaction-pool');
const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');
const P2pServer = require('./p2p-server')

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();

    // include a reward for the miner
    validTransactions.push(
      Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
    );

    // create a block consisting of the valide transactions
    const block = this.blockchain.addBlock(validTransactions);

    // synchronize chains in the peer-to-peer server
    this.p2pServer.synChains();

    // clear the transaction pool
    this.transactionPool.clear();

    // broadcast to every miner to clear their transaction pools
    this.p2pServer.broadcastClearTransaction();

    return block;
  }
}

module.exports = Miner;