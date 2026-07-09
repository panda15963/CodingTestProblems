function solution(a, b) {
// 윤년: 2원 29일 까지 있고, 1년 366일
  let month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let day = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  let answer = "";
  let sum = 0;

  for (let i = 0; i < a - 1; i++) {
    sum += month[i];
  }
  sum += b - 1;
  answer = day[sum % 7];
  return answer;
}