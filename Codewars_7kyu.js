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

