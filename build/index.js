"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJourneysBetween = exports.getJourneyDistance = void 0;
class Route {
    constructor(start, end, distance) {
        this.start = start;
        this.end = end;
        this.distance = distance;
    }
}
const routes = [
    new Route('A', 'B', 5),
    new Route('B', 'C', 4),
    new Route('C', 'D', 8),
    new Route('D', 'C', 8),
    new Route('D', 'E', 6),
    new Route('A', 'D', 5),
    new Route('C', 'E', 2),
    new Route('E', 'B', 3),
    new Route('A', 'E', 7),
];
// Provide journey string, receive distance
// @param journey - eg: 'A-B-C'
function getJourneyDistance(journey) {
    let journeyRoutes = [];
    const towns = journey.split('-');
    if (towns.length === 1)
        return 0;
    try {
        towns.forEach((town, i) => {
            if (i < towns.length - 1) {
                const start = town;
                const end = towns[i + 1];
                const route = routes.find(r => {
                    return r.start === start && r.end === end;
                });
                if (!route)
                    throw new Error('NO SUCH ROUTE');
                journeyRoutes.push(route);
            }
        });
    }
    catch (e) {
        return e.message;
    }
    let getJourneyDistance = 0;
    journeyRoutes.forEach(r => getJourneyDistance += r.distance);
    return getJourneyDistance;
}
exports.getJourneyDistance = getJourneyDistance;
// A Journey represents multiple Routes strung together
class Journey {
    constructor(routes = []) {
        this.routes = routes;
    }
    lastRoute() {
        if (this.routes.length === 0)
            throw new Error('Journey has no Routes');
        return this.routes[this.routes.length - 1];
    }
    toString() {
        let routeString = '';
        this.routes.forEach((r, i) => {
            const last = i === this.routes.length - 1;
            if (last) {
                routeString += r.start + '-' + r.end;
            }
            else {
                routeString += r.start + '-';
            }
        });
        return routeString;
    }
}
// Return number of possible Journeys between two towns
//
// @param start - Starting town/node
// @param end - Final destination town/node
// @param stops - Maximum amount of stops allowed to reach end
// @param exactStops(optional) - Optionally request only results with the exact number of stops
//                               (overrides default 'stops' functionality)
function getJourneysBetween(start, end, stops, exactStops = false) {
    let journeys;
    if (exactStops) {
        journeys = getJourneys(start, stops);
    }
    else {
        journeys = getJourneys(start, stops, end);
    }
    return journeys.filter(j => end === j.lastRoute().end).length;
}
exports.getJourneysBetween = getJourneysBetween;
// Return all possible Journeys from a start point
// (In effect this is a Breadth First Search algorithm)
//
// @param start - Node to begin search from
// @param stops - Depth/Iterations to which we limit the search
//                (necessary as the data is a Cyclic Directed Graph and could search infinitely)
// @param end (optional) - Optionally cap the search once a specified node is reached
function getJourneys(start, stops, end) {
    let journeys = getRoutes(start)
        .map(x => new Journey([x]));
    while (stops > 1) {
        let q = [];
        journeys.forEach(j => {
            // TODO: Modify to allow NOT ending at end, but continue until stops
            if (end && j.lastRoute().end === end) {
                // End found so push it back as is (exploration over)
                q.push(j);
            }
            else {
                q.push(...getNextJourneyOptions(j));
            }
        });
        journeys = q;
        stops--;
    }
    // journeys.forEach(j => console.log(j.toString()));
    return journeys;
}
// Get Routes by start node
//
// @param start - Start node
function getRoutes(start) {
    return routes.filter(x => x.start === start);
}
// Return Journeys with all possible next Routes added
//
// @param j - The Journey to find next Routes of
function getNextJourneyOptions(j) {
    let ops = [];
    let nextRoutes = getRoutes(j.lastRoute().end);
    nextRoutes.forEach(nr => {
        ops.push(new Journey([...j.routes, nr]));
    });
    return ops;
}
