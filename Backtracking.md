# N-Queens II - Finding Number of Solutions

## Problem Statement
The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return the **number of distinct solutions** to the n-queens puzzle.

### Examples
**Example 1:**
```
Input: n = 4
Output: 2
```
**Example 2:**
```
Input: n = 1
Output: 1
```

### Constraints
- `1 <= n <= 9`

---

## Approach 1: General Backtracking Approach (Conventional Method)
### Key Idea
- Use a **2D chessboard** (`n x n`) filled with `'.'`.
- Place queens row by row.
- For each cell `(row, col)`, check if it is **safe** by validating:
  - **Same Column**
  - **Upper Left Diagonal**
  - **Upper Right Diagonal**
- If safe, place the queen and recursively proceed to the next row.
- Perform **backtracking** by removing the last queen when needed.

### Code Implementation
```java
class Solution {
    int count = 0;

    public int totalNQueens(int n) {
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        backtrack(board, 0);
        return count;
    }

    private void backtrack(char[][] board, int row) {
        int n = board.length;
        if (row == n) {
            count++;
            return;
        }

        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(board, row + 1);
                board[row][col] = '.';
            }
        }
    }

    private boolean isSafe(char[][] board, int row, int col) {
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') return false;
        }
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println("Output for n = 4: " + solution.totalNQueens(4));
        System.out.println("Output for n = 1: " + solution.totalNQueens(1));
    }
}
```

---

## Approach 2: Optimized Backtracking Approach (Using Boolean Arrays)
### Key Idea
Instead of checking each column and diagonals repeatedly:
- Use:
  - **`cols[]`** to track occupied columns.
  - **`diag1[]`** to track the **main diagonal** (calculated as `row - col + n`).
  - **`diag2[]`** to track the **anti-diagonal** (calculated as `row + col`).

### Code Implementation
```java
class Solution {
    int count = 0;

    public int totalNQueens(int n) {
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n];
        boolean[] diag2 = new boolean[2 * n];

        backtrack(0, n, cols, diag1, diag2);  
        return count;
    }

    private void backtrack(int row, int n, boolean[] cols, boolean[] diag1, boolean[] diag2) {
        if (row == n) {
            count++;  
            return;
        }

        for (int col = 0; col < n; col++) {
            int d1 = row - col + n;  // Offset to prevent negative indices
            int d2 = row + col;

            if (cols[col] || diag1[d1] || diag2[d2]) {
                continue;
            }

            cols[col] = diag1[d1] = diag2[d2] = true;
            backtrack(row + 1, n, cols, diag1, diag2);
            cols[col] = diag1[d1] = diag2[d2] = false;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println("Output for n = 4: " + solution.totalNQueens(4)); // Output: 2
        System.out.println("Output for n = 1: " + solution.totalNQueens(1)); // Output: 1
    }
}
```

---

## Dry Run Example for `n = 4`
**Step 1:**
```
. Q . .
. . . Q
Q . . .
. . Q .
```
✅ Solution Found!

**Step 2 (Alternate Solution):**
```
. . Q .
Q . . .
. . . Q
. Q . .
```
✅ Solution Found!

**Final Answer:** 2 Solutions

---

## Comparison
| Aspect | General Approach | Optimized Approach |
|:--------|:------------------|:---------------------|
| **Space Complexity** | O(n^2) (Chessboard) | O(n) (Boolean Arrays) |
| **Time Complexity** | O(n!) | O(n!) |
| **Efficiency** | Slower due to repeated checks | Faster with quick lookups |
| **Code Complexity** | Easier to understand | Slightly complex logic |

---

## Conclusion
✅ Use the **General Backtracking Approach** for learning and building foundational understanding.  
✅ Use the **Optimized Approach** for solving the problem efficiently in contests and interviews.  

# Letter Combinations of a Phone Number

## Problem Statement
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

### Example 1:
**Input:** `digits = "23"`

**Output:** `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

### Example 2:
**Input:** `digits = ""`

**Output:** `[]`

### Example 3:
**Input:** `digits = "2"`

**Output:** `["a","b","c"]`

### Constraints:
- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`

