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

# Maximum Sum of Non-Adjacent Subsequence

### Problem Statement

You are given an array/list of `N` integers. You are supposed to return the maximum sum of the subsequence with the constraint that no two elements are adjacent in the given array/list.

### Notes:
- A subsequence of an array/list is obtained by deleting some number of elements (can be zero) from the array/list, leaving the remaining elements in their original order.

### Constraints:
- `1 <= T <= 500`
- `1 <= N <= 1000`
- `0 <= ARR[i] <= 10^5`

Where `ARR[i]` denotes the `i-th` element in the array/list.

### Time Limit: 1 second.

#### Explanation:
- **Test Case 1:** `ARR = [1, 2, 4]`
  - The sum of `ARR[0]` & `ARR[2]` is `5`, which is greater than `ARR[1]` which is `2`. So, the maximum sum is `5`.
  
- **Test Case 2:** `ARR = [2, 1, 4, 9]`
  - The sum of `ARR[0]` and `ARR[2]` is `6`, the sum of `ARR[1]` and `ARR[3]` is `10`, and the sum of `ARR[0]` and `ARR[3]` is `11`. The maximum sum is `11`.

- **Test Case 3:** `ARR = [1, 2, 3, 5, 4]`
  - The sum of `ARR[0]`, `ARR[2]`, and `ARR[4]` is `8`, which is the maximum sum for a non-adjacent subsequence.
  
- **Test Case 4:** `ARR = [1, 2, 3, 1, 3, 5, 8, 1, 9]`
  - The sum of `ARR[0]`, `ARR[2]`, `ARR[4]`, `ARR[6]`, and `ARR[8]` is `24`, which is the maximum sum for a non-adjacent subsequence.

## Approach:

This is a dynamic programming problem where we aim to find the maximum sum of a subsequence such that no two elements in the subsequence are adjacent.

### Dynamic Programming Approach:
1. **Base Cases:**
   - If there are no elements (`N = 0`), the maximum sum is `0`.
   - If there is only one element, the maximum sum is that element itself.

2. **State Definition:**
   - Let `dp[i]` represent the maximum sum of the subsequence considering elements from `0` to `i`.
   
   We have two choices:
   - **Exclude `ARR[i]`**: The sum remains the same as `dp[i-1]`.
   - **Include `ARR[i]`**: The sum becomes `ARR[i]` plus `dp[i-2]` (ensuring no adjacent elements are chosen).
   
   The recurrence relation is:
   \[
   dp[i] = \max(dp[i-1], ARR[i] + dp[i-2])
   \]

3. **Final Solution:**
   - The result will be the value at `dp[N-1]`, which contains the maximum sum from the entire array.

### Time Complexity:
- **O(N)** per test case, where `N` is the length of the array. This is because we process each element of the array once.

### Space Complexity:
- **O(N)** for the `dp` array used to store intermediate results.

---

## Java Code:

```java
import java.util.Scanner;

public class MaxSumNonAdjacent {

    public static int maxSum(int[] arr, int n) {
        if (n == 0) return 0; // No elements, no sum
        if (n == 1) return arr[0]; // Only one element, return that element

        int[] dp = new int[n]; // DP array to store maximum sums
        dp[0] = arr[0]; // Base case for the first element
        dp[1] = Math.max(arr[0], arr[1]); // Base case for the second element

        // Fill the DP array
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i-1], arr[i] + dp[i-2]); // Max of excluding or including current element
        }

        return dp[n-1]; // The last element will contain the result
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int T = scanner.nextInt(); // Read number of test cases
        for (int t = 0; t < T; t++) {
            int n = scanner.nextInt(); // Read the size of the array
            int[] arr = new int[n];
            
            // Read the array elements
            for (int i = 0; i < n; i++) {
                arr[i] = scanner.nextInt();
            }

            // Call the function to get the max sum of non-adjacent subsequence
            System.out.println(maxSum(arr, n));
        }

        scanner.close();
    }
}
```
# **Ninja Training**

## **Problem Statement**
Ninja is planning this **N days-long** training schedule. Each day, he can perform any one of these three activities:
- **Running**
- **Fighting Practice**
- **Learning New Moves**

Each activity has **some merit points** assigned to it per day. However, Ninja **cannot do the same activity on two consecutive days**. Your task is to help Ninja **find the maximum merit points** he can earn over **N days**.

### **Example**
#### **Input**
```
2
3
1 2 5
3 1 1
3 3 3
3
10 40 70
20 50 80
30 60 90
```

#### **Output**
```
11
210
```

### **Explanation**
#### **Test Case 1**
Given points array:
```
[[1, 2, 5],
 [3, 1, 1],
 [3, 3, 3]]
```
One optimal way Ninja can train is:
- **Day 1:** Learn new moves (**5 points**)
- **Day 2:** Running (**3 points**)
- **Day 3:** Fighting practice (**3 points**)

Total: **5 + 3 + 3 = 11**

#### **Test Case 2**
Given points array:
```
[[10, 40, 70],
 [20, 50, 80],
 [30, 60, 90]]
```
One optimal way Ninja can train is:
- **Day 1:** Learn new moves (**70 points**)
- **Day 2:** Fighting (**50 points**)
- **Day 3:** Learn new moves (**90 points**)

Total: **70 + 50 + 90 = 210**

---

## **Approach**
### **1. Dynamic Programming Approach (Tabulation - Space Optimized)**
- Define `dp[i][j]` as the **maximum merit points** from day `0` to `i` if activity `j` is performed on day `i`.
- Transition formula:
  ```
  dp[i][j] = points[i][j] + max(dp[i-1][x]) where x ≠ j
  ```
- Base Case:
  ```
  dp[0][j] = points[0][j]  (for j = 0, 1, 2)
  ```
- We optimize **space complexity** from `O(N x 3)` to `O(1)` by using **three variables** (`prev0`, `prev1`, `prev2`).

---

## **Java Code**
```java
import java.util.*;

public class NinjaTraining {
    public static int ninjaTraining(int n, int[][] points) {
        // Previous day points
        int prev0 = points[0][0]; // Running
        int prev1 = points[0][1]; // Fighting
        int prev2 = points[0][2]; // Learning New Moves

        for (int day = 1; day < n; day++) {
            // Compute max points for each activity today
            int curr0 = points[day][0] + Math.max(prev1, prev2);
            int curr1 = points[day][1] + Math.max(prev0, prev2);
            int curr2 = points[day][2] + Math.max(prev0, prev1);

            // Update previous day values
            prev0 = curr0;
            prev1 = curr1;
            prev2 = curr2;
        }

        // Return the max among the last day's activities
        return Math.max(prev0, Math.max(prev1, prev2));
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases
        while (T-- > 0) {
            int n = sc.nextInt(); // Number of days
            int[][] points = new int[n][3];

            // Input points array
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < 3; j++) {
                    points[i][j] = sc.nextInt();
                }
            }

            // Compute and print max merit points
            System.out.println(ninjaTraining(n, points));
        }
        sc.close();
    }
}
```

---

## **Complexity Analysis**
- **Time Complexity:** `O(N)` (Iterate through `N` days)
- **Space Complexity:** `O(1)` (Using only three variables: `prev0`, `prev1`, `prev2`)

---

# Unique Paths Problem

### Problem Statement

You are present at point ‘A’ which is the top-left cell of an M X N matrix, and your destination is point ‘B’, which is the bottom-right cell of the same matrix. Your task is to find the total number of unique paths from point ‘A’ to point ‘B’. In other words, you will be given the dimensions of the matrix as integers ‘M’ and ‘N’, and your task is to find the total number of unique paths from the cell MATRIX[0][0] to MATRIX[M-1][N-1].

To traverse in the matrix, you can either move Right or Down at each step. For example, in a given point MATRIX[i][j], you can move to either MATRIX[i + 1][j] or MATRIX[i][j + 1].

