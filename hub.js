
module.exports = class  {

    constructor() {

        this._hub = new Map()             // PeerId -> client

    }

    add(client) {
        if (this._hub.has(client.peerId)) {
            return false
        }
        this._hub.set(client.peerId, client);
        return true
    }

    get(id) {
        if (this._hub.has(id)) {
            return this._hub.get(id)
        }
        return null
    }

    get count() {
        return this._hub.size;
    }

    remove(id) {
        if (this._hub.has(id)) {
            this._hub.delete(id);
        }
    }

    destroy() {
        this._hub = null;
    }

};