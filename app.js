/* A quite detailed WebSockets example */

const uWS = require('uWebSockets.js');
const config = require('./config').defaultConfig;
const utils = require('./utils');
const handlers = require('./handlers');
const Hub = require('./hub');

const hub = new Hub();

const app = uWS.SSLApp({
    key_file_name: config.keyFileName,
    cert_file_name: config.certFileName,
}).ws('/*', {
    /* Options */
    compression: 0,
    maxPayloadLength: config.maxPayloadLength,
    // idleTimeout: 10,
    /* Handlers */
    open: (ws, req) => {
        // console.log('A WebSocket connected via URL: ' + req.getUrl() + '!');
        let id = utils.getQuery(req.getQuery(), 'id');
        if (id == null) {
            return
        }
        ws.id = id;

        handlers.handleJoin(ws, hub);
    },
    message: (ws, message, isBinary) => {
        /* Ok is false if backpressure was built up, wait for drain */
        // let ok = ws.send(message, isBinary);
        // console.log(JSON.stringify(message))

        if (isBinary) return;

        let buf = Buffer.from(message);

        // console.log(buf.toString());

        const msg = JSON.parse(buf.toString());

        switch (msg.action) {
            case 'signal':
                handlers.handleSignal(ws, msg, hub);
                break;
            default:
        }

    },
    drain: (ws) => {
        // console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {

        // console.log(ws.id + ' leave');

        handlers.handleLeave(ws, hub);
    }
}).any('/*', (res, req) => {
    res.end('Nothing to see here!');
}).get('/count', (res, req) => {
    res.writeHeader('Access-Control-Allow-Origin', '*');
    res.end(hub.count + '');
})
    .listen(config.port, (token) => {
    if (token) {
        console.log('Listening to port ' + config.port);
    } else {
        console.log('Failed to listen to port ' + config.port);
    }
});
