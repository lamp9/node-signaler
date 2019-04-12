
module.exports = {

    getQuery(query, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = query.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    }

};