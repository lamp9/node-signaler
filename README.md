
# node-signaler

High-performance signaling server for [hlsjs-p2p-engine](https://github.com/cdnbye/hlsjs-p2p-engine) written by nodejs which can handle 300k peers on single CPU thanks to [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) I/O backend.

## Build instructions

Node.js 10.x or 11.x is required.

```sh
npm install
npm install -g pm2
```

## Run instructions

```sh
pm2 start app.js -n signaler
```

## Configuration

See [config.js](config.js)