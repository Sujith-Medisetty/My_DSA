# Merge Sorted Arrays

## Problem Statement
You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.

Merge `nums1` and `nums2` into a single array sorted in non-decreasing order.

The final sorted array should be stored inside `nums1`. `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0`.

## Code Implementation

```java
public class MergeSortedArrays {

    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        // Pointers for nums1 and nums2
        int p1 = m - 1; // Points to the last element in the valid part of nums1
        int p2 = n - 1; // Points to the last element in nums2
        int p = m + n - 1; // Points to the last position in nums1 (end of array)

        // Merge from the end to the beginning to avoid overwriting elements in nums1
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }

        // If elements remain in nums2, copy them
        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 3, 0, 0, 0};
        int m = 3;
        int[] nums2 = {2, 5, 6};
        int n = 3;

        merge(nums1, m, nums2, n);

        System.out.print("Merged Array: ");
        for (int num : nums1) {
            System.out.print(num + " ");
        }
    }
}

# Remove Element

## Problem Statement
Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.

Consider the number of elements in `nums` which are not equal to `val` be `k`. To get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the elements which are not equal to `val`. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

## Code Implementation

```java
public class RemoveElement {

    public static int removeElement(int[] nums, int val) {
        int k = 0; // Counter for non-val elements

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 2, 3};
        int val = 3;

        int k = removeElement(nums, val);
        System.out.println("Number of elements not equal to " + val + ": " + k);
        System.out.print("Modified Array: ");
        for (int i = 0; i < k; i++) {
            System.out.print(nums[i] + " ");
        }
    }
}
```

# Remove Duplicates from Sorted Array

## Problem Statement
Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in `nums`.

Consider the number of unique elements of `nums` to be `k`. To get accepted, you need to do the following things:

- Change the array `nums` such that the first `k` elements of `nums` contain the unique elements in the order they were present in `nums` initially. The remaining elements of `nums` are not important as well as the size of `nums`.
- Return `k`.

## Code Implementation

```java
public class RemoveDuplicates {

    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int k = 1; // Unique element counter

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }

    public static void main(String[] args) {
        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};

        int k = removeDuplicates(nums);
        System.out.println("Number of unique elements: " + k);
        System.out.print("Modified Array: ");
        for (int i = 0; i < k; i++) {
            System.out.print(nums[i] + " ");
        }
    }
}
```

# Remove Duplicates from Sorted Array II

## Problem Statement
Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.

Return `k` after placing the final result in the first `k` slots of `nums`.

## Code Implementation

```java
public class RemoveDuplicatesII {

    public static int removeDuplicates(int[] nums) {
        if (nums.length <= 2) return nums.length;

        int k = 2; // Allow at most two occurrences

        for (int i = 2; i < nums.length; i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }

    public static void main(String[] args) {
        int[] nums = {0, 0, 1, 1, 1, 1, 2, 3, 3};

        int k = removeDuplicates(nums);
        System.out.println("Number of unique elements: " + k);
        System.out.print("Modified Array: ");
        for (int i = 0; i < k; i++) {
            System.out.print(nums[i] + " ");
        }
    }
}
```

# Majority Element

## Problem Statement
Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

### Example 1:
**Input:** `nums = [3,2,3]`

**Output:** `3`

### Example 2:
**Input:** `nums = [2,2,1,1,1,2,2]`

**Output:** `2`

### Constraints:
- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

### Follow-up: Could you solve the problem in linear time and in `O(1)` space?

## Code Implementation

```java
public class MajorityElement {

    public static int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }

    public static void main(String[] args) {
        int[] nums = {2, 2, 1, 1, 1, 2, 2};

        int result = majorityElement(nums);
        System.out.println("Majority Element: " + result);
    }
}
```

# Rotate Array

## Problem Statement
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.

### Example 1:
**Input:** `nums = [1,2,3,4,5,6,7]`, `k = 3`

**Output:** `[5,6,7,1,2,3,4]`

**Explanation:**
- Rotate 1 step to the right: `[7,1,2,3,4,5,6]`
- Rotate 2 steps to the right: `[6,7,1,2,3,4,5]`
- Rotate 3 steps to the right: `[5,6,7,1,2,3,4]`

### Example 2:
**Input:** `nums = [-1,-100,3,99]`, `k = 2`

**Output:** `[3,99,-1,-100]`

**Explanation:**
- Rotate 1 step to the right: `[99,-1,-100,3]`
- Rotate 2 steps to the right: `[3,99,-1,-100]`

### Constraints:
- `1 <= nums.length <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `0 <= k <= 10^5`

### Follow-up:
- Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
- Could you do it in-place with `O(1)` extra space?

## Code Implementation

```java
public class RotateArray {

    public static void rotate(int[] nums, int k) {
        k %= nums.length; // Handle cases where k >= nums.length
        reverse(nums, 0, nums.length - 1); // Reverse the entire array
        reverse(nums, 0, k - 1); // Reverse the first k elements
        reverse(nums, k, nums.length - 1); // Reverse the remaining elements
    }

    private static void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7};
        int k = 3;

        rotate(nums, k);
        System.out.print("Rotated Array: ");
        for (int num : nums) {
            System.out.print(num + " ");
        }
    }
}
```

# Best Time to Buy and Sell Stock

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

### Example 1:
**Input:** `prices = [7,1,5,3,6,4]`

**Output:** `5`

**Explanation:**
- Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
- Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

### Example 2:
**Input:** `prices = [7,6,4,3,1]`

**Output:** `0`

**Explanation:**
- In this case, no transactions are done and the max profit = 0.

### Constraints:
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Code Implementation

```java
public class BestTimeToBuyAndSellStock {

    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            // Update the min price if a lower price is found
            if (price < minPrice) {
                minPrice = price;
            } else {
                // Calculate profit if selling at current price and track the maximum profit
                maxProfit = Math.max(maxProfit, price - minPrice);
            }
        }

        return maxProfit;
    }

    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};

        System.out.println("Max Profit: " + maxProfit(prices)); // Output: 5
    }
}
```
# Best Time to Buy and Sell Stock II

## Problem Statement
You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

**Goal:** Find and return the maximum profit you can achieve.

### Example 1:
**Input:** `prices = [7,1,5,3,6,4]`  
**Output:** `7`  
**Explanation:**
- Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.  
- Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.  
- Total profit = 4 + 3 = **7**.

### Example 2:
**Input:** `prices = [1,2,3,4,5]`  
**Output:** `4`  
**Explanation:**
- Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.  
- Total profit = **4**.

### Example 3:
**Input:** `prices = [7,6,4,3,1]`  
**Output:** `0`  
**Explanation:**
- There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of `0`.

### Constraints:
- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

---

## Code Implementation
```java
class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 1; i < prices.length; i++) {
            // Add profit if there is a positive difference (upward trend)
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        int[] prices1 = {7, 1, 5, 3, 6, 4};
        System.out.println("Max Profit (Example 1): " + solution.maxProfit(prices1)); // Output: 7

        int[] prices2 = {1, 2, 3, 4, 5};
        System.out.println("Max Profit (Example 2): " + solution.maxProfit(prices2)); // Output: 4

        int[] prices3 = {7, 6, 4, 3, 1};
        System.out.println("Max Profit (Example 3): " + solution.maxProfit(prices3)); // Output: 0
    }
}
```

---
## Jump Game

### Problem Statement
You are given an integer array `nums` where `nums[i]` is the maximum jump length at that position.

**Goal:** Return `true` if you can reach the last index, or `false` otherwise.

### Example 1:
**Input:** `nums = [2,3,1,1,4]`  
**Output:** `true`  
**Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.

### Example 2:
**Input:** `nums = [3,2,1,0,4]`  
**Output:** `false`  
**Explanation:** You will always arrive at index 3 no matter what. Its maximum jump length is 0, making it impossible to reach the last index.

### Constraints:
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

---

### Code Implementation
```java
class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0; // Tracks the farthest index we can reach

        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false; // If current index is beyond reachable range
            maxReach = Math.max(maxReach, i + nums[i]); // Update maximum reachable index
        }
        return true;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        int[] nums1 = {2, 3, 1, 1, 4};
        System.out.println("Can reach last index (Example 1): " + solution.canJump(nums1)); // true

        int[] nums2 = {3, 2, 1, 0, 4};
        System.out.println("Can reach last index (Example 2): " + solution.canJump(nums2)); // false
    }
}
```

