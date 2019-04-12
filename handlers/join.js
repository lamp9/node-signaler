const Client = require('../client');

module.exports = (ws, hub) => {

    let client = new Client(ws.id, ws);
    hub.add(client);

};