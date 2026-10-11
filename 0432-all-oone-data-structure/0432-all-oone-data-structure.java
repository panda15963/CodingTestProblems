/**
 * Data structure that maintains string counts and provides O(1) operations for:
 * - Incrementing/decrementing a string's count
 * - Getting the string with minimum/maximum count
 * 
 * Uses a doubly-linked list of buckets (nodes) where each bucket contains
 * all strings with the same count, ordered by count value.
 */
class AllOne {
    // Sentinel node for the doubly-linked list (acts as both head and tail marker)
    private Node sentinel;
  
    // Maps each string key to its corresponding bucket node
    private Map<String, Node> keyToNodeMap;

    /**
     * Initializes the data structure with an empty sentinel node
     */
    public AllOne() {
        sentinel = new Node();
        sentinel.next = sentinel;
        sentinel.prev = sentinel;
        keyToNodeMap = new HashMap<>();
    }

    /**
     * Increments the count of the given key by 1
     * If key doesn't exist, initializes it with count 1
     * 
     * @param key The string key to increment
     */
    public void inc(String key) {
        if (!keyToNodeMap.containsKey(key)) {
            // Key doesn't exist - add it with count 1
            if (sentinel.next == sentinel || sentinel.next.count > 1) {
                // Need to create a new node with count 1
                Node newNode = new Node(key, 1);
                keyToNodeMap.put(key, sentinel.insertAfter(newNode));
            } else {
                // A node with count 1 already exists
                sentinel.next.keys.add(key);
                keyToNodeMap.put(key, sentinel.next);
            }
        } else {
            // Key exists - increment its count
            Node currentNode = keyToNodeMap.get(key);
            Node nextNode = currentNode.next;
            int newCount = currentNode.count + 1;
          
            if (nextNode == sentinel || nextNode.count > newCount) {
                // Need to create a new node with the incremented count
                Node newNode = new Node(key, newCount);
                keyToNodeMap.put(key, currentNode.insertAfter(newNode));
            } else {
                // A node with the target count already exists
                nextNode.keys.add(key);
                keyToNodeMap.put(key, nextNode);
            }
          
            // Remove key from current node and clean up if empty
            currentNode.keys.remove(key);
            if (currentNode.keys.isEmpty()) {
                currentNode.removeFromList();
            }
        }
    }

    /**
     * Decrements the count of the given key by 1
     * If count reaches 0, removes the key entirely
     * Assumes the key exists in the data structure
     * 
     * @param key The string key to decrement
     */
    public void dec(String key) {
        Node currentNode = keyToNodeMap.get(key);
      
        if (currentNode.count == 1) {
            // Count becomes 0 - remove the key entirely
            keyToNodeMap.remove(key);
        } else {
            // Decrement the count
            Node previousNode = currentNode.prev;
            int newCount = currentNode.count - 1;
          
            if (previousNode == sentinel || previousNode.count < newCount) {
                // Need to create a new node with the decremented count
                Node newNode = new Node(key, newCount);
                keyToNodeMap.put(key, previousNode.insertAfter(newNode));
            } else {
                // A node with the target count already exists
                previousNode.keys.add(key);
                keyToNodeMap.put(key, previousNode);
            }
        }
      
        // Remove key from current node and clean up if empty
        currentNode.keys.remove(key);
        if (currentNode.keys.isEmpty()) {
            currentNode.removeFromList();
        }
    }

    /**
     * Returns one of the keys with the maximum count
     * Returns empty string if the data structure is empty
     * 
     * @return A string with maximum count, or empty string if none exists
     */
    public String getMaxKey() {
        if (sentinel.prev == sentinel) {
            return "";
        }
        return sentinel.prev.keys.iterator().next();
    }

    /**
     * Returns one of the keys with the minimum count
     * Returns empty string if the data structure is empty
     * 
     * @return A string with minimum count, or empty string if none exists
     */
    public String getMinKey() {
        if (sentinel.next == sentinel) {
            return "";
        }
        return sentinel.next.keys.iterator().next();
    }
}

/**
 * Node class representing a bucket in the doubly-linked list
 * Each node contains all strings with the same count value
 */
class Node {
    // Previous and next pointers for doubly-linked list
    Node prev;
    Node next;
  
    // The count value for all strings in this bucket
    int count;
  
    // Set of all string keys with this count value
    Set<String> keys;

    /**
     * Default constructor for creating the sentinel node
     */
    public Node() {
        this("", 0);
    }

    /**
     * Constructor for creating a node with a specific key and count
     * 
     * @param key The initial key to add to this bucket
     * @param count The count value for this bucket
     */
    public Node(String key, int count) {
        this.count = count;
        this.keys = new HashSet<>();
        if (!key.isEmpty()) {
            this.keys.add(key);
        }
    }

    /**
     * Inserts a new node immediately after this node in the linked list
     * 
     * @param nodeToInsert The node to insert after this node
     * @return The inserted node
     */
    public Node insertAfter(Node nodeToInsert) {
        nodeToInsert.prev = this;
        nodeToInsert.next = this.next;
        this.next.prev = nodeToInsert;
        this.next = nodeToInsert;
        return nodeToInsert;
    }

    /**
     * Removes this node from the doubly-linked list
     */
    public void removeFromList() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}

/**
 * Your AllOne object will be instantiated and called as such:
 * AllOne obj = new AllOne();
 * obj.inc(key);
 * obj.dec(key);
 * String param_3 = obj.getMaxKey();
 * String param_4 = obj.getMinKey();
 */