# Minimum Jumps to Reach the End

## Problem Statement
You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:

- `0 <= j <= nums[i]` and
- `i + j < n`

Return the **minimum number of jumps** to reach `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.

### Example 1:
**Input:** `nums = [2,3,1,1,4]`  
**Output:** `2`  
**Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.

### Example 2:
**Input:** `nums = [2,3,0,1,4]`  
**Output:** `2`  

### Constraints:
- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 1000`
- It's guaranteed that you can reach `nums[n - 1]`.

---

## **Dynamic Programming (DP) Approach**
### Code Implementation
```java
import java.util.*;

public class MinJumpsDP {
    public int jump(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 1; j <= nums[i] && i + j < n; j++) {
                dp[i + j] = Math.min(dp[i + j], dp[i] + 1);
            }
        }
        return dp[n - 1];
    }

    public static void main(String[] args) {
        MinJumpsDP solution = new MinJumpsDP();
        int[] nums = {2, 3, 1, 1, 4};
        System.out.println("Minimum Jumps (DP): " + solution.jump(nums)); // Output: 2
    }
}
```

### Explanation
- `dp[i]` represents the minimum jumps required to reach index `i`.
- We initialize `dp[0] = 0` since we're already at the starting point.
- For each index, iterate through possible jumps (`j`) and update the minimum jumps required to reach the target index.
- **Time Complexity:** `O(n^2)`
- **Space Complexity:** `O(n)`

---

## **Greedy Approach**
### Code Implementation
```java
public class MinJumpsGreedy {
    public int jump(int[] nums) {
        int jumps = 0, farthest = 0, end = 0;

        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == end) {
                jumps++;
                end = farthest;
            }
        }

        return jumps;
    }

    public static void main(String[] args) {
        MinJumpsGreedy solution = new MinJumpsGreedy();
        int[] nums = {2, 3, 1, 1, 4};
        System.out.println("Minimum Jumps (Greedy): " + solution.jump(nums)); // Output: 2
    }
}
```

### Explanation
- `jumps` tracks the number of jumps taken.
- `farthest` keeps track of the farthest index we can currently reach.
- `end` marks the current boundary for the jump — when `i` reaches this boundary, we know it's time to make a jump.
- **Time Complexity:** `O(n)`
- **Space Complexity:** `O(1)`

---

## Which Approach to Use?
| Criteria | DP Approach | Greedy Approach |
|-----------|---------------|-----------------|
| Time Complexity | `O(n^2)` | `O(n)` |
| Space Complexity | `O(n)` | `O(1)` |
| Suitable for | Small arrays or educational purposes | Larger arrays with better efficiency |

For optimal performance, the **Greedy Approach** is the best choice in this problem since it efficiently calculates the result in linear time.

# H-Index

## Problem Statement
You are given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i`th paper. Return the researcher's **h-index**.

**Definition:** The **h-index** is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

### Example 1:
**Input:** citations = [3,0,6,1,5]  
**Output:** 3  
**Explanation:** The researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each. Their h-index is **3**.

### Example 2:
**Input:** citations = [1,3,1]  
**Output:** 1  

### Constraints:
- `n == citations.length`
- `1 <= n <= 5000`
- `0 <= citations[i] <= 1000`

---

## Approach

### Step 1: Sort the Array
- Sort the `citations` array in **descending order**. This simplifies the logic since you can directly check if a paper meets the `h-index` condition.

### Step 2: Iterate through the Sorted Array
- Traverse the sorted array and track the number of papers counted so far (`i + 1`).
- For each element, if the number of citations at that position is greater than or equal to `i + 1`, update the `h-index`.
- If at any point the citation count is less than the number of papers counted so far, stop — this is the maximum possible `h-index`.

### Step 3: Return the Result
- Return the maximum `h-index` found.

---

## Code Implementation
```java
import java.util.*;

public class HIndex {

    public int hIndex(int[] citations) {
        Arrays.sort(citations); // Sort in ascending order
        int n = citations.length;
        int hIndex = 0;

        for (int i = 0; i < n; i++) {
            int remainingPapers = n - i; // Papers that have at least citations[i] citations
            if (citations[i] >= remainingPapers) {
                hIndex = remainingPapers;
                break;
            }
        }
        return hIndex;
    }

    public static void main(String[] args) {
        HIndex solution = new HIndex();

        int[] citations1 = {3, 0, 6, 1, 5};
        System.out.println("H-Index (Example 1): " + solution.hIndex(citations1)); // Output: 3

        int[] citations2 = {1, 3, 1};
        System.out.println("H-Index (Example 2): " + solution.hIndex(citations2)); // Output: 1
    }
}
```

---

## Complexity Analysis
- **Time Complexity:** `O(n log n)` — Sorting the array takes `O(n log n)`, and iterating through the sorted array takes `O(n)`.
- **Space Complexity:** `O(1)` — The solution modifies the input array in place and uses constant extra space.

# RandomizedSet Implementation

## Problem Statement

Implement the `RandomizedSet` class:

- **`RandomizedSet()`**: Initializes the RandomizedSet object.  
- **`boolean insert(int val)`**: Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.
- **`boolean remove(int val)`**: Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.
- **`int getRandom()`**: Returns a random element from the current set of elements. Each element must have the same probability of being returned.

### Example 1

**Input:**
```
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
```
**Output:**
```
[null, true, false, true, 2, true, false, 2]
```

**Explanation:**
```java
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2. Set now contains [1, 2].
randomizedSet.getRandom(); // Returns either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set. Returns false.
randomizedSet.getRandom(); // Returns 2 since it's the only element.
```

---

## Approach

To achieve **O(1)** average time complexity for all operations:

✅ Use a **HashMap** to store the value and its index.  
✅ Use an **ArrayList** to efficiently fetch random elements.

### Key Operations
- **Insert Operation**
  - If `val` already exists in the map, return `false`.
  - Otherwise, append `val` to the list and add it to the map with its index.

- **Remove Operation**
  - If `val` does not exist in the map, return `false`.
  - Otherwise:
    - Swap `val` with the last element in the list.
    - Update the map with the swapped element's new index.
    - Remove `val` from the list and map.

- **getRandom Operation**
  - Generate a random index between `0` and `list.size() - 1`.
  - Return the element at that index.

---

## Code Implementation
```java
import java.util.*;

class RandomizedSet {
    private Map<Integer, Integer> map;
    private List<Integer> list;
    private Random random;

    public RandomizedSet() {
        map = new HashMap<>();
        list = new ArrayList<>();
        random = new Random();
    }

    public boolean insert(int val) {
        if (map.containsKey(val)) {
            return false;
        }
        map.put(val, list.size());
        list.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!map.containsKey(val)) {
            return false;
        }
        int index = map.get(val);
        int lastElement = list.get(list.size() - 1);

        // Swap the element to remove with the last element
        list.set(index, lastElement);
        map.put(lastElement, index);

