
module.exports = (ws, hub) => {

    let client = hub.getClient(ws.id);
    hub.remove(ws.id);
    if (client) {
        client.destroy();
    }
};