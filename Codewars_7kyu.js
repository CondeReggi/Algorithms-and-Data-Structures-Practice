/*-Find the next perfect square!-*/

function findNextSquare(sq) {
  const siguiente = Math.sqrt(sq) + 1;
  if(siguiente !== Math.floor(siguiente)) return -1
  
  return Math.pow(siguiente, 2);
}

/*-Reverse list-*/

function reverseList(arr) {
  return arr.reverse();
}

/*-Love vs friendship-*/

function wordsToMarks(s){
  return Array.from(s).map(x => x.charCodeAt(0) - 'a'.charCodeAt(0) + 1).reduce((acc, res) => acc + res, 0)
}

/*-The fusc function -- Part 1-*/

function fusc(n){
  if(n == 0) return 0
  if(n == 1) return 1
  
  if(n % 2 === 0){
    return fusc(n/2)
  }else{
    const value = Math.floor(n/2);
    return fusc(value) + fusc(value + 1)
  }
}

/*-Maximum Triplet Sum (Array Series #7)-*/

function maxTriSum(numbers){
  let obj = {}
  for(let numero of numbers){
    if(!obj[numero]){
      obj[numero] = 1;
    }
  }
  return Object.keys(obj)
    .map(Number)
    .sort((a,b)=>b-a)
    .slice(0,3)
    .reduce((acc, res) => acc + res, 0)
}

/*-Tidy Number (Special Numbers Series #9)-*/

function tidyNumber(n){
  const arr = Array.from(n.toString()).map(Number);
  let value = arr[0];
  for(let i = 1; i < arr.length ; i++){
    if(arr[i] < value){
      return false;
    }else{
      value = arr[i];
    }
  }
  return true;
}

/*-See You Next Happy Year-*/

function nextHappyYear(year){
  let nextYear = year+1;
  
  while (!checkHappyYear(nextYear)){
    nextYear++;
  }
  
  return nextYear;
}

function checkHappyYear(x){
  let y = String(x);
  let map = {};
  
  for (var i = 0; i < y.length; i++) {
    if (map[y[i]]) return false;
    map[y[i]] = 1;
  }
  return true;
}

/*-Two to One-*/

function longest(s1, s2) {
  let obj = {}
 
  for(let i = 0; i < Math.max(s1.length, s2.length) ; i++){
    if(obj[s1[i]]){
      obj[s1[i]] = obj[s1[i]] + 1
    }else{
      obj[s1[i]] = 1;
    }
    
    if(obj[s2[i]]){
      obj[s2[i]] = obj[s2[i]] + 1
    }else{
      obj[s2[i]] = 1;
    }
  }
  
  return Object.keys(obj).filter(x => x !== 'undefined').sort().join('')
}

const longest = (s1, s2) => [...new Set(s1+s2)].sort().join('') // Con Set

/*-Vowel Count-*/

function getCount(str) {
  const vowels = ['a','e','i','o','u'];
  
  return [...str].filter(x => vowels.includes(x)).length
}

/*-Form The Minimum-*/

function minValue(values){
  const unique = [...new Set(values)];
  return parseInt(unique.sort((a,b) => a - b).reduce((acc, res) => acc + res, ""))
}

/*-All unique-*/

function hasUniqueChars(str){
  const array = Array.from(str);
  return array.every(x => array.indexOf(x) === array.lastIndexOf(x))
}

/*-Chuck Norris I - Push Ups-*/

function chuckPushUps(string) {
  if(string === 1 || !string || string.length === 0) return 'FAIL!!'
  let binary = []
  
  if(Array.isArray(string)){
    binary = string.filter(x => x.includes('1') || x.includes('0'));
    
    if(binary.length === 0) 
      return 'FAIL!!';
  }else{
    if(Array.from(string).indexOf(' ') === -1){
      
      binary = string.toString().split('').filter(x => x.includes('1') || x.includes('0')).join('');
      const value = parseInt(binary, 2)
      return !isNaN(string) ? 'FAIL!!' : value
    }else{
      binary = string.split(' ').filter(x => x.includes('1') || x.includes('0'));
    }
  }
  
  if(binary.length === 0) return 'CHUCK SMASH!!';
  
  const numbers = binary.map(x => parseInt(x, 2));
  
  return Math.max(...numbers)
}

