import java.util.*;

class Solution {
    // A, B n개의 주사위
    // 6개 면에 1~n
    int N, win, aWin;
    int[] sol, battleDice, aDice, bDice;
    List<Integer> aSumCombi, bSumCombi;
    boolean[] visit = new boolean[15];
    
    public int lowerBound(List<Integer> arr, int t){
        int s = 0;
        int e = arr.size();
        while(s < e){
            Integer mid = (s+e) / 2;
            if(arr.get(mid) < t) s = mid + 1;
            else e = mid;
        }
        return e;
    }
    
    public void game(List<Integer> aSumCombi, List<Integer> bSumCombi){
        Collections.sort(bSumCombi);
        for(Integer i : aSumCombi){
            aWin = aWin + lowerBound(bSumCombi, i);
        }
    }
    
    public void rollDice(int n, int sum, int[] nowDice, int[][] dice, List<Integer> sumCombi){
        if(n == N/2){
            sumCombi.add(sum);
            return;
        }
        for(int i = 0; i < 6; i++){
            rollDice(n+1, sum + dice[nowDice[n]][i], nowDice, dice, sumCombi);
        }
    }
    
    public void expectGame(int[][] dice){
        aDice = new int[N/2];
        bDice = new int[N/2];
        int aSize = 0, bSize = 0;
        
        for(int i = 0; i < N; i++){
            if(visit[i]) aDice[aSize++] = i;
            else bDice[bSize++] = i;
        }

        aSumCombi = new ArrayList<>(10000);
        bSumCombi = new ArrayList<>(10000);
        
        rollDice(0, 0, aDice, dice, aSumCombi);
        rollDice(0, 0, bDice, dice, bSumCombi);
        
        game(aSumCombi, bSumCombi);
        
        return;
    }
    
    public void combination(int n, int k, int[][] dice){
        if(n == N/2){
            aWin = 0;
            expectGame(dice);
            if(aWin > win){
                for(int i = 0; i < N/2; i++) sol[i] = aDice[i] + 1;
                win = aWin;
            }
            return;
        }
        for(int i = k; i < N; i++){
            visit[i] = true;
            combination(n+1, i+1, dice);
            visit[i] = false;
        }
    }
    public int[] solution(int[][] dice) {
        N = dice.length;
        battleDice = new int[N];
        sol = new int[N/2];
        combination(0, 0, dice);
        return sol;
    }
}