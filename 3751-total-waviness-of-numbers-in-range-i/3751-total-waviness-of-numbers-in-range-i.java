import java.util.ArrayList;
import java.util.List;

class Solution {
    public int totalWaviness(int num1, int num2) {
        int totalSum = 0;
        
        // Loop through each number in the inclusive range [num1, num2]
        for (int i = num1; i <= num2; i++) {
            totalSum += calculateWaviness(i);
        }
        
        return totalSum;
    }

    private int calculateWaviness(int n) {
        // Numbers with fewer than 3 digits have a waviness of 0
        if (n < 100) {
            return 0;
        }

        // Extract digits and store them in an indexed list
        List<Integer> digits = new ArrayList<>();
        while (n > 0) {
            digits.add(n % 10);
            n /= 10;
        }

        int wavinessCount = 0;
        int size = digits.size();

        // Note: The digits list is collected in reverse order, 
        // but the peak/valley relative relationship between neighbors remains identical.
        for (int i = 1; i < size - 1; i++) {
            int current = digits.get(i);
            int prev = digits.get(i - 1);
            int next = digits.get(i + 1);

            // Check if current digit is a Peak
            if (current > prev && current > next) {
                wavinessCount++;
            }
            // Check if current digit is a Valley
            else if (current < prev && current < next) {
                wavinessCount++;
            }
        }

        return wavinessCount;
    }
}
