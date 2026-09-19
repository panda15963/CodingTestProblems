var findItinerary = function(tickets) {
    const flightGraph = {};

    tickets.sort((ticketA, ticketB) =>
        ticketB[1].localeCompare(ticketA[1])
    );

    for (const [departure, destination] of tickets) {
        if (!flightGraph[departure]) {
            flightGraph[departure] = [];
        }

        flightGraph[departure].push(destination);
    }

    const itinerary = [];

    const traverseFlights = (currentAirport) => {
        while (
            flightGraph[currentAirport] &&
            flightGraph[currentAirport].length > 0
        ) {
            const nextAirport = flightGraph[currentAirport].pop();
            traverseFlights(nextAirport);
        }

        itinerary.push(currentAirport);
    };

    traverseFlights("JFK");

    return itinerary.reverse();
};