/*-Chuck Norris II - One Punch-*/

function onePunch(items){
  const result =  items.big && items.length ? items.split(' ').sort().join(' ').replace(/[ae]/ig,'') : "Broken!";
  return result;
  
  const removeAorR = items.split(' ').map(x => {
    const value = x.replace(/[a,e]/gi, '');
    const sum = x.length - value.length
    
    return {
      value,
      sum
    }
  });

  const sort = removeAorR.sort((a, b) => {
    if(b.sum - a.sum === 1){
      return a.value - b.value
    }else{
      return b.sum - a.sum;
    }
  });
  
  return sort.map(x => x.value).join(' ');
}

/*-Shortest Word-*/

function findShort(s){
  const results = s.split(' ').map(x => x.length);
  return Math.min(...results)
}

/*-Move 10-*/

function moveTen(s){
  const array = s.split('').map(x => {
    const charZ = "z";
    if(x.charCodeAt(0) > charZ.charCodeAt(0)){
      const value = x.charCodeAt(0) - charZ;
      return 'a'.charAt(0) + value;
    }else{
      return x.charCodeAt(0)
    }
  });
  
  return array.map(x => x.toString().charAt(0)).join('')
}

/*-Ordered Count of Characters-*/

const orderedCount = function (text) {
  let result = {}
  let resultArr = []
  
  for(let element of text.split('')){
    if(result[element]){
      result[element] = result[element] + 1;
    }else{
      result[element] = 1;
      resultArr.push([element, 1]);
    }
  }
  resultArr.map(x => {
    x[0] = x[0];
    x[1] = result[x[0]];
  })
  
  return resultArr;
}

/*-Holiday III - Fire on the boat-*/

function fireFight(s){
  return s.replace(/Fire/gi, '~~')
}

/*-Numbers to Letters-*/

function switcher(x){
  const arr =  x.map(x => {
    const number = Math.abs((-1)*parseInt(x) + 27);
    const char = String.fromCharCode(number + 96);
    const values = {
      27: '!',
      28: '?',
      29: ' '
    }
    return values[x] ? values[x] : char;
  })
  return arr.join('')
}

/*-Geometry Basics: Triangle Perimeter in 2D-*/

function trianglePerimeter(triangle){
  const first = Math.hypot(triangle.a.x - triangle.b.x, triangle.a.y - triangle.b.y);
  const second = Math.hypot(triangle.a.x - triangle.c.x, triangle.a.y - triangle.c.y);
  const third = Math.hypot(triangle.b.x - triangle.c.x, triangle.b.y - triangle.c.y);
  return first + second + third
}

/*-How many consecutive numbers are needed?-*/

function consecutive(arr) {
  let sum = 0;
  arr = arr.sort((a,b) => a - b)
  
  for(let i = 0; i < arr.length - 1 ; i++){
    if(arr[i + 1] - arr[i] > 1){
      sum += arr[i + 1] - arr[i] - 1;
    }
  }
  return sum
}

/*-Bumps in the Road-*/

function bump(x){
  const arr = x.split('');
  const countN = arr.filter(x => x === 'n').length;
  const count_ = arr.filter(x => x === '_').length;
  
  if(countN <= 15){
    return 'Woohoo!'
  }
  return "Car Dead"
}

/*-Makes the Sentence-*/

function makesTheSentence(characterArray, sentenceString) {
  const nonSpaces = sentenceString.split('').sort().join('').replace(/\s/g, '');
  const word = characterArray.sort().join('')
  
  return word === nonSpaces
}

/*-Arithmetic progression-*/

function arithmeticSequenceElements(a, d, n) {
  let arr = []
  arr[0] = a;
  for(let i = 1; i < n ; i++){
    arr[i] = arr[i - 1] + d;
  }
  return arr.join(', ')
}

/*-Cryptanalysis Word Patterns-*/

function wordPattern(word) {
  const toLower = word.toLowerCase();
  let obj = {}
  let result = []
  let value = 0;
  
  for(let i = 0; i < toLower.length ; i++){
    if(!obj[toLower[value]]){
      obj[toLower[value]] = value;
      result.push(obj[toLower[i]])
      value++;
    }else{
      result.push(obj[toLower[value]])
    }
  }
  return result.join('.'); 
}