### Input Format:
- The first input line contains the number of test cases, `T`.
- For each test case, two integers `M` and `N` are given, which represent the number of rows and columns in the matrix.

### Output Format:
- For each test case, output a single integer representing the total number of unique paths.

### Constraints:
- 1 ≤ T ≤ 100
- 1 ≤ M ≤ 15
- 1 ≤ N ≤ 15

### Time Limit:
- 1 second


### Explanation:

#### Test case 1:
We are given a 3 x 2 matrix. The possible paths from (0, 0) to (2, 1) are:
- Path 1: (0, 0) → (0, 1) → (1, 1) → (2, 1)
- Path 2: (0, 0) → (1, 0) → (2, 0) → (2, 1)
- Path 3: (0, 0) → (1, 0) → (1, 1) → (2, 1)

Hence, the total number of paths is 3.

#### Test case 2:
We are given a 1 x 6 matrix, where there is only one row. Hence, the total number of paths is 1.

## Approach

The problem can be solved using Dynamic Programming (DP) in a bottom-up manner. The idea is to use a 2D DP table where `dp[i][j]` represents the number of unique paths to reach the cell `(i, j)`.

### Steps:
1. **Base Case**: Initialize the last row and last column of the DP table with 1, since there is only one way to move along the last row (move right) or the last column (move down).
2. **Fill the DP Table**: Iterate over the rest of the cells, starting from the bottom-right corner to the top-left. The value at each cell `dp[i][j]` is the sum of the values from the cell directly below (`dp[i+1][j]`) and the cell directly to the right (`dp[i][j+1]`).
3. **Return the Result**: The result will be stored in `dp[0][0]`, which represents the number of unique paths to reach the top-left cell.

### Code Implementation:

```java
import java.util.Scanner;

public class UniquePaths {
    public static int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        // Base case: Last row and last column are 1 (only one way to move)
        for (int i = 0; i < m; i++) {
            dp[i][n - 1] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[m - 1][j] = 1;
        }

        // Bottom-up filling
        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[i][j] = dp[i + 1][j] + dp[i][j + 1];
            }
        }

        return dp[0][0];  // Start position
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int t = sc.nextInt();  // Number of test cases
        
        while (t-- > 0) {
            int m = sc.nextInt();
            int n = sc.nextInt();
            System.out.println(uniquePaths(m, n));
        }
        sc.close();
    }
}
```
# Problem Statement

Given an `N x M` maze with obstacles, count and return the number of unique paths to reach the right-bottom cell from the top-left cell. A cell in the given maze has a value of `-1` if it is a blockage or dead-end, else `0`. From a given cell, you are allowed to move to cells `(i+1, j)` and `(i, j+1)` only. Since the answer can be large, print it modulo \(10^9 + 7\).

## Input
- The first line contains an integer `T`, the number of test cases.
- For each test case:
  - The first line contains two integers `N` and `M` (1 ≤ N, M ≤ 200), the dimensions of the maze.
  - The next `N` lines contain `M` space-separated integers, where:
    - `0` denotes an empty cell.
    - `-1` denotes a blocked cell.

## Output
- For each test case, print the number of unique paths to reach the bottom-right corner of the maze, modulo \(10^9 + 7\).

## Constraints
- 1 ≤ T ≤ 10
- 1 ≤ N, M ≤ 200

## Note
- It is guaranteed that the top-left cell does not have an obstacle.

# Approach

We can solve this problem using dynamic programming. We'll maintain a 2D DP array where `dp[i][j]` represents the number of ways to reach the cell `(i, j)` from the top-left corner.

### Steps:
1. Initialize `dp[0][0] = 1` if the starting point is not blocked.
2. For each cell `(i, j)`:
   - If it's not blocked (`maze[i][j] != -1`), update `dp[i][j]` as the sum of the number of ways to reach from the top (`dp[i-1][j]`) and from the left (`dp[i][j-1]`).
   - If the cell is blocked (`maze[i][j] == -1`), set `dp[i][j] = 0`.
3. The result will be in `dp[N-1][M-1]` after filling the DP table.

# Code

```java
import java.util.Scanner;

public class UniquePathsInMaze {

    static final int MOD = 1000000007;

    public static int uniquePaths(int N, int M, int[][] maze) {
        int[][] dp = new int[N][M];

        // Initialize the starting point
        if (maze[0][0] == 0) {
            dp[0][0] = 1;
        }

        // Fill the DP table
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (maze[i][j] == -1) {
                    dp[i][j] = 0; // Blocked cells
                } else {
                    if (i > 0) {
                        dp[i][j] = (dp[i][j] + dp[i - 1][j]) % MOD; // From above
                    }
                    if (j > 0) {
                        dp[i][j] = (dp[i][j] + dp[i][j - 1]) % MOD; // From left
                    }
                }
            }
        }

        return dp[N - 1][M - 1]; // Bottom-right corner contains the result
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases
        
        while (T-- > 0) {
            int N = sc.nextInt();
            int M = sc.nextInt();
            int[][] maze = new int[N][M];
            
            // Read the maze input
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    maze[i][j] = sc.nextInt();
                }
            }

            // Calculate the result for this maze
            System.out.println(uniquePaths(N, M, maze));
        }
        sc.close();
    }
}
```

# Minimum Path Sum in Ninjaland

```Ref
https://www.naukri.com/code360/problems/minimum-path-sum_985349?source=youtube&campaign=striver_dp_videos&utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_dp_videos
```

### Approach
The problem can be solved using **Dynamic Programming (DP)** to find the minimum path sum from the top-left corner `(0,0)` to the bottom-right corner `(N-1, M-1)`. Since we can only move **right** or **down**, we can use the following approach:

1. **Define DP State:** Let `dp[i][j]` represent the minimum sum required to reach cell `(i, j)`.
2. **Base Case:** The starting point `dp[0][0]` is simply `GRID[0][0]`.
3. **Transition:**
   - If moving **right** from `(i, j-1)`, the cost is `dp[i][j-1] + GRID[i][j]`.
   - If moving **down** from `(i-1, j)`, the cost is `dp[i-1][j] + GRID[i][j]`.
   - The optimal cost to reach `(i, j)` is the **minimum** of these two values:
     
     ```
     dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + GRID[i][j]
     ```
4. **Final Answer:** The result is stored in `dp[N-1][M-1]`.

## Java Implementation
```java
import java.util.*;

public class MinimumPathSum {
    public static int minPathSum(int[][] grid, int N, int M) {
        int[][] dp = new int[N][M];
        
        // Initialize dp array with maximum integer value
        for (int[] row : dp) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        
        // Initialize the first cell
        dp[0][0] = grid[0][0];
        
        // Fill the first row (only right moves possible)
        for (int j = 1; j < M; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }
        
        // Fill the first column (only down moves possible)
        for (int i = 1; i < N; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
        
        // Fill the rest of the DP table
        for (int i = 1; i < N; i++) {
            for (int j = 1; j < M; j++) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
        
        return dp[N - 1][M - 1];
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases
        
        while (T-- > 0) {
            int N = sc.nextInt();
            int M = sc.nextInt();
            int[][] grid = new int[N][M];
            
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    grid[i][j] = sc.nextInt();
                }
            }
            
            System.out.println(minPathSum(grid, N, M));
        }
        sc.close();
    }
}
```

## Complexity Analysis
- **Time Complexity:** `O(N * M)`, since we iterate through every cell once.
- **Space Complexity:** `O(N * M)`, due to the `dp` table storage.
- We can further **optimize space to O(M)** by using a single row for `dp`, as we only need values from the previous row at any step.

## Example Walkthrough
**Input:**
```
2
2 3
5 9 6
11 5 2
1 1
5
```

