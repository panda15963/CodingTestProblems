
var scheduleCourse = function(courses) {
    // Sort courses by their deadlines
    courses.sort((a, b) => a[1] - b[1]);

    // Max Heap
    const heap = [];

    // Insert value into Max Heap
    const push = (value) => {
        heap.push(value);

        let i = heap.length - 1;

        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if (heap[parent] >= heap[i]) {
                break;
            }

            [heap[parent], heap[i]] = [heap[i], heap[parent]];
            i = parent;
        }
    };

    // Remove and return the largest value
    const pop = () => {
        if (heap.length === 0) {
            return null;
        }

        if (heap.length === 1) {
            return heap.pop();
        }

        const max = heap[0];
        heap[0] = heap.pop();

        let i = 0;

        while (true) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (
                left < heap.length &&
                heap[left] > heap[largest]
            ) {
                largest = left;
            }

            if (
                right < heap.length &&
                heap[right] > heap[largest]
            ) {
                largest = right;
            }

            if (largest === i) {
                break;
            }

            [heap[i], heap[largest]] = [heap[largest], heap[i]];
            i = largest;
        }

        return max;
    };

    let totalDuration = 0;

    for (const [duration, lastDay] of courses) {
        push(duration);
        totalDuration += duration;

        // Remove the longest course if deadline is exceeded
        if (totalDuration > lastDay) {
            totalDuration -= pop();
        }
    }

    return heap.length;
};
