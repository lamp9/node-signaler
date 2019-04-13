
module.exports = (ws, msg, hub) => {

    let id = ws.id;
    let toPeerId = msg.to_peer_id;
    let client = hub.getClient(id);
    let peerClient = hub.getClient(toPeerId);
    if (!peerClient) {
        // console.log('peer not found');
        client.send({
            action: 'signal',
            from_peer_id: toPeerId,
        })
    } else {
        peerClient.send({
            action: 'signal',
            from_peer_id: id,
            data: msg.data,
        })
    }
};