**Processing:**
For the first case:
```
Grid:
5   9   6
11  5   2

Path: (0,0) -> (0,1) -> (1,1) -> (1,2)
Sum: 5 + 9 + 5 + 2 = 21
```

For the second case:
```
Grid:
5

Path: (0,0)
Sum: 5
```

**Output:**
```
21
5
```

## Alternative Approaches
- **Dijkstra’s Algorithm (Priority Queue):** Works better for larger constraints but is unnecessary for `O(N * M)` constraints.
- **Recursive + Memoization:** Can be used but is less efficient compared to iterative DP.

# Minimum Path Sum in a Triangle

### Approach
The problem requires us to find the minimum path sum from the top of the triangle to the bottom while moving only to adjacent elements in the row below.

### Dynamic Programming Approach (Bottom-Up)
1. **Define DP State:** Let `dp[i][j]` represent the minimum sum to reach `triangle[i][j]` from the top.
2. **Base Case:** The last row of the triangle remains unchanged as it serves as the starting point for our DP solution.
3. **Transition:**
   - We process the triangle from the second-last row to the first row.
   - For each `triangle[i][j]`, the minimum sum path is determined as follows:
     ```
     dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])
     ```
   - This means the value at `triangle[i][j]` is updated to include the minimum sum from its adjacent numbers in the row below.
4. **Final Answer:** The result is stored in `triangle[0][0]` after processing all rows.

## Java Implementation
```java
import java.util.*;

public class MinimumTrianglePath {
    public static int minPathSum(List<List<Integer>> triangle) {
        int n = triangle.size();
        
        // Start from the second last row and move upwards
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j < triangle.get(i).size(); j++) {
                int minSum = Math.min(triangle.get(i + 1).get(j), triangle.get(i + 1).get(j + 1));
                triangle.get(i).set(j, triangle.get(i).get(j) + minSum);
            }
        }
        
        return triangle.get(0).get(0); // The top element contains the minimum path sum
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases
        
        while (T-- > 0) {
            int N = sc.nextInt();
            List<List<Integer>> triangle = new ArrayList<>();
            
            for (int i = 0; i < N; i++) {
                List<Integer> row = new ArrayList<>();
                for (int j = 0; j <= i; j++) {
                    row.add(sc.nextInt());
                }
                triangle.add(row);
            }
            
            System.out.println(minPathSum(triangle));
        }
        sc.close();
    }
}
```

## Complexity Analysis
- **Time Complexity:** `O(N^2)`, as we process each element in the triangle once.
- **Space Complexity:** `O(1)`, since we modify the input `triangle` in place, avoiding extra memory usage.

## Example Walkthrough
**Input:**
```
2
4
2
3 4
6 5 7
4 1 8 3
1
-10
```

**Processing:**
For the first case:
```
Triangle:
2
3 4
6 5 7
4 1 8 3

After DP processing:
2
3 4
9 6 10
4 1 8 3

Final minimum path: 2 -> 3 -> 5 -> 1 = 11
```
For the second case:
```
Triangle:
-10

Minimum path sum: -10
```

**Output:**
```
11
-10
```

## Alternative Approaches
- **Recursive + Memoization:** Stores results in a `dp` array to avoid redundant calculations but still has an `O(N^2)` complexity.
- **Iterative DP with a 1D array:** Instead of modifying the input triangle, we can use a `1D dp[]` array of size `N` to store intermediate results, reducing space complexity to `O(N)`.

This approach ensures an optimal solution with minimal time and space complexity.

# Maximum Path Sum in a Matrix

## Problem Statement
You have been given an N*M matrix filled with integer numbers. Find the maximum sum that can be obtained from a path starting from any cell in the first row to any cell in the last row.

From a cell in a row, you can move to another cell directly below that row, or diagonally below left or right. So from a particular cell `(row, col)`, we can move in three directions:
- **Down**: `(row+1, col)`
- **Down-left diagonal**: `(row+1, col-1)`
- **Down-right diagonal**: `(row+1, col+1)`

### Constraints:
- `1 <= T <= 50`
- `1 <= N <= 100`
- `1 <= M <= 100`
- `-10^4 <= matrix[i][j] <= 10^4`

Where `T` is the number of test cases, `N` is the number of rows, and `M` is the number of columns.

## Approach
### Dynamic Programming Approach (Bottom-Up)
1. **Define DP State:**
   - Let `dp[i][j]` represent the maximum sum path that ends at position `(i, j)`.
   - The first row remains the same as the given matrix since the path starts from there.
2. **Transition:**
   - For each element in row `i`, compute the maximum sum by considering the three possible moves:
     ```
     dp[i][j] = matrix[i][j] + max(dp[i-1][j], dp[i-1][j-1] (if valid), dp[i-1][j+1] (if valid))
     ```
   - Ensure boundary conditions for the first and last column to prevent out-of-bounds errors.
3. **Final Answer:**
   - The result is the maximum value in the last row of `dp`.

## Java Implementation
### 2D DP Approach
```java
import java.util.*;

public class MaximumPathSumMatrix {
    public static int maxPathSum(int[][] matrix, int N, int M) {
        int[][] dp = new int[N][M];
        
        // Initialize first row as it is
        for (int j = 0; j < M; j++) {
            dp[0][j] = matrix[0][j];
        }
        
        // Fill the dp table from row 1 to N-1
        for (int i = 1; i < N; i++) {
            for (int j = 0; j < M; j++) {
                int down = dp[i - 1][j];
                int downLeft = (j > 0) ? dp[i - 1][j - 1] : Integer.MIN_VALUE;
                int downRight = (j < M - 1) ? dp[i - 1][j + 1] : Integer.MIN_VALUE;
                
                dp[i][j] = matrix[i][j] + Math.max(down, Math.max(downLeft, downRight));
            }
        }
        
        // Find the max value in the last row
        int maxSum = Integer.MIN_VALUE;
        for (int j = 0; j < M; j++) {
            maxSum = Math.max(maxSum, dp[N - 1][j]);
        }
        
        return maxSum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt(); // Number of test cases
        
        while (T-- > 0) {
            int N = sc.nextInt();
            int M = sc.nextInt();
            int[][] matrix = new int[N][M];
            
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    matrix[i][j] = sc.nextInt();
                }
            }
            
            System.out.println(maxPathSum(matrix, N, M));
        }
        sc.close();
    }
}
```

### Optimized 1D DP Approach
Instead of maintaining a 2D `dp` table, we can use a `1D dp[]` array that keeps track of the previous row only.
```java
public static int maxPathSumOptimized(int[][] matrix, int N, int M) {
    int[] dp = Arrays.copyOf(matrix[0], M); // Copy first row
    
    for (int i = 1; i < N; i++) {
        int[] newDp = new int[M];
        for (int j = 0; j < M; j++) {
            int down = dp[j];
            int downLeft = (j > 0) ? dp[j - 1] : Integer.MIN_VALUE;
            int downRight = (j < M - 1) ? dp[j + 1] : Integer.MIN_VALUE;
            
            newDp[j] = matrix[i][j] + Math.max(down, Math.max(downLeft, downRight));
        }
        dp = newDp;
    }
    
    return Arrays.stream(dp).max().getAsInt();
}
```

## Example Walkthrough
**Input:**
```
2
4 4
1 2 10 4
100 3 2 1
1 1 20 2
1 2 2 1
3 3
10 2 3
3 7 2
8 1 5
```

**Processing:**
For the first case:
```
Matrix:
1  2  10  4
100 3  2  1
1  1  20  2
1  2  2  1

After DP processing:
1  2  10  4
102  12  12  6
103  13  32  8
104  15  34  9

Maximum Path Sum: 105
```
For the second case:
```
Matrix:
10  2  3
3   7  2
8   1  5

After DP processing:
10  2  3
13  17  5
21  18  10

Maximum Path Sum: 25
```

