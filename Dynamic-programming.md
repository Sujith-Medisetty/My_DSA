# Climbing Stairs

### Problem Statement
You are climbing a staircase. It takes **n** steps to reach the top. Each time you can either **climb 1 or 2 steps**. In how many distinct ways can you reach the top?

### Example 1:
```
Input: n = 3
Output: 3
Explanation:
1. (1,1,1)
2. (1,2)
3. (2,1)
```

### Example 2:
```
Input: n = 5
Output: 8
Explanation:
1. (1,1,1,1,1)
2. (1,1,1,2)
3. (1,1,2,1)
4. (1,2,1,1)
5. (2,1,1,1)
6. (1,2,2)
7. (2,1,2)
8. (2,2,1)
```

### Constraints:
- `1 <= n <= 45`

---

### Approach: Dynamic Programming (Optimized Space)
This problem follows the **Fibonacci pattern**. Let `dp[i]` represent the number of ways to reach step `i`.

#### Recurrence Relation:
- To reach step `i`, we could have come from:
  - Step `i-1` (1 step move)
  - Step `i-2` (2 steps move)
- So, `dp[i] = dp[i-1] + dp[i-2]`

#### Base Cases:
- `dp[1] = 1` (Only one way to climb 1 step)
- `dp[2] = 2` (Two ways: `{1+1, 2}`)

Instead of maintaining an array, we can use **two variables** to store the last two values.

---

### Java Code:
```java
class Solution {
    public int climbStairs(int n) {
        if (n == 1) return 1;
        if (n == 2) return 2;
        
        int prev2 = 1; // dp[1]
        int prev1 = 2; // dp[2]
        
        for (int i = 3; i <= n; i++) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        
        return prev1;
    }
}
```

---

### Complexity Analysis
- **Time Complexity:** `O(n)` → We iterate once from `3` to `n`
- **Space Complexity:** `O(1)` → We use only **two variables** (`prev1`, `prev2`)

# Frog Jump | Dynamic Programming Solution

## Problem Statement
There is a frog on the **1st** step of an **N**-stairs long staircase. The frog wants to reach the **Nth** stair. The height of the `(i+1)th` stair is given by `HEIGHT[i]`.

If the frog jumps from `i-th` to `j-th` stair, the energy lost in the jump is given by:

dp[i] = \( |HEIGHT[i-1] - HEIGHT[j-1]| \)

If the frog is on the `i-th` stair, it can jump either to the `i+1-th` stair or the `i+2-th` stair. Your task is to find the minimum total energy used by the frog to reach from the **1st** stair to the **Nth** stair.

### Example
#### Input:
```
2
4
10 20 30 10
3
10 50 10
```
#### Output:
```
20
0
```
#### Explanation:
For the first test case:
- The frog can jump from **1st** stair to **2nd** stair (`|20-10| = 10` energy lost).
- Then a jump from **2nd** stair to **4th** stair (`|10-20| = 10` energy lost).
- The total energy lost is **20**.

For the second test case:
- The frog can jump from **1st** stair to **3rd** stair (`|10-10| = 0` energy lost).
- The total energy lost is **0**.

---

## Java Solution Using Dynamic Programming

```java
import java.util.Scanner;
import java.util.Arrays;

public class FrogJumpDP {
    public static int minCostFrogJump(int[] heights) {
        int n = heights.length;
        if (n == 1) return 0; // No jumps needed if only one stair

        int[] dp = new int[n]; // DP array to store minimum energy to reach each step
        Arrays.fill(dp, Integer.MAX_VALUE); // Initialize DP array with high values
        dp[0] = 0; // Starting point

        for (int i = 1; i < n; i++) {
            int jumpOne = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]); // Jump from i-1
            int jumpTwo = (i > 1) ? dp[i - 2] + Math.abs(heights[i] - heights[i - 2]) : Integer.MAX_VALUE; // Jump from i-2

            dp[i] = Math.min(jumpOne, jumpTwo); // Choose min energy cost
        }

        return dp[n - 1]; // Min energy to reach last step
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases

        while (T-- > 0) {
            int N = sc.nextInt(); // Number of stairs
            int[] heights = new int[N];

            for (int i = 0; i < N; i++) {
                heights[i] = sc.nextInt();
            }

            System.out.println(minCostFrogJump(heights));
        }

        sc.close();
    }
}
```

---

## Explanation:
1. **Initialize a DP array `dp[n]` where `dp[i]` represents the minimum energy required to reach step `i`**.
2. **Base case:** `dp[0] = 0` (starting point, no energy needed).
3. **Transition:**
   - `dp[i] = min(dp[i-1] + |heights[i] - heights[i-1]|, dp[i-2] + |heights[i] - heights[i-2]|)`
   - The frog can jump either **1 step** or **2 steps**, choosing the minimum cost.
4. **Final answer:** `dp[n-1]` contains the minimum energy required to reach the last stair.

---

## Complexity Analysis
- **Time Complexity:** `O(N)`, as we iterate once through `N` stairs.
- **Space Complexity:** `O(N)`, due to the `dp` array (can be optimized to `O(1)`).


