
module.exports = (ws, hub) => {

    let client = hub.get(ws.id);
    hub.remove(ws.id);
    client.destroy();

};