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

    describe('Well formatted, non-existant: Q-Q-Q', function() {
        it('expects no route', function() {
            assert.equal(App.getJourneyDistance('Q-Q-Q'), 'NO SUCH ROUTE');
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

    describe('Non-existent towns: Q to Q, 7 stops max', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysBetween('Q', 'Q', 7), 0);
        });
    });

    describe('Valid towns, max stops insufficient: A to C, 1 stop max', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysBetween('A', 'C', 1), 0);
        });
    });

    describe('C to C, -3 stops max', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysBetween('C', 'C', -3), 0);
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

    describe('C to D, -7 stops exact', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysBetween('C', 'D', -7, true), 0);
        });
    });
});

describe('getShortestJourneyDistance', function() {
    describe('A to C', function() {
        it('expects 9', function() {
            assert.equal(App.getShortestJourneyDistance('A', 'C'), 9);
        });
    });

    describe('B to B', function() {
        it('expects 9', function() {
            assert.equal(App.getShortestJourneyDistance('B', 'B'), 9);
        });
    });

    describe('A to B', function() {
        it('expects 5', function() {
            assert.equal(App.getShortestJourneyDistance('A', 'B'), 5);
        });
    });

    describe('E to C', function() {
        it('expects 7', function() {
            assert.equal(App.getShortestJourneyDistance('E', 'C'), 7);
        });
    });

    describe('Q to Q', function() {
        it('expects no route', function() {
            assert.equal(App.getShortestJourneyDistance('Q', 'Q'), 'NO SUCH ROUTE');
        });
    });
});

describe('getJourneysByDistance', function() {
    describe('C to C, distance 27', function() {
        it('expects 7', function() {
            assert.equal(App.getJourneysByDistance('C', 27, 'C'), 7);
        });
    });

    describe('E to E, distance 10', function() {
        it('expects 1', function() {
            assert.equal(App.getJourneysByDistance('E', 10, 'E'), 1);
        });
    });

    describe('E to E, distance 30', function() {
        it('expects 4', function() {
            assert.equal(App.getJourneysByDistance('E', 30, 'E'), 4);
        });
    });

    describe('A to C, distance 12', function() {
        it('expects 1', function() {
            assert.equal(App.getJourneysByDistance('A', 12, 'C'), 1);
        });
    });

    describe('A to C, distance 21', function() {
        it('expects 5', function() {
            assert.equal(App.getJourneysByDistance('A', 21, 'C'), 5);
        });
    });

    describe('A to C, distance 0', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysByDistance('A', 0, 'C'), 0);
        });
    });

    describe('Q to Q, distance 12', function() {
        it('expects 0', function() {
            assert.equal(App.getJourneysByDistance('Q', 12, 'Q'), 0);
        });
    });
});