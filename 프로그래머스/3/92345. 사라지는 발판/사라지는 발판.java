class Result {
    private boolean isWin; // 승리 여부 상태 정보
    private int moveCnt; // 움직임 횟수 상태 정보

    public Result(boolean isWin, int moveCnt) {
        this.isWin = isWin;
        this.moveCnt = moveCnt;
    }

    public int getMoveCnt() {
        return moveCnt;
    }

    public boolean getIsWin() {
        return isWin;
    }
}

class Solution {

    private static final int DIR_SIZE = 4;

    private int boardX, boardY;

    private int[] dx = {1, 0, -1, 0};
    private int[] dy = {0, 1, 0, -1};

    public int solution(int[][] board, int[] aloc, int[] bloc) {
        boardX = board.length;
        boardY = board[0].length;

        return move(board, aloc[0], aloc[1], bloc[0], bloc[1]).getMoveCnt(); // A부터 시작
    }

    private Result move(int[][] board, int ax, int ay, int bx, int by) {
        if (isEnded(board, ax, ay)) {
						// 이동할 수 없는 경우 -> 현재 플레이어가 지는 걸 의미, 현재 플레이어는 움직이지 않음.
						// 그래서 false와 움직임 횟수 0을 반환.
            return new Result(false, 0);
        }

        if (ax == bx && ay == by) {
						// 같은 위치에 두 플레이어가 모인 경우, 현재 플레이어가 이기는 것을 의미.
						// 그래서 true와 한 번 움직이면 이기는 거니까 움직임 횟수 1을 반환.
            return new Result(true, 1);
        }

        boolean canWin = false; // 갈 수 있는 경로들 중 승리하는 경우가 하나라도 존재하는지
																// 체크하기 위함.
        int maxValue = -1; // 갈 수 있는 경로 중 승리하는 경우가 존재하지 않으면 
													 // 최대한 오래 버티기
        int minValue = Integer.MAX_VALUE; // 갈 수 있는 경로 중 승리하는 경우가 존재하면
																					// 최대한 빨리 끝내기
        board[ax][ay] = 0; // 현재 위치의 발판 없애기

        for (int i = 0; i < DIR_SIZE; i++) { // 상하좌우
            int nx = ax + dx[i];
            int ny = ay + dy[i];

            if (!inRange(nx, ny) || board[nx][ny] == 0) // 다음 발판으로 갈 수 있는지 체크
                continue;

            Result nextResult = move(board, bx, by, nx, ny);
						// A가 했으면 B, B가 했으면 A -> ax, ay, bx, by의 위치를 바꿔서 넣어줌.

            if (nextResult.getIsWin()) { // 상대 플레이어가 이기면 현재 플레이어는 짐.
								// 다음 갈 수 있는 모든 경로 중 승리하는 경우가 하나도 존재하지 않는 경우
								// 최대한 오래 버티기 위해서 이동 횟수를 최대로 선택.
                maxValue = Math.max(maxValue, nextResult.getMoveCnt());
            } else { // 상대 플레이어가 지면 현재 플레이어는 이김.
								// 다음 갈 수 있는 모든 경로 중 승리하는 경우가 하나라도 존재하는 경우
                canWin = true; // 상태를 전달하기 위해 canWin을 true로 변경.
								// 최대한 빨리 끝내기 위해서 이동 횟수를 최소로 선택.
                minValue = Math.min(minValue, nextResult.getMoveCnt());
            }
        }

        board[ax][ay] = 1; // 재귀를 빠져나가기 위해서 없앴던 발판 돌려기
				// canWin이 true면 이길 수 있기에 minValue 값 이용.
				// canWin이 false면 이길 수 없기에 maxValue 값 이용.
        return new Result(canWin, (canWin ? minValue : maxValue) + 1);
    }

    private boolean isEnded(int[][] board, int x, int y) {
        for (int i = 0; i < DIR_SIZE; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if (inRange(nx, ny) && board[nx][ny] == 1)
                return false;
        }
        return true;
    }

    private boolean inRange(int x, int y) {
        return 0 <= x && x < boardX && 0 <= y && y < boardY;
    }
}