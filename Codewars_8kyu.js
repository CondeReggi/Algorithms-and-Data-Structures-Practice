/*-Do I get a bonus?-*/

function bonusTime(salary, bonus) {
  return `£${salary}${ bonus ? '0' : '' }`
}

/*-Sum Mixed Array-*/

function sumMix(x){
  const mapeado = x.map(Number);
  return mapeado.reduce((acc, res) => acc + res ,0)
}

/*-Jenny's secret message-*/

function greet(name){
  if(name === "Johnny")
    return "Hello, my love!";
  return "Hello, " + name + "!";
}

/*-Century From Year-*/

function century(year) {
  if(year % 10 === 0){
    return Math.ceil(year / 100)
  }
  return Math.floor(year / 100) + 1
}

/*-Count of positives / sum of negatives-*/

function countPositivesSumNegatives(input) {
  if(!input || input.length === 0) return []
  const mapeadoPositive = input.filter(x => x > 0 && x != 0)
  const mapeadoNegative = input.filter(x => x < 0)
  let arrayResult = [];
  let counter = 0;
  for(let value of mapeadoPositive){
    counter += value;
  }
  arrayResult.push(counter);
  for(let value of mapeadoNegative){
    counter += value;
  }
  arrayResult.push(counter);
  arrayResult[0] += (-1)*arrayResult[1]
  arrayResult[1] = (-1)*mapeadoPositive.length
  console.log(arrayResult)
  return arrayResult.reverse().map(x => x === 0 ? 0 : (-1)*x);
}

/*-Wilson primes-*/

