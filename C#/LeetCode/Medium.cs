
public class RandomizedSet
{
    private List<int> _lista;
    private Dictionary<int, int> _map;
    private Random _rand;

    public RandomizedSet()
    {
        _lista = new List<int>();
        _map = new Dictionary<int, int>();
        _rand = new Random();
    }

    public bool Insert(int val)
    {
        if (_map != null && _map.ContainsKey(val)) return false;

        _lista.Add(val);
        _map[val] = _lista.Count() - 1;

        return true;
    }

    public bool Remove(int val)
    {
        if (_map != null && !_map.ContainsKey(val))
        {
            return false;
        }

        int utlimoElemento = _lista[_lista.Count() - 1];
        int index = _map[val];

        //seteo nuevo index y cambio el valor en la lista.
        _lista[index] = utlimoElemento;
        _map[utlimoElemento] = index;

        _lista.RemoveAt(_lista.Count() - 1);
        _map.Remove(val);

        return true;
    }

    public int GetRandom()
    {
        int randomIndex = _rand.Next(_lista.Count());
        return _lista[randomIndex];
    }
}

public class MinStack
{
    private Stack<int> _minStack;
    private Stack<int> _stack;

    public MinStack()
    {
        _stack = new Stack<int>();
        _minStack = new Stack<int>();
    }

    public void Push(int val)
    {
        _stack.Push(val);

        if (_minStack.Count == 0 || val <= GetMin()) _minStack.Push(val);
    }

    public void Pop()
    {
        if (_stack.Count() == 0) return;

        var ultimo = _stack.Pop();
        if (ultimo == GetMin())
        {
            _minStack.Pop();
        }
    }

    public int Top()
    {
        if (_stack.Count() == 0) return -1;

        var value = _stack.Peek();
        return value;
    }

    public int GetMin()
    {
        if (_minStack.Count() == 0) return -1;

        return _minStack.Peek(); ;
    }
}

