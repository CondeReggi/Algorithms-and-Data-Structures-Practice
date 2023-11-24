using System.Collections.Generic;
public class Kata
{
  public static int[] ArrayDiff(int[] a, int[] b)
  {
    List<int> result = new List<int>();
    Dictionary<int, bool> dict = new Dictionary<int,bool>();
    
    foreach(var e in b){
      if(!dict.ContainsKey(e)) dict[e] = true;
    }
    
    foreach(var e in a){
      if(!dict.ContainsKey(e)) result.Add(e);
    }
    
    return result.ToArray();
  }

  public static bool IsLeapYear(int year)
  {
    return (year % 4 == 0 && !(year % 100 == 0)) || year % 400 == 0;
  }

  
}
