import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<Integer> getRow(int rowIndex) {
        if (rowIndex == 0) return List.of(1);
        if (rowIndex == 1) return List.of(1, 1);

        List<Integer> prev = List.of(1, 1);
        for (int i = 2; i <= rowIndex; i++) {
            List<Integer> cur = new ArrayList<>();
            cur.add(1);
            for (int j = 1; j < i; j++) cur.add(prev.get(j - 1) + prev.get(j));
            cur.add(1);
            prev = cur;
        }

        return prev;
    }

}