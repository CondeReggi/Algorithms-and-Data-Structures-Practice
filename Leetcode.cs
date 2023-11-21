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

    public IList<string> BinaryTreePaths(TreeNode root) {
        List<string> result = new List<string>();
        
        Dfs(root, "", result);
        return result;
    }

    public void Dfs(TreeNode node, String path, List<string> result){
        if(node == null) return;

        path += node.val;

        if(node.left == null && node.right == null){
            result.Add(path);
        }else{
            path += "->";
            Dfs(node.left, path, result);
            Dfs(node.right, path, result);
        }
    }

    public int AddDigits(int num) {
        if(num >= 10){
            var array = num.ToString().ToCharArray();
            int sum = 0;

            foreach(var character in array){
                int toInt = Int32.Parse(character.ToString());
                sum += toInt;
            }
            return AddDigits(sum);
        }
        return num;
    }

    public bool IsUgly(int n) {
        if (n <= 0) {
            return false;
        }
        int[] factoresPermitidos = {2, 3, 5};
        foreach (int factor in factoresPermitidos) {
            while (n % factor == 0) {
                n /= factor;
            }
        }
        return n == 1;
    }

    public List<int> FactoresPrimos(int n) {
        List<int> result = new List<int>();
        int[] factoresExcluidos = {2, 3, 5};

        foreach (int factor in factoresExcluidos) {
            while (n % factor == 0) {
                n /= factor;
            }
        }
        for (int i = 2; i <= n / i; ++i) {
            while (n % i == 0) {
                if (!factoresExcluidos.Contains(i)) {
                    result.Add(i);
                }
                n /= i;
            }
        }
        if (n > 1 && !factoresExcluidos.Contains(n)) {
            result.Add(n);
        }
        return result;
    }

    public void MoveZeroes(int[] nums) {
        var noZeros = nums.Where(x => x != 0).ToList();
        
        if(nums.Length - noZeros.Count() == nums.Length) return;

        for (int j = 0; j < noZeros.Count; j++) {
            nums[j] = noZeros[j];
        }

        for (int j = noZeros.Count; j < nums.Length; j++) {
            nums[j] = 0;
        }
    }

    
}

public class Solution : VersionControl {
    public int FirstBadVersion(int n) {
        while(!IsBadVersion(n)){
            n = n/2;
        }

        while(IsBadVersion(n)){
            n--;
        }
        return  n+1;
    }
}
