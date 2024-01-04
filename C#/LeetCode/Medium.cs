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
}