class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
            List<String> res = new ArrayList<>();
        List<String> line = new ArrayList<>();
        int wordsLen = 0;
        int spaces = 0 ;
        int remain = 0;
        int lastRowSpace = 0;
        String lastLine = "";
        StringBuilder lineStr;

        for (String word : words) {
            int fullLen = wordsLen + line.size() - 1; // 단어길이 + 최소의 공백을 포함한 길이

            if (fullLen + word.length() + 1 > maxWidth) {
                spaces = (maxWidth - wordsLen) / Math.max(1, line.size() - 1); // 0으로 나눠지는 것을 방지하기 위함.
                remain = (maxWidth - wordsLen) % Math.max(1, line.size() - 1);

                lineStr = new StringBuilder();

                for (int j = 0; j < line.size(); j++) {
                    lineStr.append(line.get(j));

                    if (line.size() == 1) {
                        lineStr.append(" ".repeat(spaces));
                    }

                    if (j < line.size() - 1) { // 마지막 단어 전까지만 공백을 더함
                        int spaceToAppend = spaces; // 기본 공백 추가
                        if (remain > 0) {
                            spaceToAppend += 1; // remain이 남아있으면 공백 하나 추가
                            remain--; // 추가한 후에는 remain 감소
                        }

                        lineStr.append(" ".repeat(spaceToAppend));
                    }
                }
                res.add(lineStr.toString());
                line.clear();
                wordsLen = 0;
            }

            line.add(word);
            wordsLen += word.length();
        }

        // 마지막 줄 처리
        lastLine = String.join(" ", line);
        lastRowSpace = maxWidth - lastLine.length();
        res.add(lastLine + " ".repeat(lastRowSpace));

        return res;
    }
}