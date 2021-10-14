const assert = require('assert');
const App = require('../build/index');

describe('journeyDistance', function() {
    describe('A-B-C', function() {
        it('expects 9', function() {
            assert.equal(App.journeyDistance('A-B-C'), 9);
        });
    });

    describe('A-D', function() {
        it('expects 5', function() {
            assert.equal(App.journeyDistance('A-D'), 5);
        });
    });

    describe('A-D-C', function() {
        it('expects 13', function() {
            assert.equal(App.journeyDistance('A-D-C'), 13);
        });
    });

    describe('A-E-B-C-D', function() {
        it('expects 22', function() {
            assert.equal(App.journeyDistance('A-E-B-C-D'), 22);
        });
    });

    describe('A-E-D', function() {
        it('expects no route', function() {
            assert.equal(App.journeyDistance('A-E-D'), 'NO SUCH ROUTE');
        });
    });
});

describe('journeysBetweenTowns', function() {
    describe('C to C, 3 stops max', function() {
        it('expects 2', function() {
            assert.equal(App.journeysBetweenTowns('C', 'C', 3), 2);
        });
    });

    describe('A to C, 4 stops max', function() {
        it('expects 4', function() {
            assert.equal(App.journeysBetweenTowns('A', 'C', 4), 4);
        });
    });

    describe('C to D, 7 stops max', function() {
        it('expects 3', function() {
            assert.equal(App.journeysBetweenTowns('C', 'D', 7), 3);
        });
    });
});