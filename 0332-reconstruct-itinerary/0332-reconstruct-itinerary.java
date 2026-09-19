class Solution {
    // Graph adjacency list: maps each airport to list of destinations
    private Map<String, List<String>> adjacencyList = new HashMap<>();
    // Result list to store the final itinerary
    private List<String> itinerary = new ArrayList<>();

    public List<String> findItinerary(List<List<String>> tickets) {
        // Sort tickets in reverse lexicographical order by destination
        // This ensures when we pop from the end, we get lexicographically smallest
        Collections.sort(tickets, (ticket1, ticket2) -> 
            ticket2.get(1).compareTo(ticket1.get(1)));
      
        // Build the graph from tickets
        for (List<String> ticket : tickets) {
            String departure = ticket.get(0);
            String arrival = ticket.get(1);
            // Add arrival airport to the list of destinations from departure airport
            adjacencyList.computeIfAbsent(departure, k -> new ArrayList<>())
                        .add(arrival);
        }
      
        // Start DFS traversal from JFK airport
        dfs("JFK");
      
        // Reverse the result since we build it in reverse order (Hierholzer's algorithm)
        Collections.reverse(itinerary);
        return itinerary;
    }

    /**
     * Performs depth-first search using Hierholzer's algorithm for finding Eulerian path.
     * Visits all edges exactly once and builds the itinerary in reverse order.
     * 
     * @param currentAirport The current airport in the traversal
     */
    private void dfs(String currentAirport) {
        // While current airport has unvisited destinations
        while (adjacencyList.containsKey(currentAirport) && 
               !adjacencyList.get(currentAirport).isEmpty()) {
            // Get and remove the last destination (lexicographically smallest due to reverse sort)
            List<String> destinations = adjacencyList.get(currentAirport);
            String nextAirport = destinations.remove(destinations.size() - 1);
            // Recursively visit the next airport
            dfs(nextAirport);
        }
        // Add current airport to result after visiting all its destinations
        itinerary.add(currentAirport);
    }
}