**Output:**
```
105
25
```

## Complexity Analysis
- **Time Complexity:** `O(N * M)`, since we traverse the matrix once.
- **Space Complexity:** `O(N * M)`, due to the `dp` matrix storage.
- **Optimized Space Complexity:** `O(M)`, if we use a 1D array instead of a 2D `dp` table, updating the values in place.

## Alternative Approaches
- **Recursive + Memoization:** Store results in a `dp` array to avoid redundant calculations, but still has an `O(N*M)` complexity.
- **Iterative DP with a 1D array:** Instead of modifying the input matrix, we can use a `1D dp[]` array to store intermediate results, reducing space complexity to `O(M)`.

This approach ensures an optimal solution with minimal time and space complexity.

# DP on Subsequence

# Subset Sum Problem

## Problem Statement
You are given an array/list `ARR` of `N` positive integers and an integer `K`. Your task is to check if there exists a subset in `ARR` with a sum equal to `K`.

``` Problem Ref
https://www.naukri.com/code360/problems/subset-sum-equal-to-k_1550954?leftPanelTab=1%3Fsource%3Dyoutube&campaign=striver_dp_videos&utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_dp_videos
```

**Note:** Return `true` if there exists a subset with sum equal to `K`. Otherwise, return `false`.

### Example
#### Input
```
ARR = {1,2,3,4}, K = 4
```
#### Output
```
true
```
#### Explanation
There exist two subsets with sum = 4: `{1,3}` and `{4}`. Hence, return `true`.

## Approach
### **1. 2D Dynamic Programming Approach**
#### **Steps:**
1. Define a DP table `dp[N+1][K+1]`, where `dp[i][j]` represents whether it is possible to achieve sum `j` using the first `i` elements.
2. Initialize `dp[i][0] = true` (subset sum `0` is always possible).
3. If `ARR[i-1] > j`, we cannot include it, so `dp[i][j] = dp[i-1][j]`.
4. If `ARR[i-1] <= j`, we have two choices:
   - Exclude the element: `dp[i][j] = dp[i-1][j]`
   - Include the element: `dp[i][j] = dp[i-1][j - ARR[i-1]]`
5. Return `dp[N][K]` as the final answer.

#### **Java Code for 2D DP Approach:**
```java
public class SubsetSum {
    public static boolean subsetSum2D(int[] arr, int k) {
        int n = arr.length;
        boolean[][] dp = new boolean[n + 1][k + 1];
        
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true; // Sum 0 is always possible
        }
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= k; j++) {
                if (arr[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
                }
            }
        }
        
        return dp[n][k];
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 3, 2, 1};
        int k = 5;
        System.out.println(subsetSum2D(arr, k)); // Output: true
    }
}
```

### **2. Optimized 1D Dynamic Programming Approach**
#### **Steps:**
1. Use a **1D DP array** `dp[K+1]`, where `dp[j]` stores whether sum `j` is possible.
2. Initialize `dp[0] = true` (sum `0` is always possible).
3. Traverse the array and update `dp` in **reverse order** (to prevent overwriting previous states).
4. If `dp[K]` is `true`, return `true`; otherwise, return `false`.

#### **Java Code for Optimized 1D DP Approach:**
```java
public class SubsetSumOptimized {
    public static boolean subsetSum1D(int[] arr, int k) {
        boolean[] dp = new boolean[k + 1];
        dp[0] = true; // Sum 0 is always possible
        
        for (int num : arr) {
            for (int j = k; j >= num; j--) { // Reverse loop
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[k];
    }
    
    public static void main(String[] args) {
        int[] arr = {4, 3, 2, 1};
        int k = 5;
        System.out.println(subsetSum1D(arr, k)); // Output: true
    }
}
```

## **Example Dry Run**
### **Input:**
```plaintext
ARR = {4,3,2,1}, K = 5
```

### **Step-by-Step Execution (1D DP)**
**Initialization:**
```plaintext
dp = {true, false, false, false, false, false}
```

**Processing 4:**
```plaintext
dp[5] = dp[5] || dp[1] -> false
dp[4] = dp[4] || dp[0] -> true
dp = {true, false, false, false, true, false}
```

**Processing 3:**
```plaintext
dp[5] = dp[5] || dp[2] -> false
dp[4] = dp[4] || dp[1] -> true
dp[3] = dp[3] || dp[0] -> true
dp = {true, false, false, true, true, false}
```

**Processing 2:**
```plaintext
dp[5] = dp[5] || dp[3] -> true
dp[4] = dp[4] || dp[2] -> true
dp[2] = dp[2] || dp[0] -> true
dp = {true, false, true, true, true, true}
```

**Processing 1:**
```plaintext
dp[5] = dp[5] || dp[4] -> true (Already true)
dp[4] = dp[4] || dp[3] -> true (Already true)
dp[3] = dp[3] || dp[2] -> true (Already true)
dp[2] = dp[2] || dp[1] -> true (Already true)
dp[1] = dp[1] || dp[0] -> true
dp = {true, true, true, true, true, true}
```

Since `dp[5] = true`, we return `true`.

## **Complexity Analysis**
| Approach | Time Complexity | Space Complexity |
|----------|----------------|------------------|
| 2D DP    | O(N * K)       | O(N * K)         |
| 1D DP    | O(N * K)       | O(K)             |

### **Final Takeaways**
- **2D DP** is straightforward but requires `O(N * K)` space.
- **1D DP with reverse iteration** optimizes space to `O(K)`, making it more efficient.
- **Both methods achieve O(N * K) time complexity**, which is efficient for given constraints.

# Partition A Set Into Two Subsets With Minimum Absolute Sum Difference

## Problem Statement
You are given an array `arr` containing `n` non-negative integers.

Your task is to partition this array into two subsets such that the absolute difference between subset sums is minimized.

### Notes:
1. Each array element should belong to exactly one of the subsets.
2. Subsets need not be contiguous.
3. The subset-sum is the sum of all the elements in that subset.

### Example:
#### Input:
```
n = 5
arr = [3, 1, 5, 2, 8]
```
#### Output:
```
1
```
#### Explanation:
The array can be partitioned into `{3, 1, 5}` and `{2, 8}`.
The absolute difference between their sums is `|10 - 9| = 1`.

---

## Approach
This problem can be solved using **Dynamic Programming** (Subset Sum Approach).

### **1. Understanding the problem:**
- The total sum of the array is `sum(arr) = S`.
- The goal is to find two subsets whose sum difference is minimized.
- If one subset has sum `S1`, the other will have `S2 = S - S1`.
- Our goal is to minimize `|S1 - S2| = |S - 2 * S1|`.


### **2. Using Dynamic Programming (2D Approach)**
- We use a **boolean DP table** where `dp[i][j]` represents whether we can achieve sum `j` using the first `i` elements.
- We iterate from `0` to `S/2` (since the other subset is `S - S1`).
- The minimum absolute difference is obtained by minimizing `|S - 2*S1|`.

### **3. Optimized 1D DP Approach**
- Instead of using a 2D DP array, we can optimize it using a **1D DP array**.
- We update the DP array in **reverse order** to avoid overwriting results.

---

## Java Code

