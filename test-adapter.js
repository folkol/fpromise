var Promise = require('./promise.js');

module.exports.deferred = function () {
    var result = {};
    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};
