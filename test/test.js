const assert = require('assert');
const App = require('../build/index');

describe('getJourneyDistance', function() {
    describe('A-B-C', function() {
        it('expects 9', function() {
            assert.equal(App.getJourneyDistance('A-B-C'), 9);
        });
    });

    describe('A-D', function() {
        it('expects 5', function() {
            assert.equal(App.getJourneyDistance('A-D'), 5);
        });
    });

    describe('A-D-C', function() {
        it('expects 13', function() {
            assert.equal(App.getJourneyDistance('A-D-C'), 13);
        });
    });

    describe('A-E-B-C-D', function() {
        it('expects 22', function() {
            assert.equal(App.getJourneyDistance('A-E-B-C-D'), 22);
        });
    });

    describe('A-E-D', function() {
        it('expects no route', function() {
            assert.equal(App.getJourneyDistance('A-E-D'), 'NO SUCH ROUTE');
        });
    });
});

describe('getJourneysBetween', function() {
    describe('C to C, 3 stops max', function() {
        it('expects 2', function() {
            assert.equal(App.getJourneysBetween('C', 'C', 3), 2);
        });
    });

    describe('A to C, 4 stops max', function() {
        it('expects 4', function() {
            assert.equal(App.getJourneysBetween('A', 'C', 4), 4);
        });
    });

    describe('C to D, 7 stops max', function() {
        it('expects 3', function() {
            assert.equal(App.getJourneysBetween('C', 'D', 7), 3);
        });
    });

    describe('C to C, 3 stops exact', function() {
        it('expects 1', function() {
            assert.equal(App.getJourneysBetween('C', 'C', 3, true), 1);
        });
    });

    describe('A to C, 4 stops exact', function() {
        it('expects 3', function() {
            assert.equal(App.getJourneysBetween('A', 'C', 4, true), 3);
        });
    });

    describe('C to D, 7 stops exact', function() {
        it('expects 4', function() {
            assert.equal(App.getJourneysBetween('C', 'D', 7, true), 4);
        });
    });
});

describe('getShortestJourneyDistance', function() {
    describe('A to C', function() {
        it('expects 9', function() {
            assert.equal(App.getShortestJourneyDistance('A', 'C'), 9);
        });
    });

    describe('C to C, 3 stops max', function() {
        it('expects 9', function() {
            assert.equal(App.getShortestJourneyDistance('B', 'B'), 9);
        });
    });
});