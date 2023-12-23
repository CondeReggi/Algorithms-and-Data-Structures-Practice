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

    public int NumberOfMatches(int n) {
        int counter = 0;
        var auxiliar = n;
        while(auxiliar > 1){
            if(auxiliar % 2 == 0){ 
                counter += (int)Math.Floor(auxiliar / 2.0);
                auxiliar = (int)Math.Round(auxiliar / 2.0);
            }else{ 
                counter += (int)Math.Floor((auxiliar - 1) / 2.0);
                auxiliar = (int)Math.Round(((auxiliar - 1) / 2.0) + 1.0);
            }
        }
        return counter;
    }

    //Solucion no solucion
    public int TotalMoney(int n) {
        int result = 0;
        int modulo = n % 7;

        if(modulo == 0) return (n/7) * GaussSum(n);
        return (int)(Math.Floor(n / 7.0) * GaussSum(7)) + GaussSum(modulo);
    }

    //Eta si
    public int TotalMoney(int n) {
       int result = 0;
       int j = 0;
       for(int i = 1; i <= Math.Floor(n/7.0); i++){
           result += (GaussSum(6 + i) - GaussSum(i - 1));
           j = i;
       }
       result += (GaussSum((n % 7) + j) - GaussSum(j));
       return result;
    }

    public int GaussSum(int n){
        return (n*(n+1))/2;
    }

    public int[][] Transpose(int[][] matrix) {
        int[][] result = new int[matrix[0].Length][];

        for (int i = 0; i < matrix[0].Length; i++) {
            result[i] = new int[matrix.Length];
            for (int j = 0; j < matrix.Length; j++) {
                result[i][j] = matrix[j][i];
            }
        }
        return result;
    }

    public int MaxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.Length - 1;

        while (left < right) {
            int width = right - left;
            int minHeight = Math.Min(height[left], height[right]);
            maxArea = Math.Max(maxArea, width * minHeight);

            if (height[left] < height[right])
                left++;
            else
                right--;
        }

        return maxArea;
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

    public int RemoveDuplicates(int[] nums) {
        if(nums.Length == 0) return 0;

        Dictionary<int, bool> datos = new Dictionary<int, bool>();

        foreach(var a in nums){
            if(!datos.ContainsKey(a)) datos[a] = true;
        }

        int index = 0;
        foreach(var key in datos.Keys) {
            nums[index++] = key;
        }
        return datos.Values.Count();
    }

    public int RemoveDuplicates(int[] nums) {
        if(nums.Length == 0) return 0;

        Dictionary<int, int> datos = new Dictionary<int, int>();

        foreach(var a in nums){
            if(!datos.ContainsKey(a)) datos[a] = 1;
            else if(datos[a] < 2) datos[a]++;
        }

        int index = 0;
        foreach(var key in datos) {
            Console.WriteLine($"{key.Key} {key.Value}");
            for(int i = 0; i < key.Value; i++){
                nums[index] = key.Key;
                index++;
            }
            
        }
        return datos.Values.Sum();
    }

    public int MajorityElement(int[] nums) {
        if(nums.Length == 1) return nums[0];

        var cantidad = Math.Ceiling(nums.Length / 2.0);
        Console.WriteLine(cantidad);
        Dictionary<int, int> datos = new Dictionary<int, int>();

        foreach(var element in nums){
            if(!datos.ContainsKey(element)) datos[element] = 1;
            else {
                datos[element]++;
                if(datos[element] >= cantidad) return element;
            }
        }

        return -1;
    }

    public int MaxProfit(int[] prices) {
        if (prices == null || prices.Length < 2) return 0;

        int maxProfit = 0;
        int minPrice = prices[0];

        for (int i = 1; i < prices.Length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else {
                maxProfit = Math.Max(maxProfit, prices[i] - minPrice);
            }
        }
        return maxProfit;
    }

    public bool CanJump(int[] nums) {
        int maxReachable = 0;
        for (int i = 0; i < nums.Length; i++) {
            if (i > maxReachable) return false;
            maxReachable = Math.Max(maxReachable, i + nums[i]);
        }
        return true;
    }

    public int Candy(int[] ratings) {
        int n = ratings.Length;
        Dictionary<int, int> datos = new Dictionary<int, int>();
        int[] candies = new int[n];

        for (int i = 0; i < n; i++) datos[i] = 1;

        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) datos[i] = datos[i - 1] + 1;
        }

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1] && datos[i] <= datos[i + 1]) datos[i] = datos[i + 1] + 1;
        }

        return datos.Values.Sum();
    }

    public string LargestOddNumber(string num) {
        long a = Int64.Parse(num[num.Length - 1].ToString());
        if(a % 2 != 0) return num;

        List<long> array = num.ToCharArray().Select(x => Int64.Parse(x.ToString())).ToList();
        Stack<long> stack = new Stack<long>(array);
        int index = 0;
        while (stack.Count > 0 && stack.Peek() % 2 == 0)
        {
          stack.Pop();
          index++;
        }

        return stack.Count == 0 ? "" : num.Substring(0, num.Length - index);
    }

    public string Tree2str(TreeNode root) {
        string result = Tree2strAux(root);

        return result;
    }

    private string Tree2strAux(TreeNode root) {
        if (root == null) return "";
        if (root.left == null && root.right == null) return root.val.ToString();
        
        if (root.left == null) return $"{root.val}()({Tree2strAux(root.right)})";
        
        if (root.right == null) return $"{root.val}({Tree2strAux(root.left)})";
        
        return $"{root.val}({Tree2strAux(root.left)})({Tree2strAux(root.right)})";
    }

    public int FindSpecialInteger(int[] arr) {
        if(arr.Length == 1) return arr[0];
        
        var porcentaje = arr.Length * 0.25;

        Dictionary<int, int> datos = new Dictionary<int, int>();

        foreach(int value in arr){
            if(datos.ContainsKey(value)){
                datos[value]++;
                if(datos[value] > porcentaje) return value;
            }else{
                datos[value] = 1;
            }
        }

        return -1;
    }

    public int MaxProduct(int[] nums) {
        if(nums.Length < 1) return 0;
        var max = Int32.MinValue;
        for(int i = 0; i < nums.Length; i++){
            for(int j = i + 1; j < nums.Length; j++){
                var value = (nums[i]-1)*(nums[j]-1);
                if(value > max) max = value;
            }
        }
        return max;
    }

    public int[][] OnesMinusZeros(int[][] grid) {
        int[][] result = new int[grid.Length][];

        var values = FindValues(grid, 0, 1);

        for(int i = 0; i < grid.Length; i++){
            result[i] = new int[grid[i].Length];
            for(int j = 0; j < grid[i].Length; j++){
                int onesRowi = values[i][1];
                int zerosRowi = values[i][0];

                int onesColj = values[-2][j];
                int zerosColj = values[-1][j];

                result[i][j] = onesRowi + onesColj - zerosRowi - zerosColj;
            }
        }

        return result;
    }

    private Dictionary<int, int[]> FindValues(int[][] grid, int value1, int value2)
    {
        Dictionary<int, int[]> result = new Dictionary<int, int[]>();
        int[] countByColumnValue1 = new int[grid[0].Length];
        int[] countByColumnValue2 = new int[grid[0].Length];

        for (int i = 0; i < grid.Length; i++)
        {
            int countRowValue1 = 0;
            int countRowValue2 = 0;

            for (int j = 0; j < grid[i].Length; j++)
            {
                if (grid[i][j] == value1)
                {
                    countRowValue1++;
                    countByColumnValue1[j]++;
                }
                else if (grid[i][j] == value2)
                {
                    countRowValue2++;
                    countByColumnValue2[j]++;
                }
            }
            result[i] = new int[] { countRowValue1, countRowValue2 };
        }

        result[-1] = countByColumnValue1; 
        result[-2] = countByColumnValue2; 
        return result;
    }

    public string DestCity(IList<IList<string>> paths) {
        List<string> primeros = paths.Select(x => x[0]).ToList();
        List<string> segundos = paths.Select(x => x[1]).ToList();
        
        foreach(var letra in segundos){
            if(!primeros.Any(x => x == letra)) return letra;
        }

        return "";
    }

    public bool IsAnagram(string s, string t) {
        if(s.Length != t.Length) return false;
        
        int[] letterCounts = new int[26]; // Para letras del alfabeto inglés

        foreach (char c in s) {
            letterCounts[c - 'a']++;
        }

        foreach (char c in t) {
            letterCounts[c - 'a']--;
            if (letterCounts[c - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }

    public int MaxProductDifference(int[] nums) {
        if(nums.Length < 4) return 0;
        Array.Sort(nums);
        int a = nums[nums.Length - 1];
        int b = nums[nums.Length - 2];
        int c = nums[0];
        int d = nums[1];
        return (a * b) - (c * d);
    }

    public int BuyChoco(int[] prices, int money) {
        Array.Sort(prices);
        if(prices.Length == 0) return money;

        var primero = prices[0];
        var segundo = prices[1];

        if(money - (primero + segundo) >= 0) return money - (primero + segundo);

        return money;
    }

    public int MaxWidthOfVerticalArea(int[][] points) {
        if(points.Length <= 1) return 0;
        Array.Sort(points, (a, b) => a[0].CompareTo(b[0]));
        int max = int.MinValue; 

        for(int i = 1; i < points.Length; i++){
            var distancia = Math.Abs(points[i-1][0] - points[i][0]);
            if(distancia > max) max = distancia;
        }
        return max;
    }

    public bool IsPathCrossing(string path) {
        Dictionary<string, bool> datos = new Dictionary<string, bool>();

        datos["0,0"] = true;

        int y = 0;
        int x = 0;

        foreach(var letra in path.ToCharArray()){
            switch(letra){
                case 'N':
                    y++;
                    break;
                case 'S':
                    y--;
                    break;
                case 'W':
                    x--;
                    break;
                case 'E':
                    x++;
                    break;
            }

            var str = $"{x},{y}";

            if(datos.ContainsKey(str)) return true;
            
            datos[str] = true;
        }

        return false;
    }
}

public class FoodRatings {
    private Dictionary<string, string> map;

    private Dictionary<string, PriorityQueue<(int r, string f, int t), (int r, string f, int t)>> items;

    private Dictionary<string, int> time;

    private int t;

    public FoodRatings(string[] foods, string[] cuisines, int[] ratings) {
        this.map = new();
        this.items = new();
        this.time = new();

        // initial t = 0
        int n = foods.Length;
        for(int i = 0; i < n; i++)
        {
            this.map.Add(foods[i], cuisines[i]);
            this.time.Add(foods[i], 0);
            if (this.items.ContainsKey(cuisines[i]) == false)
            {
                this.items.Add(cuisines[i], new());
            }
            this.items[cuisines[i]].Enqueue((-ratings[i], foods[i], 0), (-ratings[i], foods[i], 0));
        }

        this.t = -1;
    }
    
    public void ChangeRating(string food, int newRating) {

        var que = this.items[this.map[food]];
        que.Enqueue((-newRating, food, this.t), (-newRating, food, this.t));

        this.time[food] = this.t;
        this.t--;
    }
    
    public string HighestRated(string cuisine) {
        var que = this.items[cuisine];

        while (que.Count > 0)
        {
            (int _, string f, int t) = que.Peek();
            if (this.time[f] != t)
            {
                que.Dequeue();
            }
            else
            {
                return f;
            }
        }

        return string.Empty;
    }

    public int[][] ImageSmoother(int[][] img) {
        if (img.Length == 0 || img[0].Length == 0) return img;

        int rows = img.Length;
        int cols = img[0].Length;
        int[][] result = new int[rows][];

        for (int i = 0; i < rows; i++) {
            result[i] = new int[cols];
            for (int j = 0; j < cols; j++) {
                int sum = 0;
                int count = 0;
                for (int ni = i - 1; ni <= i + 1; ni++) {
                    for (int nj = j - 1; nj <= j + 1; nj++) {
                        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                            sum += img[ni][nj];
                            count++;
                        }
                    }
                }
                result[i][j] = sum / count;
            }
        }

        return result;
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
