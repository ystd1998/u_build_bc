const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// $ HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws:localhost:5001,ws://localhost:5002 num run dev

class P2pserver {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connctSocket(socket));
    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach( peer => {
      // ws://localhost:5001
      const socket = new Websocket(peer);

      socket.on('open', () => this.connctSocket(socket));
    });
  }

  connctSocket(socket) {
    this.sockets.push(socket);
    console.log('Socket connected');

    this.messageHandler(socket);

    tihs.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on('message', message => {
      const data = JSON.parse(message);
      console.log('data', data);

      this.blockchain.replaceChain(data);
    });

    sendChain(socket) {
      socket.send(JSON.stringify(this.blockchain.chain));
    }


    syncChain() {
      this.sockets.forEach(socket => this.sendChain(socket));
    }
  }
}

module.exports = P2pserver;