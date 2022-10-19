using System;
using System.Collections.Generic;
using System.Linq;

public static class Kata
{
  // Counting sheep...

  public static int CountSheeps(bool[] sheeps)
  {
    int counter = 0;
    for(int i = 0; i < sheeps.Length ; i++){
      if(sheeps[i]){
        counter++;
      }
    }
    return counter;
  }
  
  // All Star Code Challenge #18

  public static int StrCount(string str, string letter)
  {
    int counter = 0;
    char[] characters = str.ToCharArray();
    foreach(char letter_in_word in characters){
      if(letter_in_word.ToString() == letter){
        counter++;
      }
    }
    return counter;
  }
  
  // Powers of 2
  
  public static BigInteger[] PowersOfTwo(int n)
  {
    BigInteger[] result = new BigInteger[n+1];
    
    for(int i = 0; i < result.Length; i++)
    {
      result[i] = (BigInteger)Math.Pow(2,i);
    }
    
    return result;
  }
  
  // Find Nearest square number
  
  public static int NearestSq(int n)
  {
    var sqrt = Math.Sqrt(n);
    return (int)Math.Pow(Math.Round(sqrt), 2);
  }
  
  // Multiple of index
  
  public static List<int> MultipleOfIndex(List<int> xs)
  {
    List<int> result = new List<int>(){};
    for(int i = 1; i < xs.Count; i++){
      if(xs[i] % i == 0){
        result.Add(xs[i]);
      }
    }
    return result;
    
    return xs
      .Skip(1)
      .Where((x, i) => x % (i + 1) == 0)
      .ToList();
  }
  
  // CSV representation of array
  
  public static string ToCsvText(int[][] array)
  {
    List<string> result = new List<string>(){};
    
    for(int i = 0; i < array.Length ; i++){
      result.Add( String.Join(',' , array[i]) );
    } 
    
    return String.Join('\n', result);
  }
  
  // Multiplication table for number
  
  public static string MultiTable(int number)
  {
    List<string> result = new List<string>(){};
    for(int i = 1; i <= 10; i++){
      result.Add( $"{i} * {number} = {number * i}" );
    }
    return String.Join('\n', result);
  }
  
  // Convert to Binary

  public static int ToBinary(int n)
  {
    return Int32.Parse(Convert.ToString(n, 2));
  }
  
  // I love you, a little , a lot, passionately ... not at all

  public static string HowMuchILoveYou(int nb_petals)
  {
    string[] results = new string[]{
      "not at all",
      "I love you",
      "a little",
      "a lot",
      "passionately",
      "madly"
    };
    
    return results[nb_petals % 6];
  }
  
  // Area or Perimeter
  
  public static int AreaOrPerimeter(int l, int w) {
    return l == w ? l * w : 2 * ( l + w );
  }
  
  // MakeUpperCase
  
  public static string MakeUpperCase(string str)
  {
    return str.ToUpper();
  }
  
  // Grasshopper - Summation
  
  public static int summation(int num)
  {
    int suma = 0;
    for(int i = 1 ; i <= num ; i++){
      suma += i;
    } 
    return suma; => Enumerable.Range(1, num).Sum()
  }
  
  // Removing Elements
  
  public static object[] RemoveEveryOther(object[] arr)
  {
    if(arr.Length > 1){
      List<object> lista = new List<object>(){};
      for(int i = 0; i < arr.Length ; i++){
        if(i == 0 || i % 2 == 0){
           lista.Add(arr[i]);
        }
      }
      return lista.ToArray();
    }else{
      return arr;
    }
    
    => arr.Where((e, i) => i%2 == 0).ToArray();
  }
  
  // My head is at the wrong end!
  
  public static string[] FixTheMeerkat(string[] arr)
  {
    string[] result = new string[arr.Length];
    
    for(int i = arr.Length - 1; i >= 0; i--){
      result[i] = arr[(arr.Length - 1) - i];
    }
    
    return result;
  }
  
  // Thinkful - Logic Drills: Traffic light
  
  public static string UpdateLight(string current)
  {
    var mapa = new Dictionary< string, string >();
    mapa["green"] = "yellow";
    mapa["yellow"] = "red";
    mapa["red"] = "green";
    
    return mapa[current];
  }
  
  // Calculate average
  
  public static double FindAverage(double[] array)
  {
    if(array.Length == 0) return 0;
    
    List<double> lista = new List<double>(array);
    double sum = 0.0;
    
    foreach(double value_list in lista){
      sum += value_list;
    }
    
    return sum / array.Length; // => return array.Length == 0 ? 0 : array.Average(); con Linq
  }
  
  // Is the string uppercase?
  
  public static bool IsUpperCase(this string text)
  {
    return text.ToUpper() == text;
    =>  return !s.Any(x => Char.IsLower(x)); 
  }
  
  // 5 without numbers !!
  
  public static int UnusualFive()
  { 
    var str = ".....";
    return str.Length;
  }
  
  
}

