// A Route represents the link between two stations/towns
// - It is also an 'edge' in terms of a directed graph data structure
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

// routes is a directed graph data structure
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

const errmsg = {
    'no_route': 'NO SUCH ROUTE'
};

// Provide journey string, receive distance
// @param journey - eg: 'A-B-C'
export function getJourneyDistance(journey: string): number|string {
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

                if (!route) throw new Error(errmsg.no_route);

                journeyRoutes.push(route);
            }
        });
    } catch(e: any) {
        return e.message;
    }

    let getJourneyDistance = 0;
    journeyRoutes.forEach(r => getJourneyDistance += r.distance);
    return getJourneyDistance;
}

// Return number of possible Journeys between two towns
//
// @param start - Starting town/node
// @param end - Final destination town/node
// @param stops - Maximum amount of stops allowed to reach end
// @param exactStops(optional) - Optionally request only results with the exact number of stops
//                               (overrides default 'stops' functionality)
export function getJourneysBetween(start: string, end: string, stops: number, exactStops: Boolean = false): number {
    if (stops < 1) return 0;

    let journeys: Array<Journey>;

    if (exactStops) {
        journeys = getJourneys(start, stops);
    } else {
        journeys = getJourneys(start, stops, end);
    }

    return journeys.filter(j => end === j.lastRoute().end).length;
}

// Return distance of shortest Journey between two towns
//
// @param start - Starting town/node
// @param end - Final destination town/node
export function getShortestJourneyDistance(start: string, end: string):number|string {
    let journeys = getJourneys(start, routes.length, end); // routes.length is the longest possible Journey

    // Early return if no Journeys
    if (journeys.length === 0) return errmsg.no_route;

    let journeyDistances = journeys.map(j =>
        getJourneyDistance(j.toString())
    );

    return journeyDistances.sort((a: any, b: any) => a - b).shift()
        || errmsg.no_route; // 'OR error' handles potential failure of .shift() (keeps TS happy)
}

// Return all possible Journeys from a start point
// (In effect this is a Breadth First Search algorithm)
//
// @param start - Node to begin search from
// @param stops - Depth/Iterations to which we limit the search
//                (necessary as the data is a Cyclic Directed Graph and could search infinitely)
// @param end (optional) - Optionally cap the search once a specified node is reached
function getJourneys(start: string, stops: number, end?: string): Array<Journey> {
    if (stops < 1) return [];

    let journeys: Array<Journey> = getRoutes(start)
        .map(x => new Journey([x]));

    while(stops > 1) {
        let q: Array<Journey> = [];

        journeys.forEach(j => {
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