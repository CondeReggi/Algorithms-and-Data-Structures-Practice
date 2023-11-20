public class Solution {
    public bool HasPathSum(TreeNode root, int targetSum) {
        if(root == null) return false;
        
        if(root.left == null && root.right == null) return targetSum == root.val;

        return HasPathSum(root.right, (targetSum - root.val)) || HasPathSum(root.left, (targetSum - root.val));
    }

    public int CountNodes(TreeNode root) {
        if(root == null) return 0;

        TreeNode aux = root;
        int sum = 0;
        return Counter(aux, sum);
    }

    public int Counter(TreeNode root, int sum){
        if(root == null) return 0;
        return 1 + Counter(root.left, sum) + Counter(root.right, sum);
    }

    public bool IsHappy(int n) {
        if(n == 1) return true;
        if(n < 7) return false;
        var sum = 0.0;
        var stringfy = (n).ToString().ToCharArray();

        for(int i = 0; i < stringfy.Length; i++){
            var value = Math.Pow(Double.Parse(stringfy[i].ToString()), 2);
            Console.WriteLine(stringfy[i]);
            sum += value;
        } 

        return IsHappy((int)sum);
    }

    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        if(headA == null && headB == null) return null;

        Dictionary<ListNode, bool> resultados = new Dictionary<ListNode, bool>();
        while(headA != null){
            if(!resultados.ContainsKey(headA)){
                resultados[headA] = true;
            }
            headA = headA.next;
        }

        while(headB != null){
            if(resultados.ContainsKey(headB)){
                return headB;
            }
            headB = headB.next;
        }

        return null;
    }

    public IList<IList<int>> Generate(int numRows) {
        IList<IList<int>> resultado = new List<IList<int>>();
        for(int i = 0; i < numRows; i++){
            IList<int> inserted = new List<int>();
            for (int j = 0; j <= i; j++){
                var a = binomialCoeff(i, j);
                inserted.Add(a);
                Console.WriteLine(a);
            }
            resultado.Add(inserted);
        }
        return resultado;
    }

    //C(line, i) = line! / ( (line-i)! * i! )
    public int binomialCoeff(int n, int k)
    {
        int res = 1;
        if (k > n - k)
            k = n - k;
        for (int i = 0; i < k; ++i) {
            res *= (n - i);
            res /= (i + 1);
        }
    
        return res;
    }
}
