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
}