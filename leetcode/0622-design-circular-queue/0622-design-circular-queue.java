class MyCircularQueue {
    // Array to store queue elements
    private int[] queue;
    // Index pointing to the front element of the queue
    private int frontIndex;
    // Current number of elements in the queue
    private int currentSize;
    // Maximum capacity of the queue
    private int maxCapacity;

    /**
     * Initialize the circular queue with size k
     * @param k Maximum capacity of the queue
     */
    public MyCircularQueue(int k) {
        queue = new int[k];
        frontIndex = 0;
        currentSize = 0;
        maxCapacity = k;
    }

    /**
     * Insert an element into the circular queue
     * @param value The value to be inserted
     * @return true if the operation is successful, false if queue is full
     */
    public boolean enQueue(int value) {
        // Check if queue is at maximum capacity
        if (isFull()) {
            return false;
        }
      
        // Calculate the rear position using circular indexing
        int rearIndex = (frontIndex + currentSize) % maxCapacity;
        queue[rearIndex] = value;
        currentSize++;
      
        return true;
    }

    /**
     * Delete an element from the circular queue
     * @return true if the operation is successful, false if queue is empty
     */
    public boolean deQueue() {
        // Check if queue is empty
        if (isEmpty()) {
            return false;
        }
      
        // Move front pointer to next position using circular indexing
        frontIndex = (frontIndex + 1) % maxCapacity;
        currentSize--;
      
        return true;
    }

    /**
     * Get the front item from the queue
     * @return The front element if queue is not empty, -1 otherwise
     */
    public int Front() {
        if (isEmpty()) {
            return -1;
        }
      
        return queue[frontIndex];
    }

    /**
     * Get the last item from the queue
     * @return The rear element if queue is not empty, -1 otherwise
     */
    public int Rear() {
        if (isEmpty()) {
            return -1;
        }
      
        // Calculate the rear position using circular indexing
        int rearIndex = (frontIndex + currentSize - 1) % maxCapacity;
        return queue[rearIndex];
    }

    /**
     * Check whether the circular queue is empty
     * @return true if empty, false otherwise
     */
    public boolean isEmpty() {
        return currentSize == 0;
    }

    /**
     * Check whether the circular queue is full
     * @return true if full, false otherwise
     */
    public boolean isFull() {
        return currentSize == maxCapacity;
    }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * MyCircularQueue obj = new MyCircularQueue(k);
 * boolean param_1 = obj.enQueue(value);
 * boolean param_2 = obj.deQueue();
 * int param_3 = obj.Front();
 * int param_4 = obj.Rear();
 * boolean param_5 = obj.isEmpty();
 * boolean param_6 = obj.isFull();
 */
