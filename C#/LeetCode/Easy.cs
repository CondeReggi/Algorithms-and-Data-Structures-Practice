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
}