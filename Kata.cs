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
  
  public static string ToWeirdCase(string s)
  {
    string result = "";
    string[] arr = s.Split(' ');
    
    foreach(string word in arr){
      for(int index = 0; index < word.Length ; index++){
        result += index % 2 == 0 ? word[index].ToString().ToUpper() : word[index].ToString().ToLower();
      }
      result += " ";
    }
    
    return result.Substring(0, result.Length - 1);
  }
  
  public static bool isPrime(int number){
    int optimus = 2;
    while(optimus < number){
      if(number % optimus == 0){
        return false;
      }
      optimus++;
    }
    return true;
  }
  
	public static string factors(int lst) {
    // Console.WriteLine(lst);
    string facts = "";
    int aux = lst;
    int index = 2;
    while(index <= aux){
      // Console.WriteLine($"{aux} y {index}");
      if(aux % index == 0 && isPrime(index)){
        facts += $"{index} ";
        aux = aux / index;
        index = 2;
      }else{
        index++;
      }
    }
    
    var arr = facts.Trim().Split(' ').Select(x => Int32.Parse(x));
    var conLinq = arr.Distinct();
    facts = ""; 
    
    foreach(var valor in conLinq){
      int cantidad = arr.Where(y => y == valor).Count();
        
      if(cantidad == 1){
        facts += $"({valor})";
      }else{
        facts += $"({valor}**{cantidad})";
      }
    }
    return facts;
  }
	
  public static string DecipherThis(string s)
  {
    if(s == "")
      return "";
    
    var arr = s.Split(' '); // Seguro.
    string result = "";
    
    foreach(string palabra in arr){     
      int i = 0;
      int variable;
      
      while(i < palabra.Length && Int32.TryParse( palabra[i].ToString() , out variable )){
        i++;
      }
      
      Console.WriteLine($"{i}");
      
      result += Convert.ToChar(Int32.Parse(palabra.Substring(0, i)));
      
      if(i < palabra.Length){
        string frase = palabra.Substring(i, palabra.Length - (i) );
        Console.WriteLine(frase);
        char[] charsito = frase.ToCharArray();
        
        char aux = charsito[0];
        charsito[0] = charsito[charsito.Length - (1)];
        charsito[charsito.Length - (1)] = aux;
        
        result += new string( charsito );
      }
      
      result += " ";
    }
    
    return result.Trim(); // Implement me! :)
  }
	
  public static int[] PartsSums(int[] ls)
  {
  	int[] arrayToReturn = new int[ls.Length + 1];
        for (int index = 0; index <= ls.Length; index++)
        {
        	int valor = 0;
                for (int j = index; j < ls.Length; j++)
                {
                    valor += ls[j];
                }
                arrayToReturn[index] = valor;
        }
        return arrayToReturn;
 }
	public static long factorial(long number)
        {
            if (number == 1)
            {
                return 1;
            }
            return number * factorial(number - 1);
        }

        public static string Decomp(int n)
        {
            long factorialN = factorial(Convert.ToInt64(n));
            List<string> lista = new List<string>();

            for (int index = 2; index <= factorialN; index++)
            {
                bool variable = (factorialN % index == 0 && isPrime(index));
                int exponente = 0;
                while (factorialN % index == 0 && isPrime(index))
                {
                    factorialN = factorialN / index;
                    exponente++;
                }
                if (exponente == 1 && variable)
                {
                    lista.Add(index.ToString());
                }
                else if (variable)
                {
                    lista.Add($"{index}^{exponente}");
                }
            }
            return String.Join(" * ", lista);
        }
	
}