### **1. 2D DP Approach:**
```java
public class PartitionMinSubsetDiff {
    public static int minSubsetDifference(int[] arr) {
        int n = arr.length;
        int totalSum = 0;
        for (int num : arr) {
            totalSum += num;
        }
        
        boolean[][] dp = new boolean[n + 1][totalSum / 2 + 1];
        
        // Initializing first column as true (sum = 0 is always possible)
        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }
        
        // Fill the DP table
        for (int i = 1; i <= n; i++) {
            for (int sum = 1; sum <= totalSum / 2; sum++) {
                boolean exclude = dp[i - 1][sum];
                boolean include = (arr[i - 1] <= sum) ? dp[i - 1][sum - arr[i - 1]] : false;
                dp[i][sum] = exclude || include;
            }
        }
        
        // Find the largest S1 such that dp[n][S1] is true
        int minDiff = Integer.MAX_VALUE;
        for (int s1 = totalSum / 2; s1 >= 0; s1--) {
            if (dp[n][s1]) {
                minDiff = Math.min(minDiff, Math.abs(totalSum - 2 * s1));
                break;
            }
        }
        return minDiff;
    }
    
    public static void main(String[] args) {
        int[] arr = {3, 1, 5, 2, 8};
        System.out.println(minSubsetDifference(arr));  // Output: 1
    }
}
```

### **2. Optimized 1D DP Approach:**
```java
public class PartitionMinSubsetDiffOptimized {
    public static int minSubsetDifference(int[] arr) {
        int n = arr.length;
        int totalSum = 0;
        for (int num : arr) {
            totalSum += num;
        }
        
        boolean[] dp = new boolean[totalSum / 2 + 1];
        dp[0] = true; // Sum 0 is always possible
        
        // Process elements
        for (int num : arr) {
            for (int sum = totalSum / 2; sum >= num; sum--) {
                dp[sum] |= dp[sum - num];
            }
        }
        
        // Find the largest S1 where dp[S1] is true
        int minDiff = Integer.MAX_VALUE;
        for (int s1 = totalSum / 2; s1 >= 0; s1--) {
            if (dp[s1]) {
                minDiff = Math.min(minDiff, Math.abs(totalSum - 2 * s1));
                break;
            }
        }
        return minDiff;
    }
    
    public static void main(String[] args) {
        int[] arr = {3, 1, 5, 2, 8};
        System.out.println(minSubsetDifference(arr));  // Output: 1
    }
}
```

---

## Dry Run Example
### Input:
```
n = 4, arr = [1, 2, 3, 4]
```
### Step-by-Step Execution:
1. **Total Sum Calculation:**
   ```
   totalSum = 1 + 2 + 3 + 4 = 10
   ```
2. **DP Table Construction:**
   - Compute possible subset sums up to `totalSum / 2 = 5`.
   - `dp[i][j]` tells if we can form sum `j` using first `i` elements.
3. **Finding Minimum Difference:**
   - The largest `S1` where `dp[n][S1]` is true is `5`.
   - Compute `minDiff = |10 - 2*5| = 0`.

### Output:
```
0
```

---

## Complexity Analysis
| Approach | Time Complexity | Space Complexity |
|----------|----------------|------------------|
| **2D DP** | O(n * sum) | O(n * sum) |
| **1D Optimized DP** | O(n * sum) | O(sum) |

---

## Summary
1. **2D DP Approach:** Constructs a DP table of size `n x sum/2`.
2. **1D Optimized DP Approach:** Reduces space complexity by updating in reverse order.
3. **Key Optimization:** Iterate in reverse when updating the DP array to avoid overwriting.
4. **Result:** The minimum absolute subset sum difference is found using `|totalSum - 2*S1|`.

# Counts Subsets with Sum K

## Problem Statement
You are given an array 'arr' of size 'n' containing positive integers and a target sum 'k'.

Find the number of ways of selecting the elements from the array such that the sum of chosen elements is equal to the target 'k'.

Since the number of ways can be very large, print it modulo $10^9 + 7$.

### Example
#### Input:
```
arr = [1, 1, 4, 5]
```
#### Output:
```
3
```
#### Explanation:
The possible ways are:
- [1, 4]
- [1, 4]
- [5]

Hence, the output is 3. Please note that both 1s present in 'arr' are treated differently.

### Constraints:
- $1 \leq n \leq 100$
- $0 \leq arr[i] \leq 1000$
- $1 \leq k \leq 1000$
- Expected Time Complexity: $O(n \times k)$
- Space Complexity: $O(k)$ (for optimized solution)

---

## Approach

The problem can be solved using **Dynamic Programming** (DP). The idea is to use a 2D DP table where:
- `dp[i][sum]` represents the number of ways to achieve `sum` using the first `i` elements of `arr`.

### **2D DP Approach**
We initialize a `dp` table where `dp[i][j]` stores the number of ways to get sum `j` using the first `i` elements of the array.

### **State Transition**
For each element `arr[i-1]`, we have two choices:
1. **Exclude it**: The number of ways remains the same as `dp[i-1][sum]`.
2. **Include it**: The number of ways to form `sum` includes `dp[i-1][sum - arr[i-1]]`.

Thus, the recurrence relation is:
```
dp[i][sum] = dp[i-1][sum] + dp[i-1][sum - arr[i-1]]
```

### **Optimized 1D DP Approach**
Since each `dp[i]` depends only on `dp[i-1]`, we can reduce space complexity by using a **1D DP array** instead of a 2D table.
- Instead of `dp[i][sum]`, we use `dp[sum]` where `dp[sum]` represents the number of ways to achieve `sum` using elements so far.
- To avoid overwriting values, we iterate **from end to start** in the inner loop.

### **Final Formula**
```
dp[sum] = dp[sum] + dp[sum - arr[i]]
```

---

## **Java Code**

### **2D DP Approach**
```java
import java.util.*;

public class SubsetSumCount {
    static final int MOD = 1000000007;
    
    public static int countSubsets(int[] arr, int n, int k) {
        int[][] dp = new int[n + 1][k + 1];
        
        // Base case: There's one way to make sum 0 (by choosing nothing)
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }
        
        // Fill the dp table
        for (int i = 1; i <= n; i++) {
            for (int sum = 0; sum <= k; sum++) {
                dp[i][sum] = dp[i-1][sum];
                if (sum >= arr[i-1]) {
                    dp[i][sum] = (dp[i][sum] + dp[i-1][sum - arr[i-1]]) % MOD;
                }
            }
        }
        
        return dp[n][k];
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 1, 4, 5};
        int k = 5;
        System.out.println(countSubsets(arr, arr.length, k));
    }
}
```

### **Optimized 1D DP Approach**
```java
import java.util.*;

public class SubsetSumCountOptimized {
    static final int MOD = 1000000007;
    
    public static int countSubsets(int[] arr, int n, int k) {
        int[] dp = new int[k + 1];
        dp[0] = 1; // There's one way to make sum 0
        
        for (int i = 0; i < n; i++) {
            for (int sum = k; sum >= arr[i]; sum--) {
                dp[sum] = (dp[sum] + dp[sum - arr[i]]) % MOD;
            }
        }
        
        return dp[k];
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 1, 4, 5};
        int k = 5;
        System.out.println(countSubsets(arr, arr.length, k));
    }
}
```

---

## **Example Walkthrough**

### **Input:**
```
n = 4, arr = [1, 1, 4, 5], k = 5
```
### **Step-by-Step Execution (1D DP Approach)**

#### **Initialization:**
```
dp = [1, 0, 0, 0, 0, 0] // dp[0] = 1 (sum 0 can be achieved by choosing nothing)
```
#### **Iteration:**
1. Consider element `1`:
   ```
   dp[1] += dp[0] → dp = [1, 1, 0, 0, 0, 0]
   ```
2. Consider second `1`:
   ```
   dp[2] += dp[1] → dp = [1, 2, 1, 0, 0, 0]
   ```
3. Consider `4`:
   ```
   dp[5] += dp[1] → dp = [1, 2, 1, 0, 1, 2]
   ```
4. Consider `5`:
   ```
   dp[5] += dp[0] → dp = [1, 2, 1, 0, 1, 3]
   ```

### **Final Output:**
```
3
```

---

## **Key Takeaways**
1. **2D DP uses `dp[i][sum]`, while 1D DP optimizes space to `dp[sum]`**.
2. **Iterate backwards in 1D DP to prevent overwriting results**.
3. **Modulo operation (`MOD = 10^9+7`) prevents integer overflow**.
4. **DP is useful for counting problems where direct recursion leads to exponential time complexity**.

