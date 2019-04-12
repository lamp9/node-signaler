
module.exports = (ws, msg, hub) => {

    let id = ws.id;
    let toPeerId = msg.to_peer_id;
    let client = hub.get(id);
    let peerClient = hub.get(toPeerId);
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