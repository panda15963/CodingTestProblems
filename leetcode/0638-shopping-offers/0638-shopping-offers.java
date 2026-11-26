class Solution {
    // Number of bits used to store each item's quantity in the bitmask
    private final int BITS_PER_ITEM = 4;
    // Number of different items
    private int numItems;
    // Individual prices for each item
    private List<Integer> itemPrices;
    // Special offers (each offer contains quantities for each item and the offer price at the end)
    private List<List<Integer>> specialOffers;
    // Memoization map: key is the bitmask representing current needs, value is minimum cost
    private Map<Integer, Integer> memo = new HashMap<>();

    /**
     * Finds the lowest price to fulfill the shopping needs using special offers
     * @param price List of prices for each item
     * @param special List of special offers (each offer: [item1_qty, item2_qty, ..., offer_price])
     * @param needs List of quantities needed for each item
     * @return Minimum cost to buy all needed items
     */
    public int shoppingOffers(
        List<Integer> price, List<List<Integer>> special, List<Integer> needs) {
        numItems = needs.size();
        this.itemPrices = price;
        this.specialOffers = special;
      
        // Encode the needs into a bitmask where each item's quantity occupies 4 bits
        int needsMask = 0;
        for (int i = 0; i < numItems; ++i) {
            needsMask |= needs.get(i) << (i * BITS_PER_ITEM);
        }
      
        return dfs(needsMask);
    }

    /**
     * Recursive DFS with memoization to find minimum cost for current needs
     * @param currentNeeds Bitmask representing current shopping needs
     * @return Minimum cost to fulfill the current needs
     */
    private int dfs(int currentNeeds) {
        // Check if we've already computed the result for this state
        if (memo.containsKey(currentNeeds)) {
            return memo.get(currentNeeds);
        }
      
        // Calculate base cost: buy all remaining items at individual prices
        int minCost = 0;
        for (int i = 0; i < numItems; ++i) {
            // Extract quantity for item i from the bitmask (use 0xf to get 4 bits)
            int quantity = (currentNeeds >> (i * BITS_PER_ITEM)) & 0xf;
            minCost += itemPrices.get(i) * quantity;
        }
      
        // Try each special offer to see if it reduces the cost
        for (List<Integer> offer : specialOffers) {
            int remainingNeeds = currentNeeds;
            boolean canApplyOffer = true;
          
            // Check if we can apply this offer (have enough of each item)
            for (int j = 0; j < numItems; ++j) {
                int currentQuantity = (currentNeeds >> (j * BITS_PER_ITEM)) & 0xf;
                int offerQuantity = offer.get(j);
              
                if (currentQuantity < offerQuantity) {
                    canApplyOffer = false;
                    break;
                }
                // Subtract the offer quantities from remaining needs
                remainingNeeds -= offerQuantity << (j * BITS_PER_ITEM);
            }
          
            // If offer is applicable, calculate cost with this offer
            if (canApplyOffer) {
                int offerPrice = offer.get(numItems); // Last element is the offer price
                minCost = Math.min(minCost, offerPrice + dfs(remainingNeeds));
            }
        }
      
        // Store the result in memo and return
        memo.put(currentNeeds, minCost);
        return minCost;
    }
}