This problem is a variation of the **Subset Sum Problem** and can be extended to solve similar problems like **Partition Equal Subset Sum, Minimum Subset Sum Difference, and Knapsack variations**.

## 0/1 Knapsack Problem (Bounded)

### Problem Statement
You are given `N` items, each with a weight `w[i]` and a value `v[i]`. You are also given a knapsack with a maximum capacity `W`. Your task is to determine the maximum value that can be achieved by selecting a subset of the items such that the total weight does not exceed `W`.

**Input:**
- `N` (integer): Number of items.
- `W` (integer): Maximum capacity of the knapsack.
- `w[]` (array of integers): Weights of the items.
- `v[]` (array of integers): Values of the items.

**Output:**
- Maximum value that can be obtained.

### Example
**Input:**
```
N = 3
W = 50
w[] = {10, 20, 30}
v[] = {60, 100, 120}
```
**Output:**
```
220
```

### Solution
#### 1. 2D Dynamic Programming Approach
```java
public class Knapsack2D {
    public static int knapsack2D(int W, int[] w, int[] v, int N) {
        int[][] dp = new int[N + 1][W + 1];

        for (int i = 1; i <= N; i++) {
            for (int j = 0; j <= W; j++) {
                if (w[i - 1] <= j) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - w[i - 1]] + v[i - 1]);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[N][W];
    }

    public static void main(String[] args) {
        int[] w = {10, 20, 30};
        int[] v = {60, 100, 120};
        int W = 50;
        System.out.println("Maximum value: " + knapsack2D(W, w, v, w.length));
    }
}
```

#### 2. Optimized 1D Dynamic Programming Approach
```java
public class Knapsack1D {
    public static int knapsack1D(int W, int[] w, int[] v, int N) {
        int[] dp = new int[W + 1];

        for (int i = 0; i < N; i++) {
            for (int j = W; j >= w[i]; j--) {
                dp[j] = Math.max(dp[j], dp[j - w[i]] + v[i]);
            }
        }
        return dp[W];
    }

    public static void main(String[] args) {
        int[] w = {10, 20, 30};
        int[] v = {60, 100, 120};
        int W = 50;
        System.out.println("Maximum value: " + knapsack1D(W, w, v, w.length));
    }
}
```

### Explanation
- **2D DP Approach:**
  - Uses a matrix where `dp[i][j]` represents the maximum value achievable using the first `i` items and capacity `j`.
- **1D DP Approach (Optimized):**
  - Reduces space complexity by maintaining only a 1D array.
  - Iterates backward through the `dp` array to prevent overwriting values that are yet to be processed.

### Complexity Analysis
- **2D DP Approach:**
  - Time Complexity: `O(N * W)`
  - Space Complexity: `O(N * W)`
- **1D DP Approach (Optimized):**
  - Time Complexity: `O(N * W)`
  - Space Complexity: `O(W)`

Both solutions efficiently compute the optimal solution, with the 1D approach being more space-efficient.

## Minimum Coins Problem (DP on Subsequences)

### Problem Statement
Given an array of coin denominations `coins[]` and a target amount `target`, determine the **minimum number of coins** required to achieve the exact target amount. If it's impossible to form the target amount using the given coins, return `-1`.

**Input:**
- `coins[]` (array of integers): Available coin denominations.
- `target` (integer): The target amount to be achieved.

**Output:**
- Minimum number of coins required to form the `target` amount, or `-1` if impossible.

### Example
**Input:**
```
coins = {1, 2, 5}
target = 11
```
**Output:**
```
3  (Explanation: 5 + 5 + 1)
```

**Input:**
```
coins = {2}
target = 3
```
**Output:**
```
-1 (Explanation: Impossible to form 3 with only coin 2)
```

---

### Solution
#### 1. 2D Dynamic Programming Approach
```java
import java.util.*;

public class MinCoins2D {
    public static int minCoins2D(int[] coins, int target) {
        int n = coins.length;
        int[][] dp = new int[n + 1][target + 1];

        for (int i = 0; i <= target; i++) {
            dp[0][i] = Integer.MAX_VALUE - 1; // Impossible states
        }
        dp[0][0] = 0; // 0 coins needed for target 0

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (coins[i - 1] <= t) {
                    dp[i][t] = Math.min(dp[i - 1][t], 1 + dp[i][t - coins[i - 1]]);
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }
        return dp[n][target] == Integer.MAX_VALUE - 1 ? -1 : dp[n][target];
    }

    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        int target = 11;
        System.out.println("Minimum coins required: " + minCoins2D(coins, target));
    }
}
```

---

#### 2. Optimized 1D Dynamic Programming Approach
```java
import java.util.*;

public class MinCoins1D {
    public static int minCoins1D(int[] coins, int target) {
        int[] dp = new int[target + 1];
        Arrays.fill(dp, Integer.MAX_VALUE - 1); // Impossible states
        dp[0] = 0; // 0 coins needed for target 0

        for (int coin : coins) {
            for (int t = coin; t <= target; t++) {
                dp[t] = Math.min(dp[t], 1 + dp[t - coin]);
            }
        }
        return dp[target] == Integer.MAX_VALUE - 1 ? -1 : dp[target];
    }

    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        int target = 11;
        System.out.println("Minimum coins required: " + minCoins1D(coins, target));
    }
}
```

---

### Explanation
- **2D DP Approach:**
  - Uses a matrix `dp[i][t]` where `i` is the number of coins considered and `t` is the target amount.
  - The value at `dp[i][t]` represents the minimum coins required to achieve the target amount using the first `i` coins.
- **1D DP Approach (Optimized):**
  - Uses a 1D array `dp[]` where `dp[t]` stores the minimum coins required to achieve target `t`.
  - Iterates directly over each coin and updates the target values in a single pass.

---

### Complexity Analysis
- **2D DP Approach:**
  - Time Complexity: `O(N * target)`
  - Space Complexity: `O(N * target)`
- **1D DP Approach (Optimized):**
  - Time Complexity: `O(N * target)`
  - Space Complexity: `O(target)`

Both approaches provide efficient and clear solutions to the Minimum Coins problem. The 1D approach is more space-efficient while maintaining optimal performance.

## Target Sum Problem (DP on Subsequences)

### Problem Statement
You are given an array `ARR` of `N` integers and a target number `TARGET`. Your task is to build an expression by adding either `+` or `-` before each integer such that the resulting expression equals the given `TARGET`. You must return the **number of ways** this target can be achieved.

### Example
**Input:**
```
2
5 3
1 1 1 1 1
4 3
1 2 3 1
```
**Output:**
```
5
2
```

### Constraints
- `1 <= T <= 10`
- `1 <= N <= 25`
- `-1000 <= TARGET <= 1000`
- `0 <= ARR[i] <= 1000`

---

### Approach
This problem is equivalent to partitioning the array into two subsets such that:
```
Subset1 - Subset2 = TARGET
```
From this equation, we can derive:
```
Subset1 = (SUM + TARGET) / 2
```
Where `SUM` is the total sum of the array.

The problem then reduces to finding the number of ways to form `Subset1` with the array elements.

---

### 1. 2D Dynamic Programming Approach
```java
public class TargetSum2D {
    public static int findTargetSumWays(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;

        if ((totalSum + target) % 2 != 0 || totalSum < Math.abs(target)) return 0;
        int sum = (totalSum + target) / 2;

        int n = nums.length;
        int[][] dp = new int[n + 1][sum + 1];

        dp[0][0] = 1; // Base case: One way to get zero sum with zero elements

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= sum; j++) {
                dp[i][j] = dp[i - 1][j]; // Exclude current element
                if (nums[i - 1] <= j) {
                    dp[i][j] += dp[i - 1][j - nums[i - 1]]; // Include current element
                }
            }
        }
        return dp[n][sum];
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 1, 1, 1, 1};
        int target1 = 3;
        System.out.println("Ways to reach target: " + findTargetSumWays(arr1, target1));

        int[] arr2 = {1, 2, 3, 1};
        int target2 = 3;
        System.out.println("Ways to reach target: " + findTargetSumWays(arr2, target2));
    }
}
```

