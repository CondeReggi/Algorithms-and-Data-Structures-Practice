using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

public class Deadfish
{
  public static int[] Parse(string data)
  {
    double value = 0;
    List<int> valores = new List<int> {};
    for(int index = 0 ; index < data.Length ; index++){
      switch(data[index])
      {
          case 'i': 
            value++;
            break;
          
          case 's':
            value = Math.Pow(value, 2);
            break;
          
          case 'd':
            value--;
            break;
          
          case 'o':
            valores.Add(Convert.ToInt32(value));
            break;
      }
    }
    return valores.ToArray();
  }
}
public class Kata
{
  public static string ToCamelCase(string str)
  {
    String[] array = str.Split(new char[]{'_','-'});
    for(int index = 1 ; index < array.Length ; index++){
      string pablabra = array[index];
      array[index] = pablabra[0].ToString().ToUpper() + pablabra.Substring(1, pablabra.Length - 1);
    }
    return String.Join("",array).ToString();

    // OR
    // return string.Concat(str.Split('-','_').Select((s, i) => i > 0 ? char.ToUpper(s[0]) + s.Substring(1) : s));
  }

  public static int CountSmileys(string[] smileys) 
  {
    List<string> smileyFaces = new List<string>() {":)",";)",":D",";D",";~D",":~D",":~)",";~)",":-D",";-D",":-)",";-)"};
    int simileyCount = 0;
    foreach(string face in smileys){
      if(smileyFaces.Contains($"{ face }")){
        simileyCount++;
      }
    }
    return simileyCount;

    //OR
    //return smileys.Count(s => Regex.IsMatch(s, @"^[:;]{1}[~-]{0,1}[\)D]{1}$"));
  }

  public static bool ValidPhoneNumber(string phoneNumber)
  {
    return Regex.IsMatch(phoneNumber, @"^\(\d{3}\) \d{3}-\d{4}\z");
  }
}