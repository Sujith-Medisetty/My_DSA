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