---

### 2. Optimized 1D Dynamic Programming Approach
```java
public class TargetSum1D {
    public static int findTargetSumWays(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;

        if ((totalSum + target) % 2 != 0 || totalSum < Math.abs(target)) return 0;
        int sum = (totalSum + target) / 2;

        int[] dp = new int[sum + 1];
        dp[0] = 1; // Base case: One way to get zero sum with zero elements

        for (int num : nums) {
            for (int j = sum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[sum];
    }

    public static void main(String[] args) {
        int[] arr1 = {1, 1, 1, 1, 1};
        int target1 = 3;
        System.out.println("Ways to reach target: " + findTargetSumWays(arr1, target1));

        int[] arr2 = {1, 2, 3, 1};
        int target2 = 3;
        System.out.println("Ways to reach target: " + findTargetSumWays(arr2, target2));
    }
}
```

---

### Explanation
- **2D DP Approach:**
  - Uses a matrix `dp[i][j]` where `i` is the number of elements considered and `j` is the target sum to achieve.
  - The value at `dp[i][j]` represents the number of ways to achieve target `j` with the first `i` elements.
- **1D DP Approach (Optimized):**
  - Uses a 1D array `dp[]` where `dp[j]` stores the number of ways to achieve target `j`.
  - Iterates backward to ensure values are updated correctly without overwriting.

---

### Complexity Analysis
- **2D DP Approach:**
  - Time Complexity: `O(N * sum)`
  - Space Complexity: `O(N * sum)`
- **1D DP Approach (Optimized):**
  - Time Complexity: `O(N * sum)`
  - Space Complexity: `O(sum)`

Both approaches efficiently compute the total number of valid combinations to achieve the target sum. The 1D DP solution is preferred for better space optimization.


## Rod Cutting Problem (DP on Subsequences)

```Ref
https://www.naukri.com/code360/problems/rod-cutting-problem_800284?source=youtube&campaign=striver_dp_videos&utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_dp_videos
```

### Problem Statement
Given a rod of length `N` units, you need to determine the **maximum cost** obtainable by cutting the rod into pieces of various sizes. Each size has a corresponding cost associated with it.

### Input
- `T` (integer): Number of test cases.
- For each test case:
  - `N` (integer): Length of the rod.
  - Array `A` of size `N`: Where `A[i]` denotes the cost of a rod piece of length `i+1`.

### Output
- For each test case, print the maximum achievable cost.

### Example
**Input:**
```
2
5
2 5 7 8 10
8
3 5 8 9 10 17 17 20
```
**Output:**
```
12
24
```

---

### Approach
We can use Dynamic Programming (DP) to solve this problem efficiently.

#### 1. 2D Dynamic Programming Approach
- Create a DP table `dp[][]` where `dp[i][j]` represents the **maximum cost** achievable by using the first `i` rod sizes to form a rod of length `j`.
- Recurrence Relation:
```
if (length of piece <= target)
    dp[i][target] = max(dp[i-1][target], price[i-1] + dp[i][target - length[i-1]])
else
    dp[i][target] = dp[i-1][target]
```

---

### Code - 2D DP Approach
```java
import java.util.*;

public class RodCutting2D {
    public static int maxProfit(int[] prices, int n) {
        int[][] dp = new int[n + 1][n + 1];

        for (int i = 1; i <= n; i++) {
            for (int len = 0; len <= n; len++) {
                if (i <= len) {
                    dp[i][len] = Math.max(dp[i - 1][len], prices[i - 1] + dp[i][len - i]);
                } else {
                    dp[i][len] = dp[i - 1][len];
                }
            }
        }
        return dp[n][n];
    }

    public static void main(String[] args) {
        int[] prices1 = {2, 5, 7, 8, 10};
        int[] prices2 = {3, 5, 8, 9, 10, 17, 17, 20};

        System.out.println("Maximum profit: " + maxProfit(prices1, 5)); // Output: 12
        System.out.println("Maximum profit: " + maxProfit(prices2, 8)); // Output: 24
    }
}
```

---

#### 2. Optimized 1D Dynamic Programming Approach
- Instead of using a 2D array, maintain a 1D DP array where `dp[j]` represents the **maximum achievable cost** for a rod of length `j`.
- Recurrence Relation:
```
dp[j] = max(dp[j], prices[i-1] + dp[j-i])
```

---

### Code - 1D DP Approach
```java
import java.util.*;

public class RodCutting1D {
    public static int maxProfit(int[] prices, int n) {
        int[] dp = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int len = i; len <= n; len++) {
                dp[len] = Math.max(dp[len], prices[i - 1] + dp[len - i]);
            }
        }
        return dp[n];
    }

    public static void main(String[] args) {
        int[] prices1 = {2, 5, 7, 8, 10};
        int[] prices2 = {3, 5, 8, 9, 10, 17, 17, 20};

        System.out.println("Maximum profit: " + maxProfit(prices1, 5)); // Output: 12
        System.out.println("Maximum profit: " + maxProfit(prices2, 8)); // Output: 24
    }
}
```

---

### Explanation
- **2D DP Approach:**
  - Uses a 2D table `dp[i][j]` where `i` is the number of cuts considered and `j` is the rod length.
- **1D DP Approach (Optimized):**
  - Uses a 1D array `dp[]` where each index directly represents the maximum achievable profit for that rod length.

---

### Complexity Analysis
- **2D DP Approach:**
  - Time Complexity: `O(N * N)`
  - Space Complexity: `O(N * N)`
- **1D DP Approach (Optimized):**
  - Time Complexity: `O(N * N)`
  - Space Complexity: `O(N)`

The optimized 1D DP solution is preferable for better space efficiency without compromising performance.

# DP on Strings

# Longest Common Subsequence (LCS)
```Ref
Pls watch the below video, very clearly explained...
https://www.youtube.com/watch?v=ASoaQq66foQ&t=6s&ab_channel=BackToBackSWE
```
### Problem Statement
Given two strings, 'S' and 'T' with lengths 'M' and 'N', find the length of the **Longest Common Subsequence**.

**Definition:**
A **subsequence** of a string is a sequence of characters that appears in the same relative order as in the original string, but not necessarily contiguous.

**Example:**
Subsequences of string "abc" are: ""(empty string), a, b, c, ab, bc, ac, abc.

### Constraints
- **0 <= M <= 10^3**
- **0 <= N <= 10^3**
- **Time Limit:** 1 sec

### Sample Input 1
```
adebc
dcadb
```
**Sample Output 1:**
```
3
```
**Explanation:**
Both strings share the common subsequence **'adb'**, which is the longest common subsequence with a length of **3**.

### Sample Input 2
```
ab
defg
```
**Sample Output 2:**
```
0
```
**Explanation:**
The only common subsequence is the empty string "", so the LCS length is **0**.

---

### Approach 1: Dynamic Programming (2D Table)

**Step 1:** Create a DP array `dp[][]` where:
- `dp[i][j]` stores the length of the LCS between `S[0...i-1]` and `T[0...j-1]`.

**Step 2:** Initialization
- Base case: `dp[0][*] = 0` and `dp[*][0] = 0` since an empty string has an LCS of 0.

**Step 3:** Transition
- **If characters match:** `dp[i][j] = 1 + dp[i-1][j-1]`
- **If characters don't match:** `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