---

## Approach
1. **Mapping Creation:** Create a mapping of each digit to its corresponding letters (like the phone keypad mapping).
2. **Backtracking:** Use backtracking to generate all possible combinations by recursively adding characters from each digit's corresponding letter set.
3. **Base Condition:** If the input `digits` is empty, return an empty list.
4. **Recursive Logic:** For each digit:
   - Pick each possible character for that digit.
   - Append the character to the current combination.
   - Move to the next digit.
5. **Store Results:** After reaching the end of the digit string, add the current combination to the result list.

---

## Code Implementation
```java
import java.util.*;

class Solution {
    public List<String> letterCombinations(String digits) {
        if (digits == null || digits.length() == 0) return new ArrayList<>();

        Map<Character, String> phoneMap = new HashMap<>();
        phoneMap.put('2', "abc");
        phoneMap.put('3', "def");
        phoneMap.put('4', "ghi");
        phoneMap.put('5', "jkl");
        phoneMap.put('6', "mno");
        phoneMap.put('7', "pqrs");
        phoneMap.put('8', "tuv");
        phoneMap.put('9', "wxyz");

        List<String> result = new ArrayList<>();
        backtrack(result, digits, phoneMap, 0, new StringBuilder());
        return result;
    }

    private void backtrack(List<String> result, String digits, Map<Character, String> phoneMap, int index, StringBuilder current) {
        if (index == digits.length()) {
            result.add(current.toString());
            return;
        }

        char digit = digits.charAt(index);
        String letters = phoneMap.get(digit);
        for (char letter : letters.toCharArray()) {
            current.append(letter);             // Choose
            backtrack(result, digits, phoneMap, index + 1, current); // Explore
            current.deleteCharAt(current.length() - 1); // Backtrack
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.letterCombinations("23")); // Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    }
}
```

---

## Dry Run
**Input:** `digits = "23"`

- `phoneMap` = { '2': "abc", '3': "def" }
- Starting with an empty combination:

| Step | Combination | Result List |
|------|--------------|---------------|
| 1 | `a` (from '2') | - |
| 2 | `ad` (from '3') | `ad` |
| 3 | `ae` (from '3') | `ad`, `ae` |
| 4 | `af` (from '3') | `ad`, `ae`, `af` |
| 5 | `b` (from '2') | `ad`, `ae`, `af` |
| 6 | `bd` (from '3') | `ad`, `ae`, `af`, `bd` |
| 7 | `be` (from '3') | `ad`, `ae`, `af`, `bd`, `be` |
| 8 | `bf` (from '3') | `ad`, `ae`, `af`, `bd`, `be`, `bf` |
| 9 | `c` (from '2') | `ad`, `ae`, `af`, `bd`, `be`, `bf` |
|10 | `cd` (from '3') | `ad`, `ae`, `af`, `bd`, `be`, `bf`, `cd` |
|11 | `ce` (from '3') | `ad`, `ae`, `af`, `bd`, `be`, `bf`, `cd`, `ce` |
|12 | `cf` (from '3') | `ad`, `ae`, `af`, `bd`, `be`, `bf`, `cd`, `ce`, `cf` |

