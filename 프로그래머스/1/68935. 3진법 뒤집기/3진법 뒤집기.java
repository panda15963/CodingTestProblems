public class Solution {
	public static void main(String[] args) {
		int n = 125;
		System.out.println(solution(n));
	}

	static int solution(int n) {
		int answer = 0;
		long first = toThree(n);
		int idx = 0;
		while (true) {
			long temp = first % 10;
			answer += temp * (int) Math.pow(3, idx);
			if (first < 10) {
				break;
			} else {
				first = first / 10;
				idx++;
			}
		}
		return answer;
	}

	static long toThree(int n) {
		StringBuilder sb = new StringBuilder();
		while (true) {
			int temp = n % 3;
			if (n <= 2) {
				sb.append(n);
				break;
			}
			if (n / 3 == 1) {
				sb.append(temp);
				sb.append(n / 3);
				break;
			} else {
				sb.append(temp);
				n = n / 3;
			}
		}
		return Long.parseLong(sb.toString());
	}
}