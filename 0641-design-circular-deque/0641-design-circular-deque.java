class MyCircularDeque {
    // Array to store deque elements
    private int[] deque;
    // Index pointing to the front element
    private int frontIndex;
    // Current number of elements in the deque
    private int currentSize;
    // Maximum capacity of the deque
    private int maxCapacity;

    /**
     * Initialize your data structure here. Set the size of the deque to be k.
     * @param k The maximum capacity of the circular deque
     */
    public MyCircularDeque(int k) {
        deque = new int[k];
        frontIndex = 0;
        currentSize = 0;
        maxCapacity = k;
    }

    /**
     * Adds an item at the front of Deque. Return true if the operation is successful.
     * @param value The value to be inserted at the front
     * @return true if insertion is successful, false if deque is full
     */
    public boolean insertFront(int value) {
        // Check if deque is full
        if (isFull()) {
            return false;
        }
      
        // Move front pointer backwards only if deque is not empty
        if (!isEmpty()) {
            // Circular decrement: move front index one position back
            frontIndex = (frontIndex - 1 + maxCapacity) % maxCapacity;
        }
      
        // Insert value at new front position
        deque[frontIndex] = value;
        currentSize++;
        return true;
    }

    /**
     * Adds an item at the rear of Deque. Return true if the operation is successful.
     * @param value The value to be inserted at the rear
     * @return true if insertion is successful, false if deque is full
     */
    public boolean insertLast(int value) {
        // Check if deque is full
        if (isFull()) {
            return false;
        }
      
        // Calculate rear position: front + size gives us the next empty slot
        int rearIndex = (frontIndex + currentSize) % maxCapacity;
        deque[rearIndex] = value;
        currentSize++;
        return true;
    }

    /**
     * Deletes an item from the front of Deque. Return true if the operation is successful.
     * @return true if deletion is successful, false if deque is empty
     */
    public boolean deleteFront() {
        // Check if deque is empty
        if (isEmpty()) {
            return false;
        }
      
        // Move front pointer forward (circular increment)
        frontIndex = (frontIndex + 1) % maxCapacity;
        currentSize--;
        return true;
    }

    /**
     * Deletes an item from the rear of Deque. Return true if the operation is successful.
     * @return true if deletion is successful, false if deque is empty
     */
    public boolean deleteLast() {
        // Check if deque is empty
        if (isEmpty()) {
            return false;
        }
      
        // Simply decrease size, no need to move pointers
        currentSize--;
        return true;
    }

    /**
     * Get the front item from the deque.
     * @return The front element value, or -1 if deque is empty
     */
    public int getFront() {
        if (isEmpty()) {
            return -1;
        }
        return deque[frontIndex];
    }

    /**
     * Get the last item from the deque.
     * @return The rear element value, or -1 if deque is empty
     */
    public int getRear() {
        if (isEmpty()) {
            return -1;
        }
      
        // Calculate rear position: last element is at (front + size - 1)
        int rearIndex = (frontIndex + currentSize - 1) % maxCapacity;
        return deque[rearIndex];
    }

    /**
     * Checks whether the circular deque is empty or not.
     * @return true if deque is empty, false otherwise
     */
    public boolean isEmpty() {
        return currentSize == 0;
    }

    /**
     * Checks whether the circular deque is full or not.
     * @return true if deque is full, false otherwise
     */
    public boolean isFull() {
        return currentSize == maxCapacity;
    }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * MyCircularDeque obj = new MyCircularDeque(k);
 * boolean param_1 = obj.insertFront(value);
 * boolean param_2 = obj.insertLast(value);
 * boolean param_3 = obj.deleteFront();
 * boolean param_4 = obj.deleteLast();
 * int param_5 = obj.getFront();
 * int param_6 = obj.getRear();
 * boolean param_7 = obj.isEmpty();
 * boolean param_8 = obj.isFull();
 */
