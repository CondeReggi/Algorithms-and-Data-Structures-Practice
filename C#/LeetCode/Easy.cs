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

    public bool LeafSimilar(TreeNode root1, TreeNode root2) {
        List<int> lista1 = new List<int>();
        List<int> lista2 = new List<int>();
        CounterLeaf(root1, lista1);
        CounterLeaf(root2, lista2);

        return lista1.SequenceEqual(lista2);
    }

    public void CounterLeaf(TreeNode node, List<int> lista){
        if(node == null) return;

        if(node.left == null && node.right == null) {
            lista.Add(node.val);
        }
        CounterLeaf(node.left, lista);
        CounterLeaf(node.right, lista);
    }

    public bool HalvesAreAlike(string s) {
        HashSet<char> vowels = new HashSet<char>(){'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
        int counter = 0;

        for(int i = 0; i < s.Length; i++){
            var letter = s[i];
            if(i < s.Length / 2 && vowels.Contains(letter)) counter++;
            else if(vowels.Contains(letter)) counter--;
        }
        return counter == 0;
    }
}