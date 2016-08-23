/* jshint node: true */

function Promise(executor) {
    'use strict';
    var pendingFulfills = [];
    var pendingRejects = [];
    var state = {
        pending: true
    };

    var resolve = value => {
        if (!state.pending) {
            return;
        }
        state.value = value;
        pendingFulfills.forEach(e => e());
        state.pending = false;
    };
    var reject = error => {
        if (state.value || state.error) {
            return;
        }
        state.error = error;
        pendingRejects.forEach(e => e());
        state.pending = false;
    };
    var then = (onFulfilled, onRejected) => {
        'use strict';
        if (state.value) {
            onFulfilled(state.value);
        } else if (state.error) {
            if (typeof onRejected === 'function') {
                onRejected(state.error);
            }
        } else {
            if (typeof onFulfilled === 'function') {
                pendingFulfills.push(onFulfilled);
            }
            if (typeof onRejected === 'function') {
                pendingRejects.push(onRejected);
            }
        }
    };

    executor(resolve, reject);

    return {
        'then': then
    };
}

module.exports = Promise;
