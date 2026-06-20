import java.util.regex.Matcher;
import java.util.regex.Pattern;

class Solution {
    public int solution(String my_string) {
        Pattern pattern = Pattern.compile("\\d+");
        Matcher matcher = pattern.matcher(my_string);

        int sum = 0;

        while (matcher.find()) {
            sum += Integer.parseInt(matcher.group());
        }

        return sum;
    }
}