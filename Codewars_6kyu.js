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

/*-Error correction #1 - Hamming Code-*/

function encode(text) {
  let arr = text.split("").map(x => x.charCodeAt())
  arr = arr.map(x => x.toString(2).padStart(8,"0"))
  arr = arr.map(x => {
    let split = x.split("");
    split = split.map(y => y.repeat(3))
    return split.join("")
  })
  return arr.join("")
}

function separateXCaracters(text, n){
  let result = [];
  for(let i = 0; i < text.length ; i++){
    if((i + 1) % n === 0){ //Cada 8
      const substring = text.substring(((i + 1) - n), i + 1);
      result.push(substring)
    }
  }
  return result;
}

function ocurrs(arr){
  let obj = { 1: 0 , 0: 0 }
  for(let binary of arr.split("")){
    obj[binary] = obj[binary] + 1
  }
  return obj[1] > obj[0] ? 1 : 0
}

function decode(bits) {
  let arr = separateXCaracters(bits, 3).map(x => ocurrs(x))
  let string = separateXCaracters(arr.join(""), 8)
  string = string.map(x => String.fromCharCode(parseInt(x, 2)))
  return string.join("")
}

/*-ASCII Fun #1: X- Shape-*/

function x(n){
  let result = [] 
  for(let i = 1; i <= n; i++)
    result.push(constructorMap(n, i))
  
  return result.join("\n")
}

const constructorMap = (n, index) => {
  let result = "";
  for(let i = 1; i <= n; i++){
    if(i === index || i === (n - index + 1)){
      result += "■";
    }else{
      result += "□";
    }
  }
  return result;
}

/*-The Spider and the Fly (Jumping Spider)-*/

var spiderToFly = function(spider, fly) {
  if(spider === fly)
    return 0;
  
  const numberSpider = parseInt(spider.replace(/^[a-zA-Z]/ig,""));
  const numberFly = parseInt(fly.replace(/^[a-zA-Z]/ig,""));
  
  const numberWordSpider = spider.replace(/^[0-9]/ig,"");
  const numberWordFly = fly.replace(/^[0-9]/ig,"");
                                    
  if((["H","B","D","F"].some(numberWordSpider) && ["H","B","D","F"].some(numberWordFly)) || (["G","A","C","E"].some(numberWordSpider) && ["G","A","C","E"].some(numberWordFly))){
    return numberSpider;
  }
  
  return Math.hypot()
                                    
}

/*-Back and forth then Reverse!-*/

function arrange(s, arr = []) {
  for(let i = 0; i < s.length / 2 ; i++){
    let index = i % 2 === 0 ? i : s.length - i - 1 ;
    const first = s[index];
    const last = s[s.length - index - 1];
    
    if(first || first === 0)
      arr.push(first)
  
    if((last || last === 0) && ((s.length - index - 1) !== index))
      arr.push(last)
  }
  return arr
}

