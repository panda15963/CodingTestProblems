function solution(myString, pat) {
  const lastPos = myString.lastIndexOf(pat);
  return myString.slice(0, lastPos + pat.length);
}
