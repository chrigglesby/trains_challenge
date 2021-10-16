# Trains by Chris

## Running the Project

### Requirements
- npm
- node

### Setup
`npm install` - Install dependencies

### Run
`npm start` - Run project
`npm test` - Run Mocha test suite

## Assumptions
- Strings provided to distance function will always be formatted properly ('A-B-C'); string validation is not handled by my code
- When counting stops, the final stop (which may be the starting stop) is included
- Provided town names are expected to be valid (eg: 'A', 'B', 'C'; NOT 'Q'), but if they are not a reasonable response will be given (eg: 'no route' or 0)
- Responses are generic and don't provide in-depth information;
    - eg: finding a Journey between two valid towns but specifying a maximum number of stops that isn't sufficient will yield 0, it will not specify that a route exists between the stops but doesn't have sufficient stops 
- Number of stops input is expected to be valid, but reasonable responses will be provided if not; eg: negative numbers will yield 0

:egg: