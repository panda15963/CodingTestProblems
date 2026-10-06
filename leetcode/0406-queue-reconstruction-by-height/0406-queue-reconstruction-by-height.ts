function reconstructQueue(people: number[][]): number[][] {
    // Sort people by height in descending order
    // If heights are equal, sort by k value in ascending order
    // This ensures taller people are placed first, and among same height,
    // those with smaller k values are placed first
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0]; // Sort by height in descending order
        }
        return a[1] - b[1]; // If heights are equal, sort by k in ascending order
    });
  
    // Reconstruct the queue by inserting each person at their k-th position
    // Since we process from tallest to shortest, when we insert a person at position k,
    // there are exactly k people already in the queue who are taller or equal height
    const result: number[][] = [];
  
    for (const person of people) {
        // person[0] is height, person[1] is k value (number of people in front with height >= current)
        // Insert current person at index k in the result queue
        result.splice(person[1], 0, person);
    }
  
    return result;
}
