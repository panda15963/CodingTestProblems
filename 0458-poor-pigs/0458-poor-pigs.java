class Solution {
    public int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
        // Calculate the number of testing rounds possible
        // Each pig can be tested multiple times within the time limit
        // Plus 1 because a pig can also represent the state of "not dying"
        int testRounds = minutesToTest / minutesToDie + 1;
      
        // Initialize the number of pigs needed
        int pigsNeeded = 0;
      
        // Calculate minimum pigs needed using logarithmic approach
        // Each pig can distinguish 'testRounds' different states
        // Total states that can be distinguished = testRounds^pigsNeeded
        // We need testRounds^pigsNeeded >= buckets
        for (int maxDistinguishableBuckets = 1; maxDistinguishableBuckets < buckets; maxDistinguishableBuckets *= testRounds) {
            pigsNeeded++;
        }
      
        return pigsNeeded;
    }
}