public class Solution
{
    public int MaxWidthOfVerticalArea(int[][] points)
    {
        if (points.Length <= 1) return 0;

        Array.Sort(points, (a, b) => a[0].CompareTo(b[0]));

        int max = points[1][0] - points[0][0];

        for (int i = 1; i < points.Length; i++)
        {
            int distancia = points[i][0] - points[i - 1][0];
            if (distancia > max) max = distancia;
        }

        return max;
    }
    public int NumRollsToTarget(int n, int k, int target)
    {
        int[,] dp = new int[n + 1, target + 1];
        dp[0, 0] = 1;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= target; j++)
            {
                for (int l = 1; l <= k; l++)
                {
                    if (j - l >= 0)
                    {
                        dp[i, j] = (dp[i, j] + dp[i - 1, j - l]) % 1000000007;
                    }
                }
            }
        }

        return dp[n, target];
    }
    public int MinCost(string colors, int[] neededTime)
    {
        if (colors.Length == 0) return 0;

        int sum = 0;

        for (int i = 1; i < colors.Length; i++)
        {
            if (colors[i] == colors[i - 1])
            {
                sum += Math.Min(neededTime[i - 1], neededTime[i]);
                neededTime[i] = Math.Max(neededTime[i - 1], neededTime[i]);
            }
        }

        return sum;
    }
    public IList<IList<int>> FindMatrix(int[] nums)
    {
        IList<IList<int>> result = new List<IList<int>>();
        Queue<int> queue = new Queue<int>(nums);
        HashSet<int> currentRowSet = new HashSet<int>();

        while (queue.Count > 0)
        {
            int size = queue.Count;
            List<int> currentRow = new List<int>();

            for (int i = 0; i < size; i++)
            {
                int num = queue.Dequeue();
                if (!currentRowSet.Contains(num))
                {
                    currentRow.Add(num);
                    currentRowSet.Add(num);
                }
                else
                {
                    queue.Enqueue(num);
                }
            }

            result.Add(currentRow);
            currentRowSet.Clear();
        }

        return result;
    }
    public int NumberOfBeams(string[] bank)
    {
        int counter = 0;
        if (bank.Length == 0) return counter;
        Dictionary<int, int> datos = new Dictionary<int, int>();

        for (int i = 0; i < bank.Length; i++)
        {
            int cantidad = 0;
            for (int j = 0; j < bank[i].Length; j++)
            {
                if (bank[i][j] == '1')
                {
                    if (!datos.ContainsKey(i))
                    {
                        datos[i] = 0;
                    }
                    datos[i]++;
                }
            }
        }

        var orderedValues = datos.Select(kvp => kvp.Value).ToList();

        for (int i = 1; i < orderedValues.Count; i++)
        {
            counter += orderedValues[i] * orderedValues[i - 1];
        }

        return counter;
    }

    public IList<IList<int>> SubsetsWithDup(int[] nums)
    {
        Array.Sort(nums);
        IList<IList<int>> result = new List<IList<int>>();
        Backtrack(result, new List<int>(), 0, nums);
        return result;
    }

    private void Backtrack(IList<IList<int>> result, IList<int> current, int idx, int[] nums)
    {
        result.Add(new List<int>(current));

        for (int i = idx; i < nums.Length; i++)
        {
            if (i > idx && nums[i] == nums[i - 1]) continue;

            current.Add(nums[i]);
            Backtrack(result, current, i + 1, nums);
            current.RemoveAt(current.Count - 1);
        }
    }

    public IList<IList<string>> Partition(string s)
    {
        var result = new List<IList<string>>();
        Backtrack(result, new List<string>(), 0, s);
        return result;
    }

    private void Backtrack(IList<IList<string>> result, IList<string> current, int start, string s)
    {
        if (start == s.Length)
        {
            result.Add(new List<string>(current));
            return;
        }

        for (int end = start; end < s.Length; end++)
        {
            if (IsPalindrome(s, start, end))
            {
                current.Add(s.Substring(start, end - start + 1));
                Backtrack(result, current, end + 1, s);
                current.RemoveAt(current.Count - 1);
            }
        }
    }

    private bool IsPalindrome(string s, int low, int high)
    {
        while (low < high)
        {
            if (s[low++] != s[high--])
            {
                return false;
            }
        }
        return true;
    }

    public int MinOperations(int[] nums)
    {
        Array.Sort(nums);
        if (nums.Length <= 1) return -1;

        int current = nums[0];
        int counter = 1;
        int result = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            int siguiente = nums[i];

            if (current != siguiente)
            {
                int paquetes = GetMinBoxes(counter);
                if (paquetes == -1) return paquetes;
                result += paquetes;
                current = siguiente;
                counter = 1;
            }
            else
            {
                counter++;
            }
        }

        int ultimosPaquetes = GetMinBoxes(counter);
        if (ultimosPaquetes == -1) return -1;
        result += ultimosPaquetes;

        return result;
    }

    private int GetMinBoxes(int n)
    {
        if (n < 2) return -1;
        if (n % 3 == 0) return n / 3;
        int paquetes = n / 3;
        if (n % 3 == 1 && paquetes >= 1) return paquetes + 1;
        if (n % 3 == 2) return paquetes + 1;

        return -1;
    }

    public int LengthOfLIS(int[] nums)
    {
        if (nums.Length <= 1) return nums.Length;
        int[] dp = new int[nums.Length];

        for (int x = 0; x < nums.Length; x++) dp[x] = 1;

        for (int i = 0; i < nums.Length; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (nums[i] > nums[j] && dp[i] < dp[j] + 1)
                {
                    dp[i] = dp[j] + 1;
                }
            }
        }

        return dp.ToList().Max();
    }

    public int MaxProduct(int[] nums)
    {
        if (nums.Length == 0) return 0;

        var maxSoFar = nums[0];
        var minSoFar = nums[0];
        var result = maxSoFar;

        for (int i = 1; i < nums.Length; i++)
        {
            var curr = nums[i];
            var tempMax = Math.Max(curr, Math.Max(maxSoFar * curr, minSoFar * curr));
            minSoFar = Math.Min(curr, Math.Min(maxSoFar * curr, minSoFar * curr));

            maxSoFar = tempMax;
            result = Math.Max(maxSoFar, result);
        }

        return result;
    }

    public int AmountOfTime(TreeNode root, int start)
    {
        if (root == null) return 0;

        // Construyo grafo de listas de adyacencia
        var graph = new Dictionary<int, List<int>>();
        BuildGraph(root, null, graph);

        // BFS para infectar todos los nodos
        var queue = new Queue<int>();
        var visited = new HashSet<int>();

        int counter = 0;

        queue.Enqueue(start);
        visited.Add(start);

        while (queue.Count > 0)
        {
            int size = queue.Count;
            for (int i = 0; i < size; i++)
            {
                var current = queue.Dequeue();
                var listaAdyacentes = graph[current];

                foreach (var adyacente in listaAdyacentes)
                {
                    if (!visited.Contains(adyacente))
                    {
                        visited.Add(adyacente);
                        queue.Enqueue(adyacente);
                    }
                }
            }

            if (queue.Count > 0) counter++;
        }

        return counter;
    }

    private void BuildGraph(TreeNode node, TreeNode parent, Dictionary<int, List<int>> graph)
    {
        if (node == null) return;

        if (!graph.ContainsKey(node.val))
        {
            graph[node.val] = new List<int>();
        }
        if (parent != null)
        {
            graph[node.val].Add(parent.val);
            graph[parent.val].Add(node.val);
        }
        BuildGraph(node.left, node, graph);
        BuildGraph(node.right, node, graph);
    }

    private Dictionary<int, string> numeralToRoman = new Dictionary<int, string>
    {
        {1000, "M"},
        {900, "CM"},
        {500, "D"},
        {400, "CD"},
        {100, "C"},
        {90, "XC"},
        {50, "L"},
        {40, "XL"},
        {10, "X"},
        {9, "IX"},
        {5, "V"},
        {4, "IV"},
        {1, "I"}
    };

    public string IntToRoman(int num)
    {
        string roman = "";

        foreach (var item in numeralToRoman)
        {
            while (num >= item.Key)
            {
                roman += item.Value;
                num -= item.Key;
            }
        }
        return roman;
    }

    public int MaxAncestorDiff(TreeNode root)
    {
        return DFS(root, root.val, root.val);
    }

    public int DFS(TreeNode node, int currentMax, int currentMin)
    {
        if (node == null) return currentMax - currentMin;

        var current_max = Math.Max(currentMax, node.val);
        var current_min = Math.Min(currentMin, node.val);

        var left_diff = DFS(node.left, current_max, current_min);
        var right_diff = DFS(node.right, current_max, current_min);

        return Math.Max(left_diff, right_diff);
    }

    public IList<IList<int>> FindWinners(int[][] matches)
    {
        Dictionary<int, int> datos = new Dictionary<int, int>();

        for (int i = 0; i < matches.Length; i++)
        {
            var ganador = matches[i][0];
            var perdio = matches[i][1];

            if (!datos.ContainsKey(ganador)) datos[ganador] = 0;

            if (datos.ContainsKey(perdio))
            {
                datos[perdio]++;
            }
            else
            {
                datos[perdio] = 1;
            }
        }

        var ganadores = datos
            .Where(kvp => kvp.Value == 0)
            .Select(kvp => kvp.Key)
            .OrderBy(x => x)
            .ToList();
        var jugadoresConUnaDerrota = datos
            .Where(kvp => kvp.Value == 1)
            .Select(kvp => kvp.Key)
            .OrderBy(x => x)
            .ToList();

        return new List<IList<int>>() { ganadores, jugadoresConUnaDerrota };
    }

    public bool CloseStrings(string word1, string word2)
    {
        int[] freq1 = new int[26];
        int[] freq2 = new int[26];

        foreach (char a in word1.ToCharArray()) freq1[a - 'a']++;
        foreach (char b in word2.ToCharArray()) freq2[b - 'a']++;

        for (int i = 0; i < 26; i++)
        {
            if ((freq1[i] == 0 && freq2[i] != 0) || (freq1[i] != 0 && freq2[i] == 0)) return false;
        }

        Array.Sort(freq1);
        Array.Sort(freq2);

        for (int i = 0; i < 26; i++)
        {
            if (freq1[i] != freq2[i]) return false;
        }

        return true;
    }

    public ListNode RotateRight(ListNode head, int k)
    {
        if (head == null || head.next == null || k == 0) return head;

        ListNode aux = head;
        int length = 1;
        while (aux.next != null)
        {
            aux = aux.next;
            length++;
        }

        aux.next = head;

        k = k % length;
        if (k == 0)
        {
            aux.next = null;
            return head;
        }

        aux = head;
        for (int i = 0; i < length - k - 1; i++)
        {
            aux = aux.next;
        }

        head = aux.next;
        aux.next = null;

        return head;
    }

    public int FindPeakElement(int[] nums)
    {
        var left = 0;
        var right = nums.Length - 1;

        while (left + 1 < right)
        {
            var mid = left + (right - left) / 2;

            if (nums[mid] < nums[mid + 1])
            {
                left = mid;
            }
            else
            {
                right = mid;
            }
        }

        return nums[left] > nums[right] ? left : right;
    }

    public bool IsValidSudoku(char[][] board)
    {
        Dictionary<int, HashSet<int>> datosColumn = new Dictionary<int, HashSet<int>>();
        Dictionary<int, HashSet<int>> datosRow = new Dictionary<int, HashSet<int>>();
        Dictionary<int, HashSet<int>> datosCube = new Dictionary<int, HashSet<int>>();

        //Creo hashes de columns
        for (int k = 0; k < board[0].Length; k++)
        {
            datosColumn.Add(k, new HashSet<int>());
            datosRow.Add(k, new HashSet<int>());
            datosCube.Add(k, new HashSet<int>());
        }

        for (int i = 0; i < board.Length; i++)
        {
            for (int j = 0; j < board[i].Length; j++)
            {
                var value = board[i][j];
                int cubeIndex = (i / 3) * 3 + j / 3;

                if (value == '.') continue;

                if (datosCube[cubeIndex].Contains((int)value)) return false;
                datosCube[cubeIndex].Add((int)value);

                if (datosRow[i].Contains((int)value)) return false;
                datosRow[i].Add((int)value);

                if (datosColumn[j].Contains((int)value)) return false;
                datosColumn[j].Add((int)value);
            }
        }

        return true;
    }

    //Con backtracking
    public int MinFallingPathSum(int[][] matrix)
    {
        int minSum = int.MaxValue;
        for (int col = 0; col < matrix[0].Length; col++)
        {
            minSum = Math.Min(minSum, Backtrack(0, col, matrix));
        }
        return minSum;
    }

    private int Backtrack(int row, int col, int[][] matrix)
    {
        if (row == matrix.Length - 1)
        {
            return matrix[row][col];
        }

        int left = int.MaxValue, down = int.MaxValue, right = int.MaxValue;

        if (col > 0)
        {
            left = Backtrack(row + 1, col - 1, matrix);
        }

        down = Backtrack(row + 1, col, matrix);

        if (col < matrix[0].Length - 1)
        {
            right = Backtrack(row + 1, col + 1, matrix);
        }

        return matrix[row][col] + Math.Min(left, Math.Min(down, right));
    }

    //Con dp
    public int MinFallingPathSum(int[][] matrix)
    {
        int n = matrix.Length;
        int[,] dp = new int[n, n];

        for (int col = 0; col < n; col++)
        {
            dp[0, col] = matrix[0][col];
        }

        for (int row = 1; row < n; row++)
        {
            for (int col = 0; col < n; col++)
            {
                int left = col > 0 ? dp[row - 1, col - 1] : int.MaxValue;
                int middle = dp[row - 1, col];
                int right = col < n - 1 ? dp[row - 1, col + 1] : int.MaxValue;

                dp[row, col] = matrix[row][col] + Math.Min(left, Math.Min(middle, right));
            }
        }

        int minSum = int.MaxValue;
        for (int col = 0; col < n; col++)
        {
            minSum = Math.Min(minSum, dp[n - 1, col]);
        }

        return minSum;
    }

    public void Rotate(int[][] matrix)
    {
        var n = matrix.Length;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                var aux = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = aux;
            }
        }

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n / 2; j++)
            {
                var auxiliar = matrix[i][j];
                matrix[i][j] = matrix[i][n - j - 1];
                matrix[i][n - j - 1] = auxiliar;
            }
        }
    }

    public int LongestCommonSubsequence(string text1, string text2)
    {
        int n = text1.Length;
        int m = text2.Length;
        int[,] dp = new int[n + 1, m + 1];

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                if (text1[i - 1] == text2[j - 1])
                {
                    dp[i, j] = dp[i - 1, j - 1] + 1;
                }
                else
                {
                    dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
                }
            }
        }

        return dp[n, m];
    }

    public int MaximumGap(int[] nums)
    {
        if (nums.Length <= 1) return 0;

        Array.Sort(nums);
        int maxGap = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            var first = nums[i - 1];
            var current = nums[i];

            if (maxGap < Math.Abs(current - first))
                maxGap = current - first;
        }

        return maxGap;
    }

    public IList<IList<string>> GroupAnagrams(string[] strs)
    {
        Dictionary<string, List<string>> dictionary = new Dictionary<string, List<string>>();

        for (int i = 0; i < strs.Length; i++)
        {
            var palabra = new String(strs[i].ToList().OrderBy(x => x).ToArray());

            if (dictionary.ContainsKey(palabra))
            {
                dictionary[palabra].Add(strs[i]);
            }
            else
            {
                dictionary[palabra] = new List<string>() { strs[i] };
            }
        }

        IList<IList<string>> result = new List<IList<string>>();

        foreach (var element in dictionary)
        {
            result.Add(element.Value);
        }

        return result;
    }

    public int MaxSubArray(int[] nums)
    {
        int n = nums.Length;
        int[] dp = new int[n];
        dp[0] = nums[0];
        int maxSum = dp[0];

        for (int i = 1; i < n; i++)
        {
            dp[i] = Math.Max(nums[i], dp[i - 1] + nums[i]);
            maxSum = Math.Max(maxSum, dp[i]);
        }

        return maxSum;
    }

    public bool CanJump(int[] nums)
    {
        int maxReachable = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            if (i > maxReachable) return false;
            maxReachable = Math.Max(maxReachable, i + nums[i]);
        }
        return true;
    }

    public ListNode SortList(ListNode head)
    {
        if (head == null || head.next == null)
        {
            return head;
        }

        ListNode middle = FindMiddle(head);
        ListNode right = middle.next;
        middle.next = null;

        ListNode leftSorted = SortList(head);
        ListNode rightSorted = SortList(right);

        return Merge(leftSorted, rightSorted);
    }

    private ListNode FindMiddle(ListNode head)
    {
        ListNode slow = head;
        ListNode fast = head;

        while (fast.next != null && fast.next.next != null)
        {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }

    private ListNode Merge(ListNode left, ListNode right)
    {
        ListNode dummy = new ListNode();
        ListNode current = dummy;

        while (left != null && right != null)
        {
            if (left.val < right.val)
            {
                current.next = left;
                left = left.next;
            }
            else
            {
                current.next = right;
                right = right.next;
            }
            current = current.next;
        }

        if (left != null)
        {
            current.next = left;
        }
        if (right != null)
        {
            current.next = right;
        }

        return dummy.next;
    }

    public int UniquePathsWithObstacles(int[][] obstacleGrid)
    {
        if (obstacleGrid == null || obstacleGrid.Length == 0 || obstacleGrid[0][0] == 1) return 0;

        int m = obstacleGrid.Length;
        int n = obstacleGrid[0].Length;

        int[,] dp = new int[m, n];
        dp[0, 0] = 1;

        for (int i = 1; i < m; i++)
        {
            if (obstacleGrid[i][0] == 1)
            {
                dp[i, 0] = 0;
            }
            else
            {
                dp[i, 0] = dp[i - 1, 0];
            }
        }

        for (int j = 1; j < n; j++)
        {
            if (obstacleGrid[0][j] == 1)
            {
                dp[0, j] = 0;
            }
            else
            {
                dp[0, j] = dp[0, j - 1];
            }
        }

        for (int i = 1; i < m; i++)
        {
            for (int j = 1; j < n; j++)
            {
                if (obstacleGrid[i][j] == 1)
                {
                    dp[i, j] = 0;
                }
                else
                {
                    dp[i, j] = dp[i - 1, j] + dp[i, j - 1];
                }
            }
        }

        return dp[m - 1, n - 1];
    }

    public string FrequencySort(string s)
    {
        Dictionary<char, int> data = new Dictionary<char, int>();

        for (int i = 0; i < s.Length; i++)
        {
            var current = s[i];

            if (data.ContainsKey(current)) data[current]++;
            else data[current] = 1;
        }

        string result = "";
        var dataOrdered = data.OrderByDescending(pair => pair.Value);

        foreach (var elem in dataOrdered)
        {
            var key = elem.Key;
            var value = elem.Value;

            for (int k = 0; k < value; k++) result += key;
        }

        return result;
    }

    public int CountCharacters(string[] words, string chars)
    {
        int[] charCount = new int[26];
        foreach (char c in chars)
        {
            charCount[c - 'a']++;
        }

        int sum = 0;
        foreach (string word in words)
        {
            int[] tempCharCount = new int[26];
            Array.Copy(charCount, tempCharCount, 26);
            bool isGood = true;

            foreach (char c in word)
            {
                if (tempCharCount[c - 'a'] > 0)
                {
                    tempCharCount[c - 'a']--;
                }
                else
                {
                    isGood = false;
                    break;
                }
            }

            if (isGood)
            {
                sum += word.Length;
            }
        }

        return sum;
    }

    public int UnhappyFriends(int n, int[][] preferences, int[][] pairs)
    {
        int[,] orderedPreferencesOfFriends = new int[n, n];
        int[] matches = new int[n];

        int unhappyFriendCount = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n - 1; j++)
            {
                orderedPreferencesOfFriends[i, preferences[i][j]] = j;
            }
        }

        foreach (var pair in pairs)
        {
            matches[pair[0]] = pair[1];
            matches[pair[1]] = pair[0];
        }

        for (int k = 0; k < n; k++)
        {
            int firstMatch = matches[k];
            int firstMatchIndex = orderedPreferencesOfFriends[k, firstMatch];

            for (int l = 0; l < firstMatchIndex; l++)
            {
                int u = preferences[k][l];
                int v = matches[u];
                if (orderedPreferencesOfFriends[u, k] < orderedPreferencesOfFriends[u, v])
                {
                    unhappyFriendCount++;
                    break;
                }
            }
        }

        return unhappyFriendCount;
    }

    public int NumSquares(int n)
    {
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++)
        {
            dp[i] = int.MaxValue;
        }
        dp[0] = 0;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j * j <= i; j++)
            {
                dp[i] = Math.Min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }

    public IList<int> LargestDivisibleSubset(int[] nums)
    {
        var n = nums.Length;
        int[] count = new int[n];
        int[] prev = new int[n];

        Array.Sort(nums);

        int maxIndex = 0;
        for (int i = 0; i < n; i++)
        {
            count[i] = 1;
            prev[i] = -1;
            for (int j = i - 1; j >= 0; j--)
            {
                if (nums[i] % nums[j] == 0)
                {
                    if (count[j] + 1 > count[i])
                    {
                        count[i] = count[j] + 1;
                        prev[i] = j;
                    }
                }
            }

            if (count[i] > count[maxIndex])
            {
                maxIndex = i;
            }
        }

        List<int> largestDivisibleSubset = new List<int>();
        for (int i = maxIndex; i != -1; i = prev[i])
        {
            largestDivisibleSubset.Add(nums[i]);
        }

        return largestDivisibleSubset;
    }
}
