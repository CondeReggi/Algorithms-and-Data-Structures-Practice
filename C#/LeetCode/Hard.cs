public class Solution
{
    public int GetLengthOfOptimalCompression(string s, int k)
    {
        var memo = new int[s.Length, k + 1];
        return Helper(s, 0, k, memo);
    }

    private int Helper(string s, int start, int k, int[,] memo)
    {
        if (start >= s.Length || s.Length - start <= k)
        {
            return 0;
        }

        if (memo[start, k] != 0)
        {
            return memo[start, k];
        }

        int[] freq = new int[26];
        int maxFreq = 0;
        int answer = s.Length;

        for (int i = start; i < s.Length; i++)
        {
            freq[s[i] - 'a'] += 1;
            maxFreq = Math.Max(maxFreq, freq[s[i] - 'a']);
            int len = 1 + (maxFreq > 1 ? maxFreq.ToString().Length : 0);
            if (k >= i - start + 1 - maxFreq)
            {
                answer = Math.Min(answer, len + Helper(s, i + 1, k - (i - start + 1 - maxFreq), memo));
            }
        }

        memo[start, k] = answer;
        return answer;
    }
    public int MinDifficulty(int[] jobDifficulty, int d)
    {
        int n = jobDifficulty.Length;
        if (n < d) return -1;

        int[,] dp = new int[n + 1, d + 1];

        for (int i = 0; i <= n; i++)
        {
            for (int j = 0; j <= d; j++)
            {
                dp[i, j] = Int32.MaxValue;
            }
        }
        dp[0, 0] = 0;

        for (int day = 1; day <= d; day++)
        {
            for (int i = day; i <= n; i++)
            {
                int maxDiff = 0;
                for (int j = i; j >= day; j--)
                {
                    maxDiff = Math.Max(maxDiff, jobDifficulty[j - 1]);
                    if (dp[j - 1, day - 1] != Int32.MaxValue)
                    {
                        dp[i, day] = Math.Min(dp[i, day], dp[j - 1, day - 1] + maxDiff);
                    }
                }
            }
        }

        return dp[n, d];
    }
}