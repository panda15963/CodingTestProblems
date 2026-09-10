public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        
        int start = 1;
        int end = n;
        int mid = 0;
        
        while(start < end) {
            mid = start + (end - start) / 2;
            if(isBadVersion(mid)) { // 현재 버전(mid)이 잘못된 제품인 경우
                end = mid; // mid가 최초의 잘못된 제품이거나, mid 이전에 잘못된 제품이 있을수도 있음
            }
            else { // 현재 버전(mid)이 올바른 제품인 경우 
                start = mid + 1; // mid 이후에 잘못된 버전이 있음
            }
        }
        return start; // start == mid 일때 반복문을 탈출한다. 
    }
}