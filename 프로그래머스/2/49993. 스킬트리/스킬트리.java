class Solution {

    public int solution(String skill, String[] skill_trees) {

        int answer = 0;
        int lenSkill = skill.length();

        for (String s : skill_trees) {

            int before = -1;
            int[] pos = new int[lenSkill];

            for (int i = 0; i < lenSkill; i++) {
                pos[i] = s.indexOf(skill.charAt(i));

                if (pos[i] == -1) {
                    pos[i] = Integer.MAX_VALUE;
                }
            }

            boolean state = true;

            for (int i = 0; i < lenSkill; i++) {
                if (before <= pos[i]) {
                    before = pos[i];
                } else {
                    state = false;
                    break;
                }
            }

            if (state) {
                answer++;
            }
        }

        return answer;
    }
}