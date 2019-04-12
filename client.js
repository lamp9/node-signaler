
module.exports = class  {

    constructor(id, ws) {

        this._peerId = id;
        this._ws = ws;
        this._connected = true;
    }


    get peerId() {
        return this._peerId;
    }

    get connected() {
        return this._connected;
    }


    send(msg) {
        if (!this._connected) return false;
        let msgStr = JSON.stringify(msg);
        this._ws.send(msgStr);
        return true;
    }

    destroy() {
        this._connected = false;
    }
};