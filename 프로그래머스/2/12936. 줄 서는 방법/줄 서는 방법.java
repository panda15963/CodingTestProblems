class Solution {
	    public int[] solution(int n, long k) {
	        int[] answer = new int[n];
	        boolean[] check = new boolean[n+1];
	        long[] factorial = new long[n];
	        
	        
	        calFactorial(factorial,n);
	        solve(factorial,answer,check,n,n-1,k-1,1);
	    
	        return answer;
	    }

		private void calFactorial(long[] factorial, int n) {
			factorial[0]=1;
			for(int i=1; i<n; i++) {
				factorial[i]=factorial[i-1]*i;
			}
			
		}

		private void solve(long[] factorial, int[] answer,boolean[] check, int len, int n, long k, int idx) {
			//우선 현재  k / n - idx! 을 구해서
			if(n==-1) return;
			long result = k / factorial[n]; //
			answer[idx-1]=selectNum(result,check,len);
			solve(factorial, answer, check, len, n-1, k%factorial[n], idx+1);
		}

		private int selectNum(long result, boolean[] check, int len) {
			for(int i=1; i<=len; i++) {
				if(!check[i]) {
					if(--result==-1) {
						check[i]=true;
						return i;
					}
				}
			}
			return 0;
		}
	}