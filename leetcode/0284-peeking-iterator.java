// Java Iterator interface reference:
// https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html

/**
 * PeekingIterator extends the Iterator interface with a peek() operation.
 * This allows viewing the next element without consuming it from the iterator.
 */
class PeekingIterator implements Iterator<Integer> {
    // The underlying iterator that provides the actual elements
    private Iterator<Integer> iterator;
  
    // Flag to track whether we have a peeked element cached
    private boolean hasPeeked;
  
    // Cache for storing the peeked element
    private Integer peekedElement;

    /**
     * Constructor initializes the PeekingIterator with a given iterator.
     * @param iterator The underlying iterator to wrap
     */
    public PeekingIterator(Iterator<Integer> iterator) {
        this.iterator = iterator;
        this.hasPeeked = false;
        this.peekedElement = null;
    }

    /**
     * Returns the next element in the iteration without advancing the iterator.
     * Multiple consecutive calls to peek() should return the same element.
     * @return The next element that would be returned by next()
     */
    public Integer peek() {
        // If we haven't peeked yet, fetch the next element and cache it
        if (!hasPeeked) {
            peekedElement = iterator.next();
            hasPeeked = true;
        }
        // Return the cached peeked element
        return peekedElement;
    }

    /**
     * Returns the next element in the iteration and advances the iterator.
     * @return The next element in the iteration
     */
    @Override
    public Integer next() {
        // If we haven't peeked, directly return from the underlying iterator
        if (!hasPeeked) {
            return iterator.next();
        }
      
        // If we have peeked, return the cached element and reset the peek state
        Integer result = peekedElement;
        hasPeeked = false;
        peekedElement = null;
        return result;
    }

    /**
     * Returns true if the iteration has more elements.
     * @return true if there are more elements, false otherwise
     */
    @Override
    public boolean hasNext() {
        // We have next if either we have a peeked element or the underlying iterator has next
        return hasPeeked || iterator.hasNext();
    }
}
