using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Collections;
using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Text;
using System;

class Result
{
    public static List<int> reverseArray(List<int> a)
    {
        for(int index = 0; index < a.Count/2 ; index++){
            int aux = a[index];
            a[index] = a[a.Count - (1 + index)];
            a[a.Count - (1 + index)] = aux;
        }
        return a;
    }

    public static int hourglassSum(List<List<int>> arr)
    {
        int max = Int32.MinValue;
        for(int index = 0; index < arr.Count - 2 ; index++){
            for(int index2 = 0; index2 < arr.Count - 2 ; index2++){
                int columnOne = arr[index][index2] + arr[index][index2 + 1] + arr[index][index2 + 2];
                int midColumn = arr[index + 1][index2 + 1];
                int columnThree = arr[index + 2][index2] + arr[index + 2][index2 + 1] + arr[index + 2][index2 + 2];
                int resultPartialSum = columnOne + midColumn + columnThree;
                if(resultPartialSum >= max) max = resultPartialSum;
            }
        }
        return max;
    }

    public static List<int> dynamicArray(int n, List<List<int>> queries)
    {
        int lastAnswer = 0;
        List<int> lastAnswers = new List<int>();
        List<List<int>> seqList = new List<List<int>>();
        
        for(int i = 0; i < n; i++){
            seqList.Add(new List<int>());
        }
        
        foreach(var query in queries){
            int index = (query[1]^lastAnswer) % n ;
            
            if(query.First() == 1){
                seqList[index].Add(query.Last());
            }else{
                int y = query.Last();
                int size = seqList[index].Count;
                lastAnswer = seqList[index][y % size];
                lastAnswers.Add(lastAnswer);
            }
        }
        
        return lastAnswers;
    }

    public static List<int> rotateLeft(int d, List<int> arr)
    {
        for(int index = 0; index < d ; index++){
            for(int i = 0; i < arr.Count - 1; i++ ){
                int aux = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = aux;
            }
        }
        return arr;

        //En O(n)

        List<int> aux = new List<int>();
        for(int i = d ; i < arr.Count ; i++){
            aux.Add(arr[i]);
        }
        for(int j = 0 ; j < d ; j++){
            aux.Add(arr[j]);
        }
        return aux;
    }

    public static List<int> matchingStrings(List<string> strings, List<string> queries)
    {
        List<int> result = new List<int>();
        foreach(var query in queries){
            result.Add( strings.Where(x => x == query).Count() );
        }
        return result;
    }
    


}

class Solution
{
    public static void Main(string[] args)
    {
        TextWriter textWriter = new StreamWriter(@System.Environment.GetEnvironmentVariable("OUTPUT_PATH"), true);

        int arrCount = Convert.ToInt32(Console.ReadLine().Trim());

        List<int> arr = Console.ReadLine().TrimEnd().Split(' ').ToList().Select(arrTemp => Convert.ToInt32(arrTemp)).ToList();

        List<int> res = Result.reverseArray(arr);

        textWriter.WriteLine(String.Join(" ", res));

        textWriter.Flush();
        textWriter.Close();
    }
}
