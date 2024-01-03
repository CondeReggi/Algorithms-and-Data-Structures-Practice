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
}