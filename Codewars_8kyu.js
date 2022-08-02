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

/*-Take the Derivative-*/

function derive(coefficient,exponent) {
  let multiplicacion = coefficient * exponent;
  let exponentDerivate = exponent - 1;
  return `${multiplicacion}x^${exponentDerivate}`
}

/*-Count by X-*/

function countBy(x, n) {
  let z = [];
  for(let i = 1; i <= n ; i++){
    z.push(i * x)
  }
  return z;
}

/*-Beginner Series #4 Cockroach-*/

function cockroachSpeed(s) {
  return Math.floor((s / 3.6)*100)
}

/*-Find Nearest square number-*/

function nearestSq(n){
  let truncateOne = Math.floor(Math.sqrt(n));
  let truncateTwo = Math.ceil(Math.sqrt(n));
  
  let firstDiff = Math.abs(Math.pow(truncateOne, 2) - n);
  let secondDiff = Math.abs(Math.pow(truncateTwo, 2) - n);
  
  if(firstDiff <= secondDiff){
    return Math.pow(truncateOne, 2);
  }
  return Math.pow(truncateTwo, 2);
}

/*-Even or Odd-*/

function even_or_odd(number) {
  return number % 2 ? "Odd" : "Even"
}

/*-Quarter of the year-*/

const quarterOf = (month) => {
  if(month <= 12 && month > 9){
    return 4
  }else if(month <= 9 && month > 6){
    return 3
  }else if(month <= 6 && month > 3){
    return 2
  }else{
    return 1
  }
}

/*-Beginner - Lost Without a Map-*/

function maps(x){
  return x.map(x => 2 * x)
}

/*-Online RPG: player to qualifying stage?-*/

function playerRankUp (points) {
  return points >= 100 ? "Well done! You have advanced to the qualifying stage. Win 2 out of your next 3 games to rank up." : false
}

/*-Square(n) Sum-*/

function squareSum(numbers){
  return numbers.reduce((acc, val) => acc + (Math.pow(val,2)), 0)
}

/*-Remove String Spaces-*/

function noSpace(x){
  return Array.from(x).filter(x => x !== " ").join("")
}

/*-Sum of positive-*/

function positiveSum(arr) {
  let suma = 0;
  for(let i = 0; i < arr.length ; i++){
    if(arr[i] > 0){
      suma += arr[i];
    }
  }
  return suma;
}

/*-How good are you really?-*/

function betterThanAverage(classPoints, yourPoints) {
  const average = classPoints.reduce((acc, res) => acc + (res/classPoints.length),0);
  return yourPoints > average ? true : false
}

/*-Convert boolean values to strings 'Yes' or 'No'-*/

function boolToWord( bool ){
  return bool ? "Yes" : "No"
}

/*-Convert a Number to a String!-*/

function numberToString(num) {
  return num.toString()
}

/*-Find Multiples of a Number-*/

function findMultiples(integer, limit) {
  let result = []
  let counter = integer;
  do{
    result.push(counter)
    counter += integer;
  }while(counter <= limit)
  return result;
}

/*-Opposite number-*/

function opposite(number) {
  return (-1)*number
}

/*-Beginner Series #1 School Paperwork-*/

function paperwork(n, m) {
  if(n <= 0 || m <= 0) return 0;
  
  return n*m
}

/*-Geometry Basics: Distance between points in 2D-*/

function distanceBetweenPoints(a, b) {
  const distance = Math.sqrt( Math.pow((a.x - b.x),2) + Math.pow((a.y - b.y),2) );
  return distance
}

/*-FIXME: Replace all dots-*/

var replaceDots = function(str) {
  return str.replace(/[.]/g, '-');
}

