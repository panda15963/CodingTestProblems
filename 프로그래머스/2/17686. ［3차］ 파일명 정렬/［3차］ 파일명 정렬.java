import java.util.*;

class Solution {

    static class FileInfo {
        String head;
        int number;
        String tail;
        String original;

        FileInfo(String head, int number, String tail, String original) {
            this.head = head;
            this.number = number;
            this.tail = tail;
            this.original = original;
        }
    }

    public String[] solution(String[] files) {

        List<FileInfo> list = new ArrayList<>();

        for (String file : files) {

            StringBuilder head = new StringBuilder();
            StringBuilder number = new StringBuilder();
            StringBuilder tail = new StringBuilder();

            for (int i = 0; i < file.length(); i++) {

                char ch = file.charAt(i);

                if (!Character.isDigit(ch) && number.length() == 0) {
                    head.append(Character.toLowerCase(ch));
                } else if (Character.isDigit(ch) && tail.length() == 0) {
                    number.append(ch);
                } else {
                    tail.append(ch);
                }
            }

            list.add(new FileInfo(
                    head.toString(),
                    Integer.parseInt(number.toString()),
                    tail.toString(),
                    file
            ));
        }

        list.sort((a, b) -> {
            int cmp = a.head.compareTo(b.head);
            if (cmp != 0) {
                return cmp;
            }
            return Integer.compare(a.number, b.number);
        });

        String[] answer = new String[files.length];

        for (int i = 0; i < list.size(); i++) {
            answer[i] = list.get(i).original;
        }

        return answer;
    }
}