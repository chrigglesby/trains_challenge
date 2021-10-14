class Route {
    start: string;
    end: string;
    distance: number;

    constructor(start: string, end: string, distance: number) {
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
export function journeyDistance(journey: string): number|string|Error {
    let journeyRoutes: Array<Route> = [];
    const towns = journey.split('-');

    if (towns.length === 1) return 0;

    try {
        towns.forEach((town, i) => {
            if (i < towns.length - 1) {
                const start = town;
                const end = towns[i + 1];

                const route = routes.find(r => {
                    return r.start === start && r.end === end;
                });

                if (!route) throw new Error('NO SUCH ROUTE');

                journeyRoutes.push(route);
            }
        });
    } catch(e: any) {
        return e.message;
    }

    let journeyDistance = 0;
    journeyRoutes.forEach(r => journeyDistance += r.distance);
    return journeyDistance;
}

// A Journey represents multiple Routes strung together
class Journey {
    routes: Array<Route>;

    constructor(routes: Array<Route> = []) {
        this.routes = routes;
    }

    lastRoute():Route {
        if (this.routes.length === 0) throw new Error('Journey has no Routes');

        return this.routes[this.routes.length - 1];
    }

    toString():string {
        let routeString = '';

        this.routes.forEach((r, i) => {
            const last = i === this.routes.length - 1;

            if (last) {
                routeString += r.start + '-' + r.end;
            } else {
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
export function getJourneysBetween(start: string, end: string, stops: number): number {
    let journeys = getJourneys(start, stops, end);

    return journeys.filter(j => end === j.lastRoute().end).length;
}

// Return all possible Journeys from a start point
// (In effect this is a Breadth First Search algorithm)
//
// @param start - Node to begin search from
// @param stops - Depth/Iterations to which we limit the search
//                (necessary as the data is a Cyclic Directed Graph and could search infinitely)
// @param end (optional) - Optionally cap the search once a specified node is reached
function getJourneys(start: string, stops: number, end?: string): Array<Journey> {
    let journeys: Array<Journey> = getRoutes(start)
        .map(x => new Journey([x]));

    while(stops > 1) {
        let q: Array<Journey> = [];

        journeys.forEach(j => {
            // TODO: Modify to allow NOT ending at end, but continue until stops
            if (end && j.lastRoute().end === end) {
                // End found so push it back as is (exploration over)
                q.push(j);
            } else {
                q.push(...getNextJourneyOptions(j));
            }
        });

        journeys = q;

        stops--;
    }

    journeys.forEach(j => console.log(j.toString()));

    return journeys;
}

// Get Routes by start node
//
// @param start - Start node
function getRoutes(start: string): Array<Route> {
    return routes.filter(x => x.start === start);
}

// Return Journeys with all possible next Routes added
//
// @param j - The Journey to find next Routes of
function getNextJourneyOptions(j:Journey):Array<Journey> {
    let ops:Array<Journey> = [];

    let nextRoutes = getRoutes(j.lastRoute().end);

    nextRoutes.forEach(nr => {
        ops.push(new Journey([...j.routes, nr]));
    });

    return ops;
}