        // Remove the last element
        list.remove(list.size() - 1);
        map.remove(val);
        return true;
    }

    public int getRandom() {
        int randomIndex = random.nextInt(list.size());
        return list.get(randomIndex);
    }

    public static void main(String[] args) {
        RandomizedSet randomizedSet = new RandomizedSet();
        System.out.println(randomizedSet.insert(1));  // true
        System.out.println(randomizedSet.remove(2));  // false
        System.out.println(randomizedSet.insert(2));  // true
        System.out.println(randomizedSet.getRandom()); // 1 or 2
        System.out.println(randomizedSet.remove(1));  // true
        System.out.println(randomizedSet.insert(2));  // false
        System.out.println(randomizedSet.getRandom()); // 2
    }
}
```

---

## Complexity Analysis
- **Time Complexity**:
  - `insert()`: **O(1)** (Average case)
  - `remove()`: **O(1)** (Average case)
  - `getRandom()`: **O(1)**

- **Space Complexity**: **O(n)** (For storing the elements in the HashMap and ArrayList)

# Product of Array Except Self

## Problem Statement
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

**You must write an algorithm that runs in `O(n)` time and without using the division operation.**

### Example 1:
**Input:** `nums = [1,2,3,4]`  
**Output:** `[24,12,8,6]`

### Example 2:
**Input:** `nums = [-1,1,0,-3,3]`  
**Output:** `[0,0,9,0,0]`

### Constraints:
- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The input is generated such that `answer[i]` is guaranteed to fit in a 32-bit integer.

### Follow-up:
Can you solve the problem in `O(1)` extra space complexity? (The output array does not count as extra space for space complexity analysis.)

---

## Approach
To solve this problem efficiently in `O(n)` time and without using the division operator, we'll use the **Prefix Product** and **Suffix Product** technique:

1. **Initialize Arrays:**
   - Create two arrays: `left` and `right`.
   - `left[i]` will store the product of all elements before index `i`.
   - `right[i]` will store the product of all elements after index `i`.

2. **Calculate Prefix Products:**
   - Iterate from left to right and fill the `left` array.

3. **Calculate Suffix Products:**
   - Iterate from right to left and fill the `right` array.

4. **Build Result Array:**
   - For each index `i`, `answer[i] = left[i] * right[i]`.

5. **Space Optimization:**
   - Instead of separate `left` and `right` arrays, directly modify the result array using a `rightProduct` variable to reduce space complexity.

---

## Code Implementation in Java
```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // Step 1: Fill the result array with prefix products
        result[0] = 1; // No elements before index 0
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // Step 2: Traverse from right to left for suffix products
        int rightProduct = 1; // No elements after the last index
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= rightProduct; // Multiply with the accumulated suffix product
            rightProduct *= nums[i];
        }

        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        int[] nums1 = {1, 2, 3, 4};
        int[] result1 = solution.productExceptSelf(nums1);
        System.out.println("Output 1: " + java.util.Arrays.toString(result1));

        int[] nums2 = {-1, 1, 0, -3, 3};
        int[] result2 = solution.productExceptSelf(nums2);
        System.out.println("Output 2: " + java.util.Arrays.toString(result2));
    }
}
```

---

## Explanation
- **`result[]` Array Construction:**
  - Initially, `result[i]` holds prefix products.
  - As we iterate backward, we accumulate suffix products and multiply them directly with the corresponding prefix product in the result array.

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — The algorithm iterates through the array twice.
- **Space Complexity:** `O(1)` — The result array does not count as extra space, fulfilling the follow-up requirement.

# Gas Station Problem

## Problem Statement
There are `n` gas stations along a circular route, where the amount of gas at the `i-th` station is `gas[i]`.

You have a car with an unlimited gas tank, and it costs `cost[i]` of gas to travel from the `i-th` station to its next `(i + 1)-th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return the **starting gas station's index** if you can travel around the circuit once in the clockwise direction. Otherwise, return `-1`. If there exists a solution, it is guaranteed to be unique.

### Example 1:
**Input:**  
```
gas = [1, 2, 3, 4, 5]
cost = [3, 4, 5, 1, 2]
```
**Output:** `3`

**Explanation:**
- Start at station 3 (0-based index).
- Collect 4 gas and move to station 4. Remaining gas: 4 - 1 = 3.
- Collect 5 gas and move to station 0. Remaining gas: 3 + 5 - 2 = 6.
- Collect 1 gas and move to station 1. Remaining gas: 6 + 1 - 3 = 4.
- Collect 2 gas and move to station 2. Remaining gas: 4 + 2 - 4 = 2.
- Collect 3 gas and move to station 3. Remaining gas: 2 + 3 - 5 = 0.

Since we returned to the starting station with `0` gas remaining, station 3 is the correct answer.

### Example 2:
**Input:**  
```
gas = [2, 3, 4]
cost = [3, 4, 3]
```
**Output:** `-1`

**Explanation:**
- It's impossible to complete the circuit with the given gas and cost values.

---

## Approach
### Step 1: Check Total Gas and Cost
- Calculate the total gas available (`totalGas`) and total cost (`totalCost`).
- If `totalGas < totalCost`, return `-1` because it's impossible to complete the circuit.

### Step 2: Identify Starting Index
- Initialize two variables:
  - `tank = 0` (to track the remaining gas).
  - `start = 0` (starting station index).
- Iterate through the stations:
  - Add the net gas balance at each station: `tank += gas[i] - cost[i]`.
  - If `tank < 0`, reset `start` to the next station (`start = i + 1`) and set `tank = 0`.

### Step 3: Return the Starting Index
- After completing the loop, return `start`.

---

## Java Code Implementation
```java
class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0, tank = 0, start = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];

            if (tank < 0) {
                start = i + 1;  // Reset starting point
                tank = 0;       // Reset tank for the new starting point
            }
        }

        return totalGas >= totalCost ? start : -1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        int[] gas1 = {1, 2, 3, 4, 5};
        int[] cost1 = {3, 4, 5, 1, 2};
        System.out.println("Output: " + solution.canCompleteCircuit(gas1, cost1)); // Output: 3

        int[] gas2 = {2, 3, 4};
        int[] cost2 = {3, 4, 3};
        System.out.println("Output: " + solution.canCompleteCircuit(gas2, cost2)); // Output: -1
    }
}
```

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Each station is visited at most twice.
- **Space Complexity:** `O(1)` — Only a few extra variables are used.

---

## Key Observations
✅ If total gas < total cost, it's impossible to finish the circuit.  
✅ The key trick is identifying the correct starting station where the accumulated tank balance never goes negative.  

# Candy Distribution Problem

## Problem Statement
You are given an array `ratings` where `ratings[i]` is the rating of the ith child. Each child must receive at least one candy. Children with higher ratings must get more candies than their immediate neighbors. Return the **minimum number of candies** you must distribute to satisfy these conditions.

### Example 1
**Input:** `ratings = [1, 0, 2]`

**Output:** `5`

**Explanation:**
- Give 2 candies to the first child, 1 candy to the second child, and 2 candies to the third child. The total number of candies is `5`.

### Example 2
**Input:** `ratings = [1, 2, 2]`

**Output:** `4`

**Explanation:**
- Give 1 candy to the first child, 2 candies to the second child, and 1 candy to the third child. The total number of candies is `4`.

### Constraints
- `n == ratings.length`
- `1 <= n <= 2 * 10^4`
- `0 <= ratings[i] <= 2 * 10^4`

---

## Approach
### Step 1: Create a `candies` array and initialize all elements to `1` (since each child must get at least one candy).
### Step 2: Left-to-right pass
- Traverse from left to right.
- If `ratings[i] > ratings[i - 1]`, increase `candies[i]` to `candies[i - 1] + 1`.

### Step 3: Right-to-left pass
- Traverse from right to left.
- If `ratings[i] > ratings[i + 1]`, ensure `candies[i]` is at least `candies[i + 1] + 1`.

### Step 4: Return the sum of the `candies` array.

---

## Code Implementation in Java
```java
import java.util.*;

public class CandyDistribution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        Arrays.fill(candies, 1); // Step 1: Each child gets at least 1 candy

        // Step 2: Left-to-right pass
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }

        // Step 3: Right-to-left pass
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }

        // Step 4: Calculate total candies
        int totalCandies = 0;
        for (int c : candies) {
            totalCandies += c;
        }

        return totalCandies;
    }

    public static void main(String[] args) {
        CandyDistribution solution = new CandyDistribution();

        int[] ratings1 = {1, 0, 2};
        System.out.println("Minimum candies (Example 1): " + solution.candy(ratings1)); // Output: 5

        int[] ratings2 = {1, 2, 2};
        System.out.println("Minimum candies (Example 2): " + solution.candy(ratings2)); // Output: 4
    }
}
```

---

## Dry Run
**Input:** `ratings = [1, 0, 2]`

### Initial `candies` array:
```
[1, 1, 1]  // Step 1: Initialize all to 1
```

### Left-to-right pass:
```
[1, 1, 2]  // Step 2: ratings[2] > ratings[1] → candies[2] = candies[1] + 1
```

### Right-to-left pass:
```
[2, 1, 2]  // Step 3: ratings[0] > ratings[1] → candies[0] = candies[1] + 1
```

