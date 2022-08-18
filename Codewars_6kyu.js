/*-Number of permutations without repetitions-*/

function perms(elements) {
	let not_repeat = elements.toString().split("");
  let obj = {}
  
  for(let element of not_repeat){
    obj[element] ? obj[element] = obj[element] + 1 : obj[element] = 1;
  }
  
  let nuevo = Object.entries(obj).filter(x => x[1] !== 1 );
  let cantidad = 1;
  
  if(nuevo.length > 0){
    for(let numero of nuevo){
      cantidad *= factorial(numero[1]);
    }
  }
  return BigInt(factorial(not_repeat.length) / cantidad)  
}

function factorial(n){
  if(n === 1) return 1
  return n* factorial(n-1)
}


