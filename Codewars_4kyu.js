/*-Next bigger number with the same digits-*/

const permutator = (inputArr, n) => {
  let result = [];
  let min = Number.MAX_SAFE_INTEGER;
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
        const number = Number(m.join(""));
        result.push(m)
        if(number > n && number < min){
          min = number;
        }
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }
 permute(inputArr)
 return min;
}

function nextBigger(n){
  return permutator(n.toString().split(""), n)
}



