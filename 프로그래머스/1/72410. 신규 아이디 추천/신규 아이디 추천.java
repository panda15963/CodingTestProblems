class Solution {

    public String solution(String new_id) {

        // 1단계
        new_id = new_id.toLowerCase();

        // 2단계
        String remove = "~!@#$%^&*()=+[{]}:?,<>/";

        StringBuilder sb = new StringBuilder();

        for (char c : new_id.toCharArray()) {
            if (remove.indexOf(c) == -1) {
                sb.append(c);
            }
        }

        new_id = sb.toString();

        // 3단계
        while (new_id.contains("..")) {
            new_id = new_id.replace("..", ".");
        }

        // 4단계
        while (new_id.startsWith(".")) {
            new_id = new_id.substring(1);
        }

        while (new_id.endsWith(".")) {
            new_id = new_id.substring(0, new_id.length() - 1);
        }

        // 5단계
        if (new_id.length() == 0) {
            new_id = "a";
        }

        // 6단계
        if (new_id.length() >= 16) {
            new_id = new_id.substring(0, 15);

            while (new_id.endsWith(".")) {
                new_id = new_id.substring(0, new_id.length() - 1);
            }
        }

        // 7단계
        while (new_id.length() <= 2) {
            new_id += new_id.charAt(new_id.length() - 1);
        }

        return new_id;
    }
}