//30 Days of JavaScript

//Closures
var createHelloWorld = function(args) {
    return function(...args) {
        return "Hello World"
    }
};

var createCounter = function(n) {
    let count = n;
    return function() {
        return count++;
    };
};

var expect = function(val) {
    return {
        toBe: (val2) => {
            if (val !== val2) throw new Error("Not Equal");
            else return true;
        },
        notToBe: (val2) => {
            if (val === val2) throw new Error("Equal");
            else return true;
        }
    }
};

var createCounter = function(init) {
    let presentCount = init;
  
    function increment() {
      return ++presentCount;
    }
  
    function decrement() {
        return --presentCount;
    }
  
    function reset() {
        return (presentCount = init);
    }
  
    return { increment, decrement, reset };
};

//Basic Array Transformations

var map = function(arr, fn) {
    return arr.map(fn)
};

var filter = function(arr, fn) {
    return arr.filter(fn)
};

var reduce = function(nums, fn, init) {
    return nums.reduce(fn, init)
};

//Function Transformations