**Output:** `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

---

## Complexity Analysis
- **Time Complexity:** `O(3^m * 4^n)` where `m` is the number of digits mapping to 3 letters (like '2', '3', '4', etc.) and `n` is the number of digits mapping to 4 letters (like '7' and '9').
- **Space Complexity:** `O(3^m * 4^n)` for the result storage and recursion depth.

# Combinations Problem

## Problem Statement
Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the range `[1, n]`.

You may return the answer in any order.

### Example 1:
**Input:**
```
n = 4, k = 2
```
**Output:**
```
[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

### Example 2:
**Input:**
```
n = 1, k = 1
```
**Output:**
```
[[1]]
```

### Constraints
- `1 <= n <= 20`
- `1 <= k <= n`

---

## Approach
### Steps
1. **Backtracking Approach:**
   - Create a list to store the result.
   - Use a recursive function to explore combinations.
   - At each step:
     - If the current combination size equals `k`, add it to the result list.
     - Otherwise, iterate from the current index to `n` and recursively add each number to the combination.
2. Backtrack by removing the last added number to explore new combinations.

---

## Code Implementation
```java
import java.util.*;

class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), 1, n, k);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> tempList, int start, int n, int k) {
        if (tempList.size() == k) {
            result.add(new ArrayList<>(tempList));
            return;
        }

        for (int i = start; i <= n; i++) {
            tempList.add(i);             // Add current number
            backtrack(result, tempList, i + 1, n, k);  // Move to next index
            tempList.remove(tempList.size() - 1);      // Remove last element for backtracking
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println("Output for n = 4, k = 2: " + solution.combine(4, 2));
        System.out.println("Output for n = 1, k = 1: " + solution.combine(1, 1));
    }
}
```

---

## Dry Run
### Input: `n = 4`, `k = 2`

**Step 1:** Start from index `1`.  
- Add `1` -> [1]  
  - Add `2` -> [1, 2]  
  ✅ **Valid Combination Found** -> Add [1, 2] to result.  

- Backtrack: Remove `2`  
  - Add `3` -> [1, 3]  
  ✅ **Valid Combination Found** -> Add [1, 3] to result.  

- Backtrack: Remove `3`  
  - Add `4` -> [1, 4]  
  ✅ **Valid Combination Found** -> Add [1, 4] to result.  

**Step 2:** Backtrack to empty list and continue with index `2`.  
- Add `2` -> [2]  
  - Add `3` -> [2, 3]  
  ✅ **Valid Combination Found** -> Add [2, 3] to result.  

- Backtrack: Remove `3`  
  - Add `4` -> [2, 4]  
  ✅ **Valid Combination Found** -> Add [2, 4] to result.  

**Step 3:** Continue with index `3`.  
- Add `3` -> [3]  
  - Add `4` -> [3, 4]  
  ✅ **Valid Combination Found** -> Add [3, 4] to result.  

**Final Output:** `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`

---

## Complexity Analysis
- **Time Complexity:** `O(C(n, k))` where `C(n, k)` is the number of combinations (binomial coefficient).
- **Space Complexity:** `O(k)` for the recursion stack depth and temporary list storage.

---

# Permutations

## Problem Statement
Given an array `nums` of distinct integers, return all possible permutations. You can return the answer in any order.

### Example 1:
**Input:** `nums = [1,2,3]`  
**Output:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

### Example 2:
**Input:** `nums = [0,1]`  
**Output:** `[[0,1],[1,0]]`

### Example 3:
**Input:** `nums = [1]`  
**Output:** `[[1]]`

### Constraints:
- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All integers of `nums` are unique.

---

## Approach: Backtracking

### Steps
1. Create a list to store the result.
2. Implement a recursive function `backtrack` that explores all possible permutations:
   - Base case: If the current permutation reaches the length of the original array, add it to the result.
   - Iterate through the array:
     - Skip elements that are already in the current permutation.
     - Add the chosen element to the temporary list.
     - Recursively call the `backtrack` function.
     - Backtrack by removing the last added element to explore other paths.
3. Return the result list.

---

## Code Implementation
```java
import java.util.*;

class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> tempList, int[] nums) {
        if (tempList.size() == nums.length) {
            result.add(new ArrayList<>(tempList)); // Add completed permutation
            return;
        }
        for (int num : nums) {
            if (tempList.contains(num)) continue; // Skip duplicates in the current path
            tempList.add(num);                    // Choose
            backtrack(result, tempList, nums);    // Explore
            tempList.remove(tempList.size() - 1); // Un-choose (backtrack)
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println("Permutations of [1,2,3]: " + solution.permute(new int[]{1, 2, 3}));
        System.out.println("Permutations of [0,1]: " + solution.permute(new int[]{0, 1}));
        System.out.println("Permutations of [1]: " + solution.permute(new int[]{1}));
    }
}
```

---

## Dry Run (Example 1: nums = [1, 2, 3])

**Initial Call:** `backtrack([], [], [1, 2, 3])`

| Step | Temp List | Result                        |
|------|------------|------------------------------|
| 1     | [1]         | []                           |
| 2     | [1, 2]      | []                           |
| 3     | [1, 2, 3]   | [[1, 2, 3]]                 |
| Backtrack | [1, 2]   | [[1, 2, 3]]                 |
| 4     | [1, 3]      | [[1, 2, 3]]                 |
| 5     | [1, 3, 2]   | [[1, 2, 3], [1, 3, 2]]      |
| Backtrack | [1]       | [[1, 2, 3], [1, 3, 2]]      |
| 6     | [2]         | [[1, 2, 3], [1, 3, 2]]      |
| 7     | [2, 1]      | [[1, 2, 3], [1, 3, 2]]      |
| 8     | [2, 1, 3]   | [[1, 2, 3], [1, 3, 2], [2, 1, 3]] |
| Backtrack | [2]       | ...                        |

This continues until all combinations are explored.

---

## Complexity Analysis
- **Time Complexity:** `O(n!)`  
  Each element can appear in each position, resulting in `n!` permutations.
- **Space Complexity:** `O(n)` (Recursive stack depth for backtracking calls)

# Combination Sum Problem

## Problem Statement
Given an array of **distinct integers** `candidates` and a **target integer** `target`, return a list of **all unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in **any order**.

The **same number** may be chosen from `candidates` **unlimited times**. Two combinations are considered unique if the frequency of at least one of the chosen numbers is different.

### Examples
**Example 1:**
```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
```
**Example 2:**
```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```
**Example 3:**
```
Input: candidates = [2], target = 1
Output: []
```

### Constraints
- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are **distinct**.
- `1 <= target <= 40`

---

## Approach
### Backtracking Approach
- Use a **backtracking algorithm** to explore all possible combinations.
- For each number in `candidates`:
  - Include the current number in the combination.
  - Recursively explore combinations that achieve the remaining target.
  - After exploring that path, backtrack by removing the current number from the combination.

### Key Idea
- Start iterating from the current index to allow unlimited use of each element.
- Stop when the remaining target becomes negative or zero (zero means a valid combination).

---

## Java Code Implementation
```java
import java.util.*;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> combination, int[] candidates, int target, int start) {
        if (target == 0) {
            result.add(new ArrayList<>(combination)); // Found a valid combination
            return;
        }
        if (target < 0) return; // Backtrack condition

        for (int i = start; i < candidates.length; i++) {
            combination.add(candidates[i]); // Choose
            backtrack(result, combination, candidates, target - candidates[i], i); // Explore
            combination.remove(combination.size() - 1); // Undo choice (Backtrack)
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println("Output 1: " + sol.combinationSum(new int[]{2, 3, 6, 7}, 7));
        System.out.println("Output 2: " + sol.combinationSum(new int[]{2, 3, 5}, 8));
        System.out.println("Output 3: " + sol.combinationSum(new int[]{2}, 1));
    }
}
```

---

## Dry Run
### Example Input: `candidates = [2, 3, 6, 7]`, `target = 7`

**Step 1:** Start with an empty combination [] and `target = 7`.
- Pick 2 (combination = [2]) → Remaining target = 5
- Pick 2 again (combination = [2, 2]) → Remaining target = 3
- Pick 2 again (combination = [2, 2, 2]) → Remaining target = 1 (Backtrack)
- Backtrack to [2, 2] and pick 3 → Combination = [2, 2, 3] → Remaining target = 0 (Valid Combination)

**Step 2:** Backtrack and explore other candidates.
- Pick 7 directly → Combination = [7] → Remaining target = 0 (Valid Combination)

Final result: `[[2, 2, 3], [7]]`

---

## Complexity Analysis
- **Time Complexity:** `O(2^target)` - Each element can be picked multiple times, leading to exponential combinations in the worst case.
- **Space Complexity:** `O(target)` - Maximum recursion depth when constructing combinations.
