/**
 * Finds a valid itinerary that uses all tickets exactly once, starting from JFK.
 * Uses Hierholzer's algorithm to find an Eulerian path in the graph.
 * @param tickets - Array of ticket pairs where each pair is [from, to]
 * @returns Array of airports representing the itinerary
 */
function findItinerary(tickets: string[][]): string[] {
    // Build adjacency list to represent the graph of flights
    const flightGraph: Record<string, string[]> = {};
  
    // Sort tickets in reverse lexicographical order by destination
    // This ensures we visit lexicographically smaller destinations first when popping
    tickets.sort((ticketA, ticketB) => ticketB[1].localeCompare(ticketA[1]));
  
    // Populate the adjacency list with destinations for each departure airport
    for (const [departure, destination] of tickets) {
        if (!flightGraph[departure]) {
            flightGraph[departure] = [];
        }
        flightGraph[departure].push(destination);
    }
  
    // Result array to store the final itinerary
    const itinerary: string[] = [];
  
    /**
     * Depth-first search to traverse all edges (tickets) exactly once
     * @param currentAirport - Current airport in the traversal
     */
    const traverseFlights = (currentAirport: string): void => {
        // Continue while there are unused tickets from current airport
        while (flightGraph[currentAirport] && flightGraph[currentAirport].length > 0) {
            // Pop the last destination (lexicographically smallest due to reverse sort)
            const nextAirport = flightGraph[currentAirport].pop()!;
            // Recursively visit the next airport
            traverseFlights(nextAirport);
        }
        // Add current airport to itinerary after visiting all destinations
        itinerary.push(currentAirport);
    };
  
    // Start the traversal from JFK airport
    traverseFlights('JFK');
  
    // Reverse the itinerary since we built it backwards using post-order traversal
    return itinerary.reverse();
}