### Final Sum of Candies: **5**

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Two passes through the array.
- **Space Complexity:** `O(n)` — For the `candies` array.

***
# The two-way traversal like above problem (or bidirectional pass) approach is particularly useful when solving problems that involve relative dependencies between elements in an array — especially when conditions apply both before and after a given element.
***

# Trapping Rain Water Problem

## Problem Statement
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

### Example 1:
**Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`  
**Output:** `6`  
**Explanation:** The array represents an elevation map where 6 units of rainwater are trapped.

### Example 2:
**Input:** `height = [4,2,0,3,2,5]`  
**Output:** `9`

### Constraints:
- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

---

## Approach 1: Greedy Two-Pass Solution (Prefix & Suffix Trick)
### Key Idea:
1. Use two arrays:
   - `leftMax[]`: Tracks the maximum height seen so far from the **left**.
   - `rightMax[]`: Tracks the maximum height seen so far from the **right**.
2. For each index, calculate the trapped water as:

`water[i] = min(leftMax[i], rightMax[i]) - height[i]`

### Code Implementation (Greedy Solution)
```java
class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;

        int n = height.length;
        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        // Fill leftMax array
        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        // Fill rightMax array
        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        // Calculate trapped water
        int totalWater = 0;
        for (int i = 0; i < n; i++) {
            totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
        }

        return totalWater;
    }
}
```

### Dry Run (Greedy Approach)
**Input:** `[0,1,0,2,1,0,1,3,2,1,2,1]`  

| Index | Height | LeftMax | RightMax | Water  |
|--------|--------|----------|-----------|---------|
| 0        | 0         | 0              | 3                | 0             |
| 1        | 1         | 1              | 3                | 0             |
| 2        | 0         | 1              | 3                | 1             |
| 3        | 2         | 2              | 3                | 0             |
| 4        | 1         | 2              | 3                | 1             |
| 5        | 0         | 2              | 3                | 2             |
| 6        | 1         | 2              | 3                | 1             |
| 7        | 3         | 3              | 3                | 0             |
| 8        | 2         | 3              | 2                | 0             |
| 9        | 1         | 3              | 2                | 1             |
| 10      | 2         | 3              | 2                | 0             |
| 11      | 1         | 3              | 1                | 0             |

**Total Water:** 6 units

---

## Approach 2: Stack-Based Solution (Efficient Space Optimization)
### Key Idea:
- Use a **stack** to track the indices of bars.
- Traverse the array and apply the following logic:
  - While the current bar is greater than the bar at the top of the stack:
    - Pop the top element (this is the **bottom** of the trapped water).
    - Calculate the width (distance between left and right boundary).
    - Calculate the height of the trapped water and accumulate it.

### Code Implementation (Stack Solution)
```java
import java.util.Stack;

class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;

        Stack<Integer> stack = new Stack<>();
        int totalWater = 0;

        for (int i = 0; i < height.length; i++) {
            while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
                int bottom = stack.pop();
                if (stack.isEmpty()) break; // No left boundary

                int left = stack.peek();
                int width = i - left - 1;
                int heightDiff = Math.min(height[left], height[i]) - height[bottom];

                totalWater += width * heightDiff;
            }
            stack.push(i);
        }

        return totalWater;
    }
}
```

### Dry Run (Stack Approach)
**Input:** `[0,1,0,2,1,0,1,3,2,1,2,1]`

| Step | Stack | Water Trapped |
|------|--------|----------------|
| 0      | [0]      | 0                     |
| 1      | [0, 1]   | 0                     |
| 2      | [0, 1, 2] | 0                    |
| 3      | [0, 1, 3] | 1                    |
| 4      | [0, 1, 3, 4] | 1                |
| 5      | [0, 1, 3, 5] | 3                |
| 6      | [0, 1, 3, 6] | 4                |
| 7      | [0, 1, 3, 7] | 6                |

**Total Water:** 6 units

---

## Comparison
| Approach | Time Complexity | Space Complexity |
|-----------|-------------------|--------------------|
| **Greedy (Prefix/Suffix)** | `O(n)`  | `O(n)` |
| **Stack-Based Solution** | `O(n)` | `O(n)` |

Both approaches have the same time complexity. The **stack-based solution** is preferable for optimizing space in scenarios where manipulating two extra arrays is inefficient.

---

## Key Takeaways
✅ Use the **Greedy Two-Pass** approach for straightforward prefix-suffix conditions.  
✅ Use the **Stack-Based** method when space efficiency is crucial, and you can track boundaries using a stack structure.  

# Roman to Integer Conversion

## Problem Statement
Roman numerals are represented by seven different symbols:

| Symbol | Value |
|---------|--------|
| I       | 1      |
| V       | 5      |
| X       | 10     |
| L       | 50     |
| C       | 100    |
| D       | 500    |
| M       | 1000   |

Given a Roman numeral string, convert it to an integer.

### Example 1:
**Input:** `s = "III"`  
**Output:** `3`  
**Explanation:** `III = 3`  

### Example 2:
**Input:** `s = "LVIII"`  
**Output:** `58`  
**Explanation:** `L = 50, V = 5, III = 3`  

### Example 3:
**Input:** `s = "MCMXCIV"`  
**Output:** `1994`  
**Explanation:** `M = 1000, CM = 900, XC = 90, IV = 4`

### Constraints:
- `1 <= s.length <= 15`
- `s` contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
- It is guaranteed that `s` is a valid Roman numeral in the range [1, 3999].

---

## Approach
### Key Idea
- Use a **HashMap** to map Roman numerals to their integer values.
- Iterate through the string from left to right:
  - If the current character's value is **less than** the next character's value, **subtract** it.
  - Otherwise, **add** it to the total.

### Java Code Implementation
```java
import java.util.HashMap;

