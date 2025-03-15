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

