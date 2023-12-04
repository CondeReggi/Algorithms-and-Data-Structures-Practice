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

    public bool IsPowerOfThree(int n) {
        if(n < 1) return false;
        while(n % 3 == 0) n /= 3;
        
        return n == 1;
    }

    public int[] CountBits(int n) {
        int[] binarios = new int[n+1];

        for(int i = 0; i <= n; i++){
            string binary = Convert.ToString(i, 2);
            int sum = 0;
            foreach(var character in binary.ToCharArray()){
                if(character == '1') sum++;
            }
            binarios[i] = sum;
        }

        return binarios;
    }

    public bool IsPowerOfFour(int n) {
        if(n < 1) return false;
        while(n % 4 == 0) n /= 4;
        
        return n == 1;
    }

    public void ReverseString(char[] s) {
        for(int i = 0; i < s.Length / 2; i++){
            char auxiliar = s[i];
            s[i] = s[s.Length - i - 1];
            s[s.Length - i - 1] = auxiliar;
        }
    }

    public string Convert(string s, int numRows) {
        Dictionary<int, string> dict = new Dictionary<int, string>();
        int counter = 1;
        bool sumo = true;
        for(int i = 0; i < s.Length; i++){
            string character = s[i].ToString();

            if(dict.ContainsKey(counter)) dict[counter] = dict[counter] + character;
            else dict[counter] = character;

            if(counter == numRows) sumo = false;
            if(counter == 1) sumo = true;

            if(sumo){
                counter++;
            }else{
                counter--;
            }
        }
        string result = "";
        foreach(var a in dict){
            // Console.WriteLine($"{a.Key} {a.Value}");
            result += a.Value;
        }

        return result;
    }

    public int FirstUniqChar(string s) {
        for(int i = 0; i < s.Length; i++){
            if(s.IndexOf(s[i]) == s.LastIndexOf(s[i])) return i;
        }
        return -1;
    }

    public int[] Intersect(int[] nums1, int[] nums2) {
        Dictionary<int, int> map = new Dictionary<int, int>();
        List<int> result = new List<int>();

        foreach (int num in nums1) {
            if (map.ContainsKey(num)) {
                map[num]++;
            } else {
                map[num] = 1;
            }
        }

        foreach (int num in nums2) {
            if (map.ContainsKey(num) && map[num] > 0) {
                result.Add(num);
                map[num]--;
            }
        }

        return result.ToArray();
    }

    public int MissingNumber(int[] nums) {
        for (int i = 0; i <= nums.Length; i++) {
            if (Array.IndexOf(nums, i) == -1) {
                return i;
            }
        }

        return -1;
    }

    public IList<IList<string>> GroupAnagrams(string[] strs) {
        Dictionary<string, List<string>> dictionary = new Dictionary<string,List<string>>();

        for(int i = 0; i < strs.Length; i++){
            
            var palabra =  new String(strs[i].ToList().OrderBy(x => x).ToArray());

            if(dictionary.ContainsKey(palabra)){
                dictionary[palabra].Add(strs[i]);
            }else{
                dictionary[palabra] = new List<string>() { strs[i] };
            }
        }

        IList<IList<string>> result = new List<IList<string>>();

        foreach(var element in dictionary){
            result.Add(element.Value);
        }

        return result;
    }

    public long MinimumSteps(string s) {
        int n = s.Length;
        long blackCount = 0;
        long steps = 0;

        for (int i = 0; i < n; i++)
        {
            if (s[i] == '1')
            {
                blackCount++;
            }
            else
            {
                steps += blackCount;
            }
        }

        return steps;
    }

    public bool IsBalanced(TreeNode root) {
        if(root == null) return true;

        var alturaIzquierda = Altura(root.left);
        var alturaDerecha = Altura(root.right);

        return (Math.Abs(alturaIzquierda - alturaDerecha) <= 1 && IsBalanced(root.left) && IsBalanced(root.right));
    }

    public int Altura(TreeNode root) {
        if(root == null) return 0;

        return 1 + Math.Max(Altura(root.left), Altura(root.right));
    }

    public string ConvertToTitle(int columnNumber) {
        string result = "";

        while(columnNumber > 0){
            columnNumber--;
            char letter = (char)('A' + columnNumber % 26);
            result = letter + result;
            columnNumber = columnNumber / 26;
        }

        return result;
    }

    public uint reverseBits(uint n) {
        string binaryString = Convert.ToString(n, 2).PadLeft(32, '0');

        char[] binaryArray = binaryString.ToCharArray();
        Array.Reverse(binaryArray);
        string reversedBinaryString = new string(binaryArray);

        uint result = Convert.ToUInt32(reversedBinaryString, 2);

        return result;
    }

    public int HammingWeight(uint n) {
        var characters = Convert.ToString(n, 2).PadLeft(32, '0').ToString();
            Console.WriteLine(n);
        int count = 0;

        foreach(var element in characters.ToCharArray()){
            if(element == '1') count++;
        }
        return count;
    }

    public int[] Intersection(int[] nums1, int[] nums2) {
        Dictionary<int, bool> datos = new Dictionary<int, bool>();
        List<int> result = new List<int>();
        foreach(var elem in nums1){
            datos[elem] = true;
        }

        foreach(var elem2 in nums2){
            if(datos.ContainsKey(elem2) && datos[elem2] == true)
            {
                result.Add(elem2);
                datos[elem2] = false;
            }
        }

        return result.ToArray();
    }

    public bool CanConstruct(string ransomNote, string magazine) {
        if (string.IsNullOrEmpty(ransomNote)) {
            return true; 
        }

        if (string.IsNullOrEmpty(magazine) || ransomNote.Length > magazine.Length) {
            return false; 
        }

        StringBuilder magazineBuilder = new StringBuilder(magazine);

        foreach (char c in ransomNote) {
            int index = magazineBuilder.ToString().IndexOf(c);
            if (index == -1) {
                return false;
            } else {
                magazineBuilder.Remove(index, 1);
            }
        }

        return true;
    }
}

public class NumArray {
    private int[] _numbers;
    public NumArray(int[] nums) {
        _numbers = nums;
    }
    
    public int SumRange(int left, int right) {
        if(_numbers.Length < left) return 0;

        int min = Math.Min(_numbers.Length, right);
        int sum = 0;
        for(int i = left; i <= min; i++){
            sum += _numbers[i];
        }

        return sum;
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
