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
    
    public static long arrayManipulation(int n, List<List<int>> queries)
    {
        long[] output = new long[n];
        for(int i=0; i < queries.Count ; i++){
            output[queries[i][0] - 1] = output[queries[i][0] - 1]+queries[i][2];
            if(queries[i][1] < n){
                output[queries[i][1]] = output[queries[i][1]] - queries[i][2];
            }
        }
        
        long temp = 0;
        long max = 0;
        
        for(int i=0 ; i < n; i++){
            temp = temp + output[i];
            if(temp > max){
                max = temp;
            }
        }
        
        return max;
    }

    static void printLinkedList(SinglyLinkedListNode head) {
        var node = head;
        while(node != null){
            Console.WriteLine(node.data);
            node = node.next;
        }
    }

    static SinglyLinkedListNode insertNodeAtTail(SinglyLinkedListNode head, int data) {
        if(head == null){
            head = new SinglyLinkedListNode(data);
        }else{
            SinglyLinkedListNode node = head;
            while(node.next != null){
                node = node.next;
            }
            node.next = new SinglyLinkedListNode(data);
        }
        return head;
    }

    SinglyLinkedListNode* insertNodeAtHead(SinglyLinkedListNode* llist, int data) {
        SinglyLinkedListNode* newNode = new SinglyLinkedListNode(data);
        // newNode->data = data;
        // newNode->next = NULL;
        
        if(llist == NULL){
            llist = newNode;
        }else{
            newNode->next = llist;
            llist = newNode;
        }
        return llist;
    }

    SinglyLinkedListNode* insertNodeAtPosition(SinglyLinkedListNode* llist, int data, int position) {
        SinglyLinkedListNode* temp = llist;
        int number = 0;
        
        while(temp != NULL && number < position - 1){
            temp = temp->next;
            number++;
        }
        
        SinglyLinkedListNode* newNode = new SinglyLinkedListNode(data);
        newNode->next = temp->next;
        temp->next = newNode;
        return llist;
    }

    SinglyLinkedListNode* deleteNode(SinglyLinkedListNode* llist, int position) {
        if (llist == NULL){
            return NULL;
        }
        if(position == 0){
            llist = llist->next;        
            return llist;
        }
        SinglyLinkedListNode* aux = llist;
        for (int i = 0; i < position - 1; i++) {
            aux = aux->next;
        }
        aux->next = aux->next->next;
        return llist;
    }

    void reversePrint(SinglyLinkedListNode* llist) {
        if(llist->next == NULL){
            cout << llist->data << endl;
        }else{
            reversePrint(llist->next);
            cout << llist->data << endl;
        }
    }

    SinglyLinkedListNode* reverse(SinglyLinkedListNode* llist) {
        if(llist == NULL){
            return llist;
        }else{
            SinglyLinkedListNode* prev = llist;
            SinglyLinkedListNode* aux = llist->next;
            llist->next = NULL;
            
            while(aux){
                SinglyLinkedListNode* newNode = aux->next;
                aux->next = prev;
                prev = aux;
                aux = newNode;
            }
            
            return prev;
        }
    }

    bool compare_lists(SinglyLinkedListNode* head1, SinglyLinkedListNode* head2) {
        SinglyLinkedListNode* aux1 = head1;
        SinglyLinkedListNode* aux2 = head2;
            
        while(aux1->next != NULL && aux2->next != NULL){
            if(aux1->data != aux2->data){
                return false;
            }
            aux1 = aux1->next;
            aux2 = aux2->next;
        }
        
        if(aux1->next != NULL && aux2->next != NULL){
            return false;
        }
        
        return true;
    }

    int getNode(SinglyLinkedListNode* llist, int positionFromTail) {
        SinglyLinkedListNode* fast = llist;
        SinglyLinkedListNode* slow = llist;
            
        int pos = 0;
        while (pos < positionFromTail) {
            fast = fast->next;
            pos++;
        }
        while (fast->next!=NULL) {
            slow = slow->next;
            fast = fast->next;
        }
        return slow->data;
    }

    SinglyLinkedListNode* removeDuplicates(SinglyLinkedListNode* llist) {
        SinglyLinkedListNode* aux = llist;
        if(aux == NULL){
            return llist;
        }
        while(aux->next != NULL){
            if(aux->data == aux->next->data){
                aux->next = aux->next->next;
            }else{
                aux = aux->next;
            }
        }
        return llist;
    }

    bool has_cycle(SinglyLinkedListNode* head) {
        int count = 1000;
        while(count) {
            if (!(head)) return false;
            head = head->next;
            count--;
        }
        return true;
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

public static string Codificar(int n)
        {
            int cantidad = (int)Math.Ceiling(Convert.ToDouble(n % 100000)); 
            int cantidadLetras = (int)Math.Round(Convert.ToDouble(n / 100000)); 
            int sumarValores = 0;

            if (cantidadLetras > 0 && n >= (cantidadLetras) * 100000) {
                n += cantidadLetras;

                if (n >= (cantidadLetras + 1) * 100000)
                {
                    n += 1;
                    cantidad = (int)Math.Ceiling(Convert.ToDouble(n % 100000));
                    cantidadLetras++;
                }
                else
                {
                    sumarValores = (int)Math.Ceiling(Convert.ToDouble(n / 100000));
                }

            }
            int count = (int)Math.Ceiling(Convert.ToDouble(cantidadLetras % 26)); 
            int countDos = (int)Math.Ceiling(Convert.ToDouble(cantidadLetras / 26)); 

            string result = "";
            string modulo = (cantidad + sumarValores).ToString();

            if (modulo.Length < 5)
            {
                modulo = new String('0', 5 - modulo.Length) + (cantidad + (int)Math.Ceiling(Convert.ToDouble(n / 100000))).ToString();
            }

            result = $"{Convert.ToChar(countDos + 65)}{Convert.ToChar(count + 65)}{modulo}";
            return result;
        }
