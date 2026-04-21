class Solution {
    public int solution(int[] bandage, int health, int[][] attacks) {
        int maxHealth = health; // 최대 체력 저장
        int currentHealth = health; // 현재 체력
        int currentBandageTime = 0; // 연속 성공 시간
        int lastAttackTime = 0; // 마지막 공격 시간

        for (int[] attack : attacks) {
            int attackTime = attack[0];
            int damage = attack[1];

            // 1. 공격 받지 않은 시간 동안 붕대 감기 회복
            int timeDiff = attackTime - lastAttackTime - 1; // 공격 직전까지의 시간
            for (int i = 0; i < timeDiff; i++) {
                currentBandageTime++;
                currentHealth += bandage[1]; // 초당 회복

                // 붕대 감기 시간 달성 시 추가 회복
                if (currentBandageTime == bandage[0]) {
                    currentHealth += bandage[2];
                    currentBandageTime = 0; // 초기화
                }
                // 최대 체력 초과 불가
                if (currentHealth > maxHealth) currentHealth = maxHealth;
            }

            // 2. 몬스터 공격 처리
            currentHealth -= damage;
            currentBandageTime = 0; // 공격받으면 연속 성공 초기화
            lastAttackTime = attackTime;

            // 3. 사망 여부 체크
            if (currentHealth <= 0) return -1;
        }

        return currentHealth;
    }
}