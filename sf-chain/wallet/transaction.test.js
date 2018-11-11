const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
  let transaction, wallet, recipient, amount;

  beforeEach( () => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
    console.log(transaction.outputs[0]);
    console.log(transaction.outputs[1]);
  });

  it('outputs the `amount` subtracted from the wallect balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
    .toEqual(wallet.balance - amount);
  });

  it('outputs the `amount` added to the recipent', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
    .toEqual(amount);
  });

});
