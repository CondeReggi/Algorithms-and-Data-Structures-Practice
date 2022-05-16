// Complete the function solveMeFirst to compute the sum of two integers.
// Example
// Function Description
// Complete the solveMeFirst function in the editor below.
// solveMeFirst has the following parameters:
// int a: the first value
// int b: the second value
// Returns
// - int: the sum of  and 
// Constraints
// Sample Input 1 <= a,b <= 1000
// a = 2
// b = 3
// Sample Output 5
// Explanation => 2+3 = 5

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function solveMeFirst(a, b) {
  return a + b;
}


function main() {
    var a = parseInt(readLine());
    var b = parseInt(readLine());;

    var res = solveMeFirst(a, b);
    console.log(res);
}

// Given an array of integers, find the sum of its elements.
// For example, if the array , , so return .
// Function Description
// Complete the simpleArraySum function in the editor below. It must return the sum of the array elements as an integer.
// simpleArraySum has the following parameter(s):
// ar: an array of integers
// Input Format
// The first line contains an integer, , denoting the size of the array.
// The second line contains  space-separated integers representing the array's elements.
// Output Format
// Print the sum of the array's elements as a single integer.

function simpleArraySum(ar) {
   return ar.reduce( (acc, val) => acc + val , 0 );
}

// The task is to find their comparison points by comparing a[0] with b[0], a[1] with b[1], and a[2] with b[2].
// If a[i] > b[i], then Alice is awarded 1 point.
// If a[i] < b[i], then Bob is awarded 1 point.
// If a[i] = b[i], then neither person receives a point.

function compareTriplets(a, b) {
    let valorAlice = 0;
    let valorBob = 0;
    for(let i = 0; i < a.length ; i++){
        if( a[i] > b[i] ) valorAlice++;
        if( a[i] < b[i] ) valorBob++;
    }
    return [valorAlice,valorBob];
}

// Complete the aVeryBigSum function in the editor below. It must return the sum of all array elements.
// aVeryBigSum has the following parameter(s):
// int ar[n]: an array of integers .
// Return
// long: the sum of all array elements

function aVeryBigSum(ar) {
    let sum = 0;
    for(let valor of ar){
        sum += valor;
    }
    return sum;
}

// Function description
// Complete the  function in the editor below.
// diagonalDifference takes the following parameter:
// int arr[n][m]: an array of integers

function diagonalDifference(arr) {
    let rightDiagonal = 0;
    let leftDiagonal = 0;
    for(let i = 0 ; i < arr.length ; i++){
        rightDiagonal += arr[i][i];
        leftDiagonal += arr[i][arr.length - (1 + i)];
    }
    return Math.abs(rightDiagonal - leftDiagonal);
}

// Given an array of integers, calculate the ratios of its elements that are positive, 
// negative, and zero. Print the decimal value of each fraction on a new line with  places after the decimal.

function plusMinus(arr) {
    let cantZeros = 0;
    let cantPositiveNumbers = 0;
    let cantNegativeNumbers = 0;
    let divisor = arr.length;
    
    for(let valor of arr){
        if(valor > 0){
            cantPositiveNumbers++;
        }else if(valor < 0){
            cantNegativeNumbers++;
        }else{
            cantZeros++;
        }
    }
    console.log(`${cantPositiveNumbers/divisor}\n${cantNegativeNumbers/divisor}\n${cantZeros/divisor}\n`);
}

//Hacer la priamide invertida, se entiende con el codigo.

function staircase(n) {
    for(let i = 1 ; i <= n ; i++){
        console.log(`${" ".repeat(n - i)}${"#".repeat(i)}`);
    }
}

// Given five positive integers, find the minimum and maximum values that can be calculated by 
// summing exactly four of the five integers. Then print the respective minimum and maximum values 
// as a single line of two space-separated long integers.

function miniMaxSum(arr) {
    let resultArr = [];
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    
    for(let i = 0; i < arr.length ; i++){
        let result = 0;
        for(let j = 0; j < arr.length ; j++){
            if(i !== j){
                result += arr[j];
            }
        }
        if(result <= min) min = result;
        if(result >= max) max = result;
    }   
    console.log(min, max);
}
