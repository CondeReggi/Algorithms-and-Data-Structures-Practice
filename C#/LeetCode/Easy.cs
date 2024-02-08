using System.Collections.Generic;

public class TreeNode
{
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null)
    {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class MyQueue
{
    private Queue<int> queue;
    public MyQueue()
    {
        queue = new Queue<int>();
    }

    public void Push(int x)
    {
        queue.Enqueue(x);
    }

    public int Pop()
    {
        return queue.Dequeue();
    }

    public int Peek()
    {
        return queue.Peek();
    }

    public bool Empty()
    {
        return queue.Count() == 0;
    }
}

public class Solution
{
    public int BuyChoco(int[] prices, int money)
    {
        Array.Sort(prices);

        if (prices.Length == 0) return money;

        var primero = prices[0];
        var segundo = prices[1];

        if (money - (primero + segundo) >= 0) return money - (primero + segundo);

        return money;
    }
    public int MaxScore(string s)
    {
        int cantidadCerosIzq = 0;
        int cantidadUnosDer = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '0') cantidadCerosIzq++;
            if (s[i] == '1') cantidadUnosDer++;
        }

        if (cantidadCerosIzq == 0) return cantidadUnosDer - 1;
        if (cantidadUnosDer == 0) return cantidadCerosIzq - 1;

        return cantidadUnosDer + cantidadCerosIzq - 1;
    }

    public int RangeSumBST(TreeNode root, int low, int high)
    {
        if (root == null) return 0;

        var actual = (root.val >= low && root.val <= high) ? root.val : 0;

        var izq = RangeSumBST(root.left, low, high);
        var der = RangeSumBST(root.right, low, high);

        return actual + izq + der;
    }

    public bool LeafSimilar(TreeNode root1, TreeNode root2)
    {
        List<int> lista1 = new List<int>();
        List<int> lista2 = new List<int>();
        CounterLeaf(root1, lista1);
        CounterLeaf(root2, lista2);

        return lista1.SequenceEqual(lista2);
    }

    public void CounterLeaf(TreeNode node, List<int> lista)
    {
        if (node == null) return;

        if (node.left == null && node.right == null)
        {
            lista.Add(node.val);
        }
        CounterLeaf(node.left, lista);
        CounterLeaf(node.right, lista);
    }

    public bool HalvesAreAlike(string s)
    {
        HashSet<char> vowels = new HashSet<char>() { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };
        int counter = 0;

        for (int i = 0; i < s.Length; i++)
        {
            var letter = s[i];
            if (i < s.Length / 2 && vowels.Contains(letter)) counter++;
            else if (vowels.Contains(letter)) counter--;
        }
        return counter == 0;
    }

    public TreeNode GetTargetCopy(TreeNode original, TreeNode cloned, TreeNode target)
    {
        if (original == null) return original;
        if (original == target) return cloned;

        TreeNode leftResult = GetTargetCopy(original.left, cloned.left, target);
        if (leftResult != null) return leftResult;

        TreeNode rightResult = GetTargetCopy(original.right, cloned.right, target);
        return rightResult;
    }

    public TreeNode MergeTrees(TreeNode root1, TreeNode root2)
    {
        if (root1 == null && root2 == null) return null;

        int val1 = root1 != null ? root1.val : 0;
        int val2 = root2 != null ? root2.val : 0;

        TreeNode mergedNode = new TreeNode(val1 + val2);

        TreeNode left1 = root1 != null ? root1.left : null;
        TreeNode left2 = root2 != null ? root2.left : null;
        mergedNode.left = MergeTrees(left1, left2);

        TreeNode right1 = root1 != null ? root1.right : null;
        TreeNode right2 = root2 != null ? root2.right : null;
        mergedNode.right = MergeTrees(right1, right2);

        return mergedNode;
    }

    public TreeNode IncreasingBST(TreeNode root)
    {
        return ConvertInOrder(root, null);
    }

    private TreeNode ConvertInOrder(TreeNode node, TreeNode tail)
    {
        if (node == null) return tail;

        // In Order
        TreeNode res = ConvertInOrder(node.left, node);
        node.left = null;
        node.right = ConvertInOrder(node.right, tail);

        return res;
    }

    public bool EvaluateTree(TreeNode root)
    {
        if (root == null) return false;
        if (root.left == null && root.right == null) return (root.val == 1);

        if (root.val == 2) return EvaluateTree(root.left) || EvaluateTree(root.right);

        if (root.val == 3) return EvaluateTree(root.left) && EvaluateTree(root.right);

        return false;
    }

    public IList<int> Postorder(Node root)
    {
        var result = new List<int>();
        if (root == null) return result;

        var stack = new Stack<Node>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            result.Insert(0, current.val);

            foreach (var child in current.children)
            {
                stack.Push(child);
            }
        }

        return result;
    }

    public int SumRootToLeaf(TreeNode root)
    {
        List<string> datos = new List<string>();
        AddNumbers(root, "", datos);

        var sum = 0;

        foreach (var str in datos)
        {
            sum += Convert.ToInt32(str, 2);
        }
        return sum;
    }

    public void AddNumbers(TreeNode node, string str, List<string> datos)
    {
        if (node == null) return;

        str += node.val.ToString();

        if (node.left == null && node.right == null)
        {
            datos.Add(str);
            return;
        }

        if (node.left != null) AddNumbers(node.left, str, datos);
        if (node.right != null) AddNumbers(node.right, str, datos);
    }

    public IList<double> AverageOfLevels(TreeNode root)
    {
        var levels = new List<IList<int>>();
        AddNumbers(root, 0, levels);

        var averages = new List<double>();
        foreach (var level in levels)
        {
            averages.Add(level.Average());
        }

        return averages;
    }

    private void AddNumbers(TreeNode node, int depth, IList<IList<int>> levels)
    {
        if (node == null) return;

        while (levels.Count <= depth)
        {
            levels.Add(new List<int>());
        }

        levels[depth].Add(node.val);

        AddNumbers(node.left, depth + 1, levels);
        AddNumbers(node.right, depth + 1, levels);
    }

    public bool ValidPath(int n, int[][] edges, int source, int destination)
    {
        if (source == destination) return true;

        Dictionary<int, List<int>> adjacencyList = new Dictionary<int, List<int>>();
        foreach (var edge in edges)
        {
            if (!adjacencyList.ContainsKey(edge[0]))
            {
                adjacencyList[edge[0]] = new List<int>();
            }
            if (!adjacencyList.ContainsKey(edge[1]))
            {
                adjacencyList[edge[1]] = new List<int>();
            }

            adjacencyList[edge[0]].Add(edge[1]);
            adjacencyList[edge[1]].Add(edge[0]);
        }

        var visited = new HashSet<int>();
        var stack = new Stack<int>();
        stack.Push(source);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            if (current == destination) return true;
            if (visited.Contains(current)) continue;
            visited.Add(current);

            foreach (var neighbor in adjacencyList[current])
            {
                if (!visited.Contains(neighbor))
                {
                    stack.Push(neighbor);
                }
            }
        }

        return false;
    }

    public bool UniqueOccurrences(int[] arr)
    {
        Dictionary<int, int> datos = new Dictionary<int, int>();

        foreach (var number in arr)
        {
            if (!datos.ContainsKey(number)) datos[number] = 1;
            else datos[number]++;
        }

        try
        {
            Dictionary<int, int> result = new Dictionary<int, int>();

            foreach (var dato in datos)
            {
                var key = dato.Key;
                var value = dato.Value;

                result.Add(value, key);
            }
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public int FirstUniqChar(string s)
    {
        for (int i = 0; i < s.Length; i++)
        {
            if (s.IndexOf(s[i]) == s.LastIndexOf(s[i])) return i;
        }
        return -1;
    }

    public bool DigitCount(string num)
    {
        Dictionary<char, int> data = new Dictionary<char, int>();

        for (int i = 0; i < num.Length; i++)
        {
            var current = num[i];
            if (data.ContainsKey(current)) data[current]++;
            else data[current] = 1;
        }

        for (int k = 0; k < num.Length; k++)
        {
            int expectedCount = num[k] - '0';

            if (data.TryGetValue(k.ToString()[0], out int actualCount))
            {
                if (actualCount != expectedCount) return false;
            }
            else
            {
                if (expectedCount != 0) return false;
            }
        }
        return true;
    }

    public bool ArrayStringsAreEqual(string[] word1, string[] word2)
    {
        var first = string.Join("", word1);
        var second = string.Join("", word2);

        return first == second;
    }
}