**Step 4:** The final answer is stored in `dp[M][N]`.

### Code Implementation (2D DP)
```java
public class LongestCommonSubsequence {
    public static int lcs(String s, String t) {
        int m = s.length();
        int n = t.length();
        int[][] dp = new int[m + 1][n + 1];

        // Base case
        for (int i = 0; i <= m; i++) dp[i][0] = 0;
        for (int j = 0; j <= n; j++) dp[0][j] = 0;

        // DP logic
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        String s = "adebc";
        String t = "dcadb";
        System.out.println("Length of LCS: " + lcs(s, t));  // Output: 3
    }
}
```

---

### Approach 2: Optimized Space (1D DP)
Since each cell in the DP table depends only on the **previous row** and the **current row**, we can reduce the space complexity from **O(M * N)** to **O(2 * N)**.

### Code Implementation (1D DP - Space Optimized)
```java
public class LCSOptimized {
    public static int lcs(String s, String t) {
        int m = s.length();
        int n = t.length();
        int[] prev = new int[n + 1];
        int[] curr = new int[n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    curr[j] = 1 + prev[j - 1];
                } else {
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            // Move current to previous for the next iteration
            System.arraycopy(curr, 0, prev, 0, n + 1);
        }
        return prev[n];
    }

    public static void main(String[] args) {
        String s = "adebc";
        String t = "dcadb";
        System.out.println("Length of LCS: " + lcs(s, t));  // Output: 3
    }
}
```

---

### Complexity Analysis
| Approach     | Time Complexity | Space Complexity |
|---------------|-----------------|------------------|
| **2D DP**      | O(M * N)         | O(M * N)           |
| **1D DP (Optimized)** | O(M * N)         | O(N)                 |

---

## Print Longest Common Subsequence (LCS)

### Problem Statement
Given two strings, 'S' and 'T' with lengths 'M' and 'N', print the **Longest Common Subsequence** itself (not just its length).

**Definition:**
A **subsequence** of a string is a sequence of characters that appears in the same relative order as in the original string, but not necessarily contiguous.

### Constraints
- **0 <= M <= 10^3**
- **0 <= N <= 10^3**
- **Time Limit:** 1 sec

### Sample Input 1
```
adebc
dcadb
```
**Sample Output 1:**
```
adb
```
**Explanation:**
Both strings share the common subsequence **'adb'**, which is the longest common subsequence.

### Sample Input 2
```
ab
defg
```
**Sample Output 2:**
```

```
**Explanation:**
The only common subsequence is the empty string "", so the LCS is empty.

---

### Approach 1: Dynamic Programming (2D Table)

**Step 1:** Create a DP array `dp[][]` where:
- `dp[i][j]` stores the length of the LCS between `S[0...i-1]` and `T[0...j-1]`.

**Step 2:** Initialization
- Base case: `dp[0][*] = 0` and `dp[*][0] = 0` since an empty string has an LCS of 0.

**Step 3:** Transition
- **If characters match:** `dp[i][j] = 1 + dp[i-1][j-1]`
- **If characters don't match:** `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

**Step 4:** Construct the LCS string by backtracking through the `dp[][]` table.

### Code Implementation (2D DP)
```java
public class PrintLCS {
    public static String getLCS(String s, String t) {
        int m = s.length();
        int n = t.length();
        int[][] dp = new int[m + 1][n + 1];

        // Fill DP array
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtracking to build the LCS string
        StringBuilder lcs = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                lcs.append(s.charAt(i - 1));
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        return lcs.reverse().toString();
    }

    public static void main(String[] args) {
        String s = "adebc";
        String t = "dcadb";
        System.out.println("LCS: " + getLCS(s, t));  // Output: adb
    }
}
```

---

### Approach 2: Optimized Space (1D DP)
Since constructing the LCS itself requires backtracking, there’s no significant space optimization beyond the **2D DP** version when printing the result.

However, space can still be optimized if only the **length of LCS** is needed.

---

### Complexity Analysis
| Approach     | Time Complexity | Space Complexity |
|---------------|-----------------|------------------|
| **2D DP**      | O(M * N)         | O(M * N)           |
| **1D DP (Length Only)** | O(M * N)         | O(N)                 |

---

# 📘 Longest Common Substring | Dynamic Programming

## 📝 Problem Statement
Given two strings `S1` and `S2` of lengths `M` and `N`, find the **length of the longest common substring**.

### 🔍 What is a Substring?
A substring is a **contiguous sequence of characters** within a string.

### Example
**Input:**
```
S1 = "abcde"
S2 = "abfce"
```
**Output:** `2`

**Explanation:** The longest common substring is `"ab"`, which has a length of 2.

---

## ✅ Approach 1: Dynamic Programming (2D Array)

### 🔹 Steps to Solve
1. Create a 2D DP table of size `(M+1) x (N+1)` where `dp[i][j]` represents the length of the longest common substring ending at `S1[i-1]` and `S2[j-1]`.
2. Initialize `dp[i][0]` and `dp[0][j]` to `0` since an empty string has no common substring.
3. Iterate through both strings:
   - If `S1[i-1] == S2[j-1]`, set `dp[i][j] = dp[i-1][j-1] + 1`.
   - Else, set `dp[i][j] = 0`.
4. Track the maximum value in the DP table — this will be the length of the longest common substring.

### 🔹 Code Implementation (2D DP)
```java
public class LongestCommonSubstring {
    public static int longestCommonSubstring(String S1, String S2) {
        int m = S1.length(), n = S2.length();
        int[][] dp = new int[m + 1][n + 1];
        int maxLength = 0;

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (S1.charAt(i - 1) == S2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    maxLength = Math.max(maxLength, dp[i][j]);
                } else {
                    dp[i][j] = 0;
                }
            }
        }

        return maxLength;
    }

    public static void main(String[] args) {
        String S1 = "abcde";
        String S2 = "abfce";
        System.out.println("Longest Common Substring Length: " + longestCommonSubstring(S1, S2));
    }
}
```

### 🔹 Example Walkthrough
**Input:**
```
S1 = "abcde"
S2 = "abfce"
```
**DP Table:**
```
  0 a b c d e
0 0 0 0 0 0 0
a 0 1 0 0 0 0
b 0 0 2 0 0 0
f 0 0 0 0 0 0
c 0 0 0 1 0 0
e 0 0 0 0 0 1
```
**Output:** `2`

---

## ✅ Approach 2: Optimized Space (1D DP Array)

### 🔹 Steps to Optimize
1. Instead of a 2D DP table, maintain **only one previous row** for computation.
2. Use a 1D array `dp[]` where `dp[j]` keeps track of the maximum substring length for the current row.
3. Iterate similarly and keep updating `dp[j]` while maintaining the maximum length.

### 🔹 Code Implementation (Optimized DP)
```java
public class LongestCommonSubstringOptimized {
    public static int longestCommonSubstring(String S1, String S2) {
        int m = S1.length(), n = S2.length();
        int[] dp = new int[n + 1];
        int maxLength = 0;

        for (int i = 1; i <= m; i++) {
            int[] current = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (S1.charAt(i - 1) == S2.charAt(j - 1)) {
                    current[j] = dp[j - 1] + 1;
                    maxLength = Math.max(maxLength, current[j]);
                } else {
                    current[j] = 0;
                }
            }
            dp = current;
        }

        return maxLength;
    }

    public static void main(String[] args) {
        String S1 = "abcde";
        String S2 = "abfce";
        System.out.println("Longest Common Substring Length: " + longestCommonSubstring(S1, S2));
    }
}
```

---

## 📊 Complexity Analysis
| Approach  | Time Complexity | Space Complexity |
|------------|------------------|-------------------|
| **2D DP** | `O(M * N)`        | `O(M * N)`         |
| **1D DP** | `O(M * N)`        | `O(N)`             |

---
