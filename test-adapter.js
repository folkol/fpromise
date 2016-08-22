var MyPromise = require('./promise.js');

module.exports.deferred = () => ({
    promise: new MyPromise(),
    resolve: () => {},
    reject: () => {}
});
