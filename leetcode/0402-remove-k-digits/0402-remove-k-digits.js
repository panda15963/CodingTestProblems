var removeKdigits = function(num, k) {
  //edge case
  if(num.length === k) return "0";
  
  const stack = [];
  for(let i=0; i<num.length; i++){
      while(k>0 && stack[stack.length-1] > num[i]){
          stack.pop();
          k--;
      }
      stack.push(num[i]);
  }
  
  // ex. num = "112" k=1
  while(k>0){
      stack.pop();
      k--;
  }
  
  while(stack.length && stack[0]==="0"){
      stack.shift();
  }
      
  return stack.length ? stack.join("") : "0";
};