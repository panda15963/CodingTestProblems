function solution(arr) {
  const answer = [];
  let prev = arr[0];
  answer.push(prev);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== prev) {
      answer.push(arr[i]);
      prev = arr[i];
    }
  }

  return answer;
}
