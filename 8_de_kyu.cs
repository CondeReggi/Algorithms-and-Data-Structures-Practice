using System;

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
}