class Solution {
    public int romanToInt(String s) {
        HashMap<Character, Integer> map = new HashMap<>();
        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);

        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            if (i < s.length() - 1 && map.get(s.charAt(i)) < map.get(s.charAt(i + 1))) {
                total -= map.get(s.charAt(i));
            } else {
                total += map.get(s.charAt(i));
            }
        }

        return total;
    }
}
```

---

## Dry Run
### Input: `s = "MCMXCIV"`

| Step | Current Char | Next Char | Operation | Total |
|-------|---------------|------------|------------|--------|
| 1     | M             | C          | +1000       | 1000   |
| 2     | C             | M          | -100        | 900    |
| 3     | M             | X          | +1000        | 1900   |
| 4     | X             | C          | -10          | 1890   |
| 5     | C             | I          | +100         | 1990   |
| 6     | I             | V          | -1           | 1989   |
| 7     | V             | -          | +5           | 1994   |

**Final Answer:** `1994`

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Traverses the string once.
- **Space Complexity:** `O(1)` — Constant space for the HashMap (fixed size for Roman numeral symbols).

---

# Integer to Roman Conversion

## Problem Statement
Given an integer, convert it to a Roman numeral.

### Roman Numeral Values
| Symbol | Value |
|---------|--------|
| I       | 1      |
| V       | 5      |
| X       | 10     |
| L       | 50     |
| C       | 100    |
| D       | 500    |
| M       | 1000   |

### Rules for Conversion
- If the value does **not** start with 4 or 9, append the maximum Roman numeral value possible, then reduce the number by that value.
- If the value **starts** with 4 or 9, use the subtractive form:
  - 4 -> `IV`, 9 -> `IX`
  - 40 -> `XL`, 90 -> `XC`
  - 400 -> `CD`, 900 -> `CM`

---

## Approach
1. Create two arrays:
   - `values[]` for corresponding decimal values.
   - `symbols[]` for Roman numeral symbols.
2. Iterate through the `values[]` array and check how many times the current value can fit into `num`.
3. Append the corresponding symbol that many times.
4. Subtract the matched value from `num` and continue until `num` becomes zero.

---

## Java Code Implementation
```java
class Solution {
    public String intToRoman(int num) {
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        
        StringBuilder roman = new StringBuilder();

        for (int i = 0; i < values.length; i++) {
            while (num >= values[i]) {
                roman.append(symbols[i]);
                num -= values[i];
            }
        }

        return roman.toString();
    }
}
```

---

## Dry Run
### Input: `num = 3749`

| Step | Value to Match | Remaining Num | Roman Numeral |
|------|----------------|----------------|----------------|
| 1    | 1000 (M)         | 3749 - 1000 = 2749  | MMM             |
| 2    | 1000 (M)         | 2749 - 1000 = 1749  | MMMM            |
| 3    | 500 (D)          | 1749 - 500 = 1249   | MMMD            |
| 4    | 100 (C)          | 1249 - 100 = 1149   | MMMDCC          |
| 5    | 100 (C)          | 1149 - 100 = 1049   | MMMDCCC         |
| 6    | 40 (XL)          | 1049 - 40 = 1009    | MMMDCCXL        |
| 7    | 9 (IX)           | 1009 - 9 = 1000     | MMMDCCXLIX      |

**Output:** `MMMDCCXLIX`

---

### Input: `num = 58`
**Output:** `LVIII`

### Input: `num = 1994`
**Output:** `MCMXCIV`

---

# Length of Last Word

## Problem Statement
Given a string `s` consisting of words and spaces, return the **length of the last word** in the string.

A word is defined as a **maximal substring** consisting of non-space characters only.

### Example 1:
**Input:** `s = "Hello World"`  
**Output:** `5`  
**Explanation:** The last word is `"World"` with length 5.

### Example 2:
**Input:** `s = "   fly me   to   the moon  "`  
**Output:** `4`  
**Explanation:** The last word is `"moon"` with length 4.

### Example 3:
**Input:** `s = "luffy is still joyboy"`  
**Output:** `6`  
**Explanation:** The last word is `"joyboy"` with length 6.

### Constraints:
- `1 <= s.length <= 10^4`
- `s` consists of only English letters and spaces `' '`.
- There will be at least one word in `s`.

---

## Approach
### Key Idea
- Trim the string to remove any trailing spaces.
- Split the string by spaces to extract individual words.
- Return the length of the **last word** in the resulting array.

### Code Implementation (Java)
```java
class Solution {
    public int lengthOfLastWord(String s) {
        // Trim any leading or trailing spaces
        s = s.trim();
        
        // Split the string by spaces
        String[] words = s.split(" ");
        
        // Return the length of the last word
        return words[words.length - 1].length();
    }
}
```

---

## Dry Run
**Input:** `"   fly me   to   the moon  "`

| Step | Operation             | Result                  |
|------|-----------------------|--------------------------|
| 1    | `Trim()`               | "fly me   to   the moon" |
| 2    | `Split(" ")`            | ["fly", "me", "to", "the", "moon"] |
| 3    | `words[words.length-1]`| "moon"                     |
| 4    | `.length()`             | 4                        |

**Output:** `4`

---

## Optimized Approach (Without Split)
Instead of using `.split()`, we can improve efficiency by scanning the string from the end.

### Code Implementation (Optimized Java Solution)
```java
class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0;
        int i = s.length() - 1;

        // Skip trailing spaces
        while (i >= 0 && s.charAt(i) == ' ') {
            i--;
        }

        // Count the last word's length
        while (i >= 0 && s.charAt(i) != ' ') {
            length++;
            i--;
        }

        return length;
    }
}
```

---

# Longest Common Prefix Problem

## Problem Statement
Write a function to find the **longest common prefix** string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

### Example 1:
**Input:** `strs = ["flower","flow","flight"]`  
**Output:** `"fl"`

### Example 2:
**Input:** `strs = ["dog","racecar","car"]`  
**Output:** `""`  
**Explanation:** There is no common prefix among the input strings.

### Constraints:
- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lowercase English letters if it is non-empty.

---

## Approach 1: Vertical Scanning (Recommended for Simplicity)
### Key Idea
- Assume the first string as the prefix.
- Iterate through each character position in the prefix and compare it with all other strings.
- If any character mismatches, return the prefix up to that point.

### Java Code Implementation (Vertical Scanning)
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        
        // Assume the first string as prefix
        String prefix = strs[0];
        
        // Iterate through remaining strings
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return ""; // No common prefix
            }
        }
        
        return prefix;
    }
}
```

### Dry Run (Vertical Scanning)
**Input:** `strs = ["flower", "flow", "flight"]`

| Step | Prefix | Comparison String | Action  |
|------|---------|--------------------|-----------|
| 1      | `flower` | `flow`                        | Prefix becomes `flow` |
| 2      | `flow`      | `flight`                       | Prefix becomes `fl` |
| **Output:** `"fl"` |

---

## Approach 2: Horizontal Scanning (Alternative Approach)
### Key Idea
- Assume the first string as the prefix.
- Compare this prefix with each string, updating the prefix as needed.
- Efficient when common prefixes are large.

### Java Code Implementation (Horizontal Scanning)
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            int j = 0;
            while (j < prefix.length() && j < strs[i].length() && prefix.charAt(j) == strs[i].charAt(j)) {
                j++;
            }
            prefix = prefix.substring(0, j);
            if (prefix.isEmpty()) return "";
        }
        return prefix;
    }
}
```

### Dry Run (Horizontal Scanning)
**Input:** `strs = ["dog", "racecar", "car"]`

| Step | Prefix | Comparison String | Action  |
|------|---------|--------------------|-----------|
| 1      | `dog`      | `racecar`                     | Prefix becomes `""` |
| **Output:** `""` |

---

## Comparison of Approaches
| Approach               | Time Complexity | Space Complexity |
|------------------------|-------------------|--------------------|
| **Vertical Scanning**       | `O(N * M)`        | `O(1)`                     |
| **Horizontal Scanning**   | `O(N * M)`        | `O(1)`                     |

**N:** Number of strings in the array  
**M:** Length of the shortest string

Both approaches offer optimal time complexity, but the **Vertical Scanning** method is generally simpler and easier to implement in practice.

---
# Zigzag Conversion Problem

## Problem Statement
The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this:

```
P   A   H   N
A P L S I I G
Y   I   R
```

Then read line by line to get the output: `"PAHNAPLSIIGYIR"`

### Example 1
**Input:** `s = "PAYPALISHIRING", numRows = 3`

**Output:** `"PAHNAPLSIIGYIR"`

### Example 2
**Input:** `s = "PAYPALISHIRING", numRows = 4`

**Output:** `"PINALSIGYAHRPI"`

**Explanation:**
```
P     I    N
A   L S  I G
Y A   H R
P     I
```

### Example 3
**Input:** `s = "A", numRows = 1`

**Output:** `"A"`

### Constraints
- `1 <= s.length <= 1000`
- `s` consists of English letters (lower-case and upper-case), `,` and `.`
- `1 <= numRows <= 1000`

---

## Approach
### Key Idea
- Use an array of `StringBuilder` objects to store each row's characters.
- Traverse the string and track the current row index.
- Change direction (up or down) whenever you reach the top or bottom row.

### Steps
1. **Edge Case:** If `numRows` is 1, return the original string since no zigzag is needed.
2. Create an array of `StringBuilder` with `numRows` elements.
3. Iterate through the string:
   - Append each character to the corresponding `StringBuilder`.
   - Change direction when reaching the first or last row.
4. Combine all rows into a single string and return it.

---

## Code Implementation (Java)
```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || s.length() <= numRows) return s;

        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder();
        }

        int index = 0;
        boolean goingDown = false;

        for (char c : s.toCharArray()) {
            rows[index].append(c);
            if (index == 0 || index == numRows - 1) {
                goingDown = !goingDown;
            }
            index += goingDown ? 1 : -1;
        }

        StringBuilder result = new StringBuilder();
        for (StringBuilder row : rows) {
            result.append(row);
        }

        return result.toString();
    }
}
```

---

## Dry Run (Input: `"PAYPALISHIRING", numRows = 3`)
| Step | Character | Row Index | Rows Content       |
|------|------------|-------------|---------------------|
| 1     | P          | 0           | [P] [ ] [ ]         |
| 2     | A          | 1           | [P] [A] [ ]         |
| 3     | Y          | 2           | [P] [A] [Y]         |
| 4     | P          | 1           | [P] [AP] [Y]        |
| 5     | A          | 0           | [PA] [AP] [Y]       |
| 6     | L          | 1           | [PA] [APL] [Y]      |
| 7     | I          | 2           | [PA] [APL] [YI]     |
| 8     | S          | 1           | [PA] [APLS] [YI]    |
| 9     | H          | 0           | [PAH] [APLS] [YI]   |
| 10    | I          | 1           | [PAH] [APLSI] [YI]  |
| 11    | R          | 2           | [PAH] [APLSI] [YIR] |
| 12    | I          | 1           | [PAH] [APLSII] [YIR]|
| 13    | N          | 0           | [PAHN] [APLSII] [YIR]|
| 14    | G          | 1           | [PAHN] [APLSIIG] [YIR]|

**Final Output:** `"PAHNAPLSIIGYIR"`

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Each character is processed once.
- **Space Complexity:** `O(n)` — Each row stores part of the string.


# Text Justification Problem

## Problem Statement
Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully justified (left and right).

### Key Rules:
- Pack words greedily — each line should hold as many words as possible without exceeding `maxWidth`.
- Extra spaces should be distributed evenly. If the number of spaces doesn't divide evenly, assign more spaces to the left slots.
- The **last line** should be left-justified with no extra space between words.

---

## Approach: Greedy Algorithm
### Steps:
1. Initialize a list `result` to store the justified lines.
2. Iterate through the `words` array and build lines by adding words until the `maxWidth` limit is reached.
3. Once a line is filled:
   - Calculate spaces to be added.
   - Distribute spaces evenly across the words in the line.
4. Handle the **last line** separately (left-justified with no extra space between words).

---

## Code Implementation
```java
import java.util.*;

