package com.atlantbh.auctionapp.utilities;

public class CalculateSimilarity {
    public static double calculate(String s1, String s2) {
        String longer = s1, shorter = s2;
        if (s1.length() < s2.length()) {
            longer = s2; shorter = s1;
        }

        int longerLength = longer.length();
        if (longerLength == 0) { return 1.0; }

        return (longerLength - editDistance(longer, shorter)) / (double) longerLength;
    }

    // Levenshtein Edit Distance
    public static int editDistance(String string1, String string2) {
        string1 = string1.toLowerCase();
        string2 = string2.toLowerCase();

        int[] costs = new int[string2.length() + 1];
        for (int i = 0; i <= string1.length(); i++) {
            int lastValue = i;
            for (int j = 0; j <= string2.length(); j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        int newValue = costs[j - 1];
                        if (string1.charAt(i - 1) != string2.charAt(j - 1)){
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        }
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[string2.length()] = lastValue;
        }
        return costs[string2.length()];
    }
}
