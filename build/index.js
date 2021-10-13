"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.journeysBetweenTowns = exports.journeyDistance = void 0;
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
function journeyDistance(journey) {
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
                console.log(route);
                if (!route)
                    throw new Error('NO SUCH ROUTE');
                journeyRoutes.push(route);
            }
        });
    }
    catch (e) {
        return e.message;
    }
    let journeyDistance = 0;
    journeyRoutes.forEach(r => journeyDistance += r.distance);
    return journeyDistance;
}
exports.journeyDistance = journeyDistance;
class Journey {
    constructor(routes = []) {
        this.routes = routes;
    }
    lastRoute() {
        return this.routes[this.routes.length - 1];
    }
    routesAsString() {
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
// Number of routes between two towns/nodes (+ with exact number of stops/towns)
function journeysBetweenTowns(start, end) {
    // Find routes with start
    // Find routes with end
    // routes
    // Starting routes, map to Journeys
    // Queue of journeys (paths)
    return 0;
}
exports.journeysBetweenTowns = journeysBetweenTowns;
function getJourneysByStops(start, stops) {
    let journeys = getRoutesByStart(start)
        .map(x => new Journey([x]));
    while (stops > 1) {
        console.log(stops);
        console.log('journeys', journeys);
        let q = [];
        journeys.forEach(j => {
            q.push(...getNextJourneyOptions(j));
        });
        console.log('q', q);
        journeys = q;
        stops--;
    }
    console.log('final journeys', journeys);
    journeys.forEach(j => console.log(j.routesAsString()));
}
function getRoutesByStart(start) {
    return routes.filter(x => x.start === start);
}
// Return Journeys with all possible next Routes added
function getNextJourneyOptions(j) {
    let ops = [];
    let lastRoute = j.lastRoute();
    if (lastRoute) { // Handle possible undefined
        let nextRoutes = getRoutesByStart(lastRoute.end);
        // console.log(nextRoutes);
        nextRoutes.forEach(nr => {
            ops.push(new Journey([...j.routes, nr]));
        });
    }
    return ops;
}
getJourneysByStops('C', 3);
// Shortest route between two towns/nodes