class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> result = new ArrayList<>();
        int index = 0;

        while (index < words.length) {
            int count = words[index].length();
            int last = index + 1;

            while (last < words.length) {
                if (count + 1 + words[last].length() > maxWidth) break;
                count += 1 + words[last].length();
                last++;
            }

            StringBuilder line = new StringBuilder();
            int numberOfWords = last - index;

            if (last == words.length || numberOfWords == 1) { // Last line or single word
                for (int i = index; i < last; i++) {
                    line.append(words[i]);
                    if (i < last - 1) line.append(" ");
                }
                while (line.length() < maxWidth) line.append(" ");
            } else { // Fully justified text
                int totalSpaces = maxWidth - count + (numberOfWords - 1);
                int spacesBetweenWords = totalSpaces / (numberOfWords - 1);
                int extraSpaces = totalSpaces % (numberOfWords - 1);

                for (int i = index; i < last; i++) {
                    line.append(words[i]);
                    if (i < last - 1) {
                        for (int j = 0; j < spacesBetweenWords; j++) line.append(" ");
                        if (extraSpaces > 0) {
                            line.append(" ");
                            extraSpaces--;
                        }
                    }
                }
            }

            result.add(line.toString());
            index = last;
        }

        return result;
    }
}
```

---

## Dry Run
**Input:** `words = ["This", "is", "an", "example", "of", "text", "justification."]`, `maxWidth = 16`

| Line No. | Words in Line | Formatted Line          |
|-----------|-----------------|--------------------------|
| 1                | This is an            | `"This    is    an"`           |
| 2                | example of text | `"example  of text"`    |
| 3                | justification.        | `"justification.  "`         |

**Output:**
```
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Each word is processed once.
- **Space Complexity:** `O(n)` — For the result array.

---

# Valid Palindrome Problem

## Problem Statement
Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

A palindrome is a phrase that reads the same forward and backward after:
- Converting all uppercase letters to lowercase.
- Removing all non-alphanumeric characters.

### Example 1:
**Input:** `s = "A man, a plan, a canal: Panama"`

**Output:** `true`

**Explanation:** "amanaplanacanalpanama" is a palindrome.

### Example 2:
**Input:** `s = "race a car"`

**Output:** `false`

**Explanation:** "raceacar" is not a palindrome.

### Example 3:
**Input:** `s = " "`

**Output:** `true`

**Explanation:** An empty string is considered a palindrome.

---

### Code Implementation
```java
class Solution {
    public boolean isPalindrome(String s) {
        // Clean the string: Convert to lowercase and remove non-alphanumeric characters
        s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        
        return true; // All characters matched
    }
}
```

## Complexity Analysis
- **Time Complexity:** `O(n)` - Each character is processed at most once.
- **Space Complexity:** `O(1)` - Only two pointers are used for tracking positions.

## Is Subsequence

### Problem Statement
Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

### Examples
**Input:** s = "abc", t = "ahbgdc"

**Output:** `true`

**Input:** s = "axc", t = "ahbgdc"

**Output:** `false`

### Constraints
- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist only of lowercase English letters.

### Solution
```java
class Solution {
    public boolean isSubsequence(String s, String t) {
        int sPointer = 0, tPointer = 0;
        while (sPointer < s.length() && tPointer < t.length()) {
            if (s.charAt(sPointer) == t.charAt(tPointer)) {
                sPointer++;
            }
            tPointer++;
        }
        return sPointer == s.length();
    }
}
```

### Explanation
- Initialize two pointers `sPointer` and `tPointer` to 0.
- Traverse both strings:
  - If characters at `sPointer` and `tPointer` match, move `sPointer` forward.
  - Always move `tPointer` forward.
- If `sPointer` reaches the end of `s`, it confirms `s` is a subsequence of `t`.

### Follow-up Solution
For the follow-up scenario where multiple `s` strings need to be checked efficiently:

**Approach:** Binary Search with Hash Map
- Create a HashMap that maps each character in `t` to its list of indices in sorted order.
- For each `s`, perform a binary search to efficiently find matching characters in the correct sequence.

```java
import java.util.*;

class Solution {
    public boolean isSubsequence(String s, String t) {
        Map<Character, List<Integer>> map = new HashMap<>();
        for (int i = 0; i < t.length(); i++) {
            map.computeIfAbsent(t.charAt(i), k -> new ArrayList<>()).add(i);
        }

        int prevIndex = -1;
        for (char c : s.toCharArray()) {
            if (!map.containsKey(c)) return false;
            List<Integer> indices = map.get(c);
            int index = binarySearch(indices, prevIndex);
            if (index == -1) return false;
            prevIndex = indices.get(index);
        }
        return true;
    }

    private int binarySearch(List<Integer> indices, int target) {
        int left = 0, right = indices.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (indices.get(mid) <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left < indices.size() ? left : -1;
    }
}
```

### Why Use Binary Search?
- This optimized solution efficiently handles multiple `s` strings by precomputing character positions in `t`.
- Each query is processed in `O(log n)` for each character in `s`.

### Complexity Analysis
- **Time Complexity for Preprocessing:** `O(t.length)`
- **Time Complexity for Each Query:** `O(s.length * log n)`
- **Space Complexity:** `O(t.length)`

### Dry Run for Follow-up Solution
**Input:** s = "abc", t = "ahbgdc"

**Step 1:** Preprocess `t`:
- HashMap: `{ a: [0], h: [1], b: [2], g: [3], d: [4], c: [5] }`

**Step 2:** Process `s`:
- `prevIndex = -1`
- For character `a`: Found at index 0 → Update `prevIndex = 0`
- For character `b`: Found at index 2 → Update `prevIndex = 2`
- For character `c`: Found at index 5 → Update `prevIndex = 5`

**Final Result:** `true`

**Input:** s = "axc", t = "ahbgdc"

**Step 1:** Preprocess `t`:
- HashMap: `{ a: [0], h: [1], b: [2], g: [3], d: [4], c: [5] }`

**Step 2:** Process `s`:
- `prevIndex = -1`
- For character `a`: Found at index 0 → Update `prevIndex = 0`
- For character `x`: Not found → Return `false`

**Final Result:** `false`

### Advanced Example with Binary Search
**Input:** s = "ace", t = "abcdeabcde"

**Step 1:** Preprocess `t`:
- HashMap: `{ a: [0, 5], b: [1, 6], c: [2, 7], d: [3, 8], e: [4, 9] }`

**Step 2:** Process `s`:
- `prevIndex = -1`
- For character `a`: Found at index 0 → Update `prevIndex = 0`
- For character `c`: Found at index 2 → Update `prevIndex = 2`
- For character `e`: Found at index 4 → Update `prevIndex = 4`

