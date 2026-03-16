class Solution {
    public String solution(String my_string) {
        String vowels = "aeiou";
        return my_string.replaceAll("[aeiou]", "");
    }
}
