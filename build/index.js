"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.journeyDistance = void 0;
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
// Number of routes between two towns/nodes
// Shortest route between two towns/nodes
journeyDistance('A-B-C');