**Final Result:** `true`

## Two Sum II - Input Array Is Sorted

### Problem Statement
Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

### Examples
**Input:** numbers = [2,7,11,15], target = 9  
**Output:** [1,2]  
**Explanation:** The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

**Input:** numbers = [2,3,4], target = 6  
**Output:** [1,3]  
**Explanation:** The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

**Input:** numbers = [-1,0], target = -1  
**Output:** [1,2]  
**Explanation:** The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

### Constraints
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**.
- `-1000 <= target <= 1000`
- The tests are generated such that there is exactly one solution.

### Solution
```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        
        return new int[]{-1, -1}; // Should never be reached as per constraints
    }
}
```

### Approach
1. **Two Pointers Technique:**
   - Initialize two pointers: `left` at the start of the array and `right` at the end of the array.
   - While `left < right`:
     - Calculate `sum = numbers[left] + numbers[right]`.
     - If `sum == target`, return `[left + 1, right + 1]` as per the 1-indexed requirement.
     - If `sum < target`, move the `left` pointer one step to the right (to increase the sum).
     - If `sum > target`, move the `right` pointer one step to the left (to decrease the sum).

2. **Why Two Pointers?**
   - The array is sorted, so this method efficiently narrows the search space in `O(n)` time complexity.
   - Only constant extra space (`O(1)`) is used, meeting the requirement.

### Dry Run
**Input:** numbers = [2, 7, 11, 15], target = 9  

**Step 1:** `left = 0`, `right = 3`, `sum = 2 + 15 = 17` → `sum > target` → Move `right` to index 2.  
**Step 2:** `left = 0`, `right = 2`, `sum = 2 + 11 = 13` → `sum > target` → Move `right` to index 1.  
**Step 3:** `left = 0`, `right = 1`, `sum = 2 + 7 = 9` → Found target → Return `[1, 2]`.  

**Final Output:** `[1, 2]`

## Container With Most Water

### Problem Statement
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice that you may not slant the container.**

### Examples
**Input:** height = [1,8,6,2,5,4,8,3,7]  
**Output:** 49  
**Explanation:** The lines at index 1 (height 8) and index 8 (height 7) form the container with the maximum area (width 7 and height 7). The area = 7 * 7 = 49.

**Input:** height = [1,1]  
**Output:** 1  

### Constraints
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

---

### Java Code Implementation
```java
class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;

        while (left < right) {
            int width = right - left;
            int minHeight = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, width * minHeight);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }
}
```

---

### Approach
This problem requires finding two lines that maximize the area they enclose with the x-axis.

**Steps to Solve:**
1. **Initialize Two Pointers:**
   - Start with one pointer (`left`) at the beginning of the array and another pointer (`right`) at the end of the array.
2. **Calculate Area:**
   - Calculate the area between the two pointers: `width = right - left` and `minHeight = Math.min(height[left], height[right])`.
   - Update `maxArea` accordingly.
3. **Move the Pointer:**
   - Move the pointer pointing to the **shorter line** inward. This is because reducing the width can only improve the area if the height improves.
4. **Continue Until Pointers Meet:**
   - Repeat the process until the two pointers meet.

**Why Does This Work Efficiently?**  
- The two-pointer strategy efficiently eliminates unnecessary comparisons and ensures optimal results in `O(n)` time complexity.

---

### Dry Run
**Input:** `height = [1,8,6,2,5,4,8,3,7]`

**Step 1:** Initialize `left = 0`, `right = 8`, `maxArea = 0`  
**Step 2:** Calculate area: `min(1, 7) * (8 - 0) = 1 * 8 = 8` → Update `maxArea = 8`

**Step 3:** Move `left` → New area: `min(8, 7) * (8 - 1) = 7 * 7 = 49` → Update `maxArea = 49`

**Step 4:** Continue moving pointers until `left` meets `right`.

**Final Output:** `49`

---

### Complexity Analysis
- **Time Complexity:** `O(n)` — Each element is visited at most once.
- **Space Complexity:** `O(1)` — No extra space required beyond constant variables.

## Three Sum Problem

### Problem Statement
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that:
- `i != j`, `i != k`, and `j != k`
- `nums[i] + nums[j] + nums[k] == 0`

**Note:** The solution set must not contain duplicate triplets.

### Examples
**Input:** `nums = [-1,0,1,2,-1,-4]`

**Output:** `[[ -1, -1, 2 ], [ -1, 0, 1 ]]`

**Input:** `nums = [0,1,1]`

**Output:** `[]`

**Input:** `nums = [0,0,0]`

**Output:** `[[0, 0, 0]]`

### Constraints
- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

---

### Java Code Implementation
```java
import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums); // Step 1: Sort the array
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    
                    // Skip duplicate values for left and right pointers
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (sum < 0) {
                    left++; // Move left pointer to increase sum
                } else {
                    right--; // Move right pointer to decrease sum
                }
            }
        }
        return result;
    }
}
```

---

### Approach Explanation
1. **Sorting:**
   - Sorting simplifies handling duplicates and allows the two-pointer technique to work efficiently.
2. **Iteration:**
   - Iterate through each element `nums[i]`.
   - Skip duplicates to avoid redundant triplets.
3. **Two-pointer technique:**
   - Initialize `left` to `i + 1` and `right` to the last index.
   - Calculate the sum of `nums[i] + nums[left] + nums[right]`:
     - If the sum equals zero, add the triplet to the result.
     - If the sum is less than zero, move the `left` pointer rightward to increase the sum.
     - If the sum is greater than zero, move the `right` pointer leftward to decrease the sum.
4. **Avoid Duplicates:**
   - After finding a valid triplet, skip any repeating values to ensure unique triplets in the result.

---

### Dry Run Example
**Input:** `nums = [-1, 0, 1, 2, -1, -4]`

**Step 1:** Sorted array → `[-4, -1, -1, 0, 1, 2]`

**Step 2:** Iteration and Two-pointer approach
- **i = 0:** nums[0] = -4 → No valid triplet
- **i = 1:** nums[1] = -1 → Found triplet `[-1, -1, 2]`
- **i = 2:** nums[2] = -1 (duplicate, skip)
- **i = 3:** nums[3] = 0 → Found triplet `[-1, 0, 1]`

**Output:** `[[ -1, -1, 2 ], [ -1, 0, 1 ]]`

---

### Complexity Analysis
- **Time Complexity:** `O(n^2)` — Sorting takes `O(n log n)`, and iterating with the two-pointer approach takes `O(n^2)`.
- **Space Complexity:** `O(log n)` — For sorting in Java (quick sort's space complexity) plus `O(k)` for the result list.

## Minimum Size Subarray Sum

### Problem Statement
Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return 0 instead.

### Examples
**Example 1:**
- **Input:** target = 7, nums = [2,3,1,2,4,3]
- **Output:** 2
- **Explanation:** The subarray [4,3] has the minimal length under the problem constraint.

**Example 2:**
- **Input:** target = 4, nums = [1,4,4]
- **Output:** 1

**Example 3:**
- **Input:** target = 11, nums = [1,1,1,1,1,1,1,1]
- **Output:** 0

### Constraints
- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

### Solution - Sliding Window (O(n))
This solution uses the sliding window technique to efficiently find the minimal subarray.

### Java Code
```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0;
        int minLength = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum >= target) {
                minLength = Math.min(minLength, right - left + 1);
                sum -= nums[left++];
            }
        }

        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
```

### Approach
1. **Initialize Variables:**
   - `left` pointer at the start.
   - `sum` to track the current window sum.
   - `minLength` to store the minimum subarray length found.
2. **Traverse the Array:**
   - Iterate `right` from 0 to `nums.length - 1`.
   - Add `nums[right]` to `sum`.
3. **Check Condition:**
   - While `sum >= target`, update `minLength` to track the smallest window.
   - Shrink the window by incrementing `left` and subtracting `nums[left]` from `sum`.
4. **Final Check:**
   - If no valid subarray was found, return 0.
   - Otherwise, return `minLength`.

### Dry Run
**Input:** target = 7, nums = [2,3,1,2,4,3]

| Left | Right | Sum | MinLength | Window      |
|-------|--------|------|--------------|-----------------|
| 0     | 0      | 2    | MAX          | [2]              |
| 0     | 1      | 5    | MAX          | [2, 3]           |
| 0     | 2      | 6    | MAX          | [2, 3, 1]        |
| 0     | 3      | 8    | 4            | [2, 3, 1, 2]     |
| 1     | 3      | 6    | 4            | [3, 1, 2]        |
| 1     | 4      | 10   | 4            | [3, 1, 2, 4]     |
| 2     | 4      | 9    | 3            | [1, 2, 4]        |
| 3     | 4      | 7    | 2            | [2, 4]           |

**Final Output:** 2

### Follow-up Solution - Binary Search (O(n log n))
This method leverages prefix sums with binary search for improved efficiency.

### Java Code for O(n log n) Solution
```java
import java.util.*;

class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int[] prefixSum = new int[n + 1];
        
        for (int i = 1; i <= n; i++) {
            prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
        }

        int minLength = Integer.MAX_VALUE;
        
        for (int i = 1; i <= n; i++) {
            int targetSum = target + prefixSum[i - 1];
            int bound = Arrays.binarySearch(prefixSum, targetSum);
            if (bound < 0) bound = -bound - 1;
            if (bound <= n) {
                minLength = Math.min(minLength, bound - (i - 1));
            }
        }

        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
```

### Approach for O(n log n)
1. **Prefix Sum Array:** Build a prefix sum array where `prefixSum[i]` represents the sum of elements from index 0 to `i-1`.
2. **Binary Search:** For each prefix sum, use `Arrays.binarySearch()` to locate the required subarray sum efficiently.
3. **Track Minimum Length:** Update `minLength` whenever a valid subarray is found.

### Complexity Analysis
- **Sliding Window Time Complexity:** `O(n)`
- **Binary Search Time Complexity:** `O(n log n)`
- **Space Complexity:** `O(1)` for the sliding window solution and `O(n)` for the binary search solution.

## Longest Substring Without Repeating Characters

### Problem Statement
Given a string `s`, find the length of the longest substring without repeating characters.

### Examples
**Input:** s = "abcabcbb"

**Output:** `3`

**Explanation:** The answer is "abc", with the length of 3.

---
**Input:** s = "bbbbb"

**Output:** `1`

**Explanation:** The answer is "b", with the length of 1.

---
**Input:** s = "pwwkew"

**Output:** `3`

**Explanation:** The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence, not a substring.

### Constraints
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols, and spaces.

---

### Solution (Sliding Window Approach)
```java
import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLength = 0;
        int left = 0;
        Map<Character, Integer> map = new HashMap<>();

        for (int right = 0; right < s.length(); right++) {
            char currentChar = s.charAt(right);
            if (map.containsKey(currentChar)) {
                // Move left pointer to ensure no duplicates in window
                left = Math.max(map.get(currentChar) + 1, left);
            }
            map.put(currentChar, right); // Update character's latest position
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}
```

### Approach Explanation
- **Initialize Variables:**
  - `maxLength` stores the maximum length of a valid substring.
  - `left` is the starting point of the window.
  - A `HashMap` stores each character's most recent position.

- **Iterate Through String:**
  - For each character `currentChar`, check if it exists in the map.
  - If it does, move the `left` pointer to the right of the previous occurrence to avoid duplicates.
  - Update the map with the current character's position.
  - Update `maxLength` by calculating the window size: `right - left + 1`.

- **Return `maxLength`** at the end.

---

### Dry Run
**Input:** s = "abcabcbb"

| Step | Left | Right | Current Char | Map (Character : Index) | maxLength |
|------|-------|--------|----------------|-------------------------|------------|
| 1    | 0     | 0      | a              | {a: 0}                  | 1          |
| 2    | 0     | 1      | b              | {a: 0, b: 1}            | 2          |
| 3    | 0     | 2      | c              | {a: 0, b: 1, c: 2}      | 3          |
| 4    | 1     | 3      | a              | {a: 3, b: 1, c: 2}      | 3          |
| 5    | 2     | 4      | b              | {a: 3, b: 4, c: 2}      | 3          |
| 6    | 3     | 5      | c              | {a: 3, b: 4, c: 5}      | 3          |
| 7    | 5     | 6      | b              | {a: 3, b: 6, c: 5}      | 3          |
| 8    | 7     | 7      | b              | {a: 3, b: 7, c: 5}      | 3          |

**Final Output:** `3`

---

### Complexity Analysis
- **Time Complexity:** `O(n)` — Each character is visited at most twice.
- **Space Complexity:** `O(min(n, m))` — Where `n` is the string length and `m` is the character set size (maximum 128 for ASCII characters).

## Substring with Concatenation of All Words

### Problem Statement
Given a string `s` and an array of strings `words`. All the strings in `words` are of the same length.

A **concatenated string** is a string that exactly contains all the strings of any permutation of `words` concatenated.

For example, if `words = ["ab","cd","ef"]`, then `"abcdef"`, `"abefcd"`, `"cdabef"`, `"cdefab"`, `"efabcd"`, and `"efcdab"` are all concatenated strings. `"acdbef"` is not a concatenated string because it is not the concatenation of any permutation of `words`.

**Return** an array of the starting indices of all the concatenated substrings in `s`. You can return the answer in any order.

### Examples
**Input:** s = "barfoothefoobarman", words = ["foo","bar"]  
**Output:** `[0, 9]`

**Input:** s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]  
**Output:** `[]`

**Input:** s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]  
**Output:** `[6, 9, 12]`

### Constraints
- `1 <= s.length <= 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `s` and `words[i]` consist of lowercase English letters.

---

### Java Code Implementation
```java
import java.util.*;

class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> result = new ArrayList<>();
        if (s == null || s.length() == 0 || words == null || words.length == 0) {
            return result;
        }

        int wordLength = words[0].length();
        int totalWordsLength = wordLength * words.length;
        Map<String, Integer> wordCount = new HashMap<>();

        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        for (int i = 0; i <= s.length() - totalWordsLength; i++) {
            String substring = s.substring(i, i + totalWordsLength);
            if (isValid(substring, wordLength, wordCount)) {
                result.add(i);
            }
        }

        return result;
    }

    private boolean isValid(String substring, int wordLength, Map<String, Integer> wordCount) {
        Map<String, Integer> seen = new HashMap<>();
        for (int i = 0; i < substring.length(); i += wordLength) {
            String word = substring.substring(i, i + wordLength);
            seen.put(word, seen.getOrDefault(word, 0) + 1);
        }
        return seen.equals(wordCount);
    }
}
```

---

### Approach
1. **Input Validation:**
   - If `s` or `words` is empty, return an empty list.
2. **Initial Setup:**
   - Calculate `wordLength` (length of a word in `words`).
   - Compute `totalWordsLength` as `wordLength * words.length`.
   - Store the frequency of each word in `words` using a HashMap (`wordCount`).
3. **Sliding Window Technique:**
   - Iterate through each possible starting index in `s` where a valid substring could begin.
   - Extract the substring of length `totalWordsLength`.
4. **Validation Check:**
   - In the `isValid()` method, create a new HashMap (`seen`) that counts the words in the extracted substring.
   - If `seen` matches `wordCount`, add the starting index to the result.
5. **Return the Result:** Return the list of starting indices.

---

### Dry Run
**Input:** `s = "barfoofoobarthefoobarman"`, `words = ["bar","foo","the"]`

**Step 1:** Frequency Map for `words`:  
`{ "bar": 1, "foo": 1, "the": 1 }`

**Step 2:** Iterate through possible starting points:
- **Index 6:** Substring = "foobarthe" → Valid ✅ Add 6
- **Index 9:** Substring = "barthefoo" → Valid ✅ Add 9
- **Index 12:** Substring = "thefoobar" → Valid ✅ Add 12

**Output:** `[6, 9, 12]`

---

### Complexity Analysis
- **Time Complexity:** `O(n * wordLength)` — For each possible starting index, the substring is checked in constant time.
- **Space Complexity:** `O(totalWordsLength)` — For the `wordCount` and `seen` HashMaps.



