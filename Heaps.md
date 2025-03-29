# Kth Largest Element in an Array

## Problem Statement
Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.

**Note:** It is the `k`th largest element in the sorted order, not the `k`th distinct element.

### Example 1
**Input:** `nums = [3,2,1,5,6,4]`, `k = 2`
**Output:** `5`

### Example 2
**Input:** `nums = [3,2,3,1,2,4,5,5,6]`, `k = 4`
**Output:** `4`

### Constraints
- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Approach
### Using Min-Heap (Optimal Solution)
1. **Initialize a Min-Heap**: Create a priority queue (Min-Heap) to track the top `k` elements.
2. **Iterate Through the Array**: For each element:
   - Add the element to the heap.
   - If the heap size exceeds `k`, remove the smallest element (this ensures the heap keeps the `k` largest elements).
3. **Result**: The top element in the Min-Heap is the `k`th largest element.

**Time Complexity:** `O(n log k)`

**Space Complexity:** `O(k)`

---

## Code Implementation
```java
import java.util.PriorityQueue;

public class KthLargestElement {
    public int findKthLargest(int[] nums, int k) {
        // Min-Heap to store the top k largest elements
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        // Add elements to the heap
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();  // Remove the smallest element
            }
        }
        
        // The top element is the kth largest
        return minHeap.peek();
    }

    public static void main(String[] args) {
        KthLargestElement solution = new KthLargestElement();
        int[] nums1 = {3, 2, 1, 5, 6, 4};
        System.out.println(solution.findKthLargest(nums1, 2)); // Output: 5

        int[] nums2 = {3, 2, 3, 1, 2, 4, 5, 5, 6};
        System.out.println(solution.findKthLargest(nums2, 4)); // Output: 4
    }
}
```

---

## Dry Run
**Input:** `nums = [3,2,1,5,6,4]`, `k = 2`

| Step | Min-Heap | Comments |
|------|-----------|-----------|
| 1    | [3]        | Add `3` |
| 2    | [2, 3]     | Add `2` |
| 3    | [1, 3, 2]  | Add `1` |
| 4    | [3, 5]     | Add `5`, remove `1` |
| 5    | [5, 6]     | Add `6`, remove `2` |
| 6    | [5, 6]     | Add `4`, remove `3` |

**Result:** The top element `5` is the 2nd largest element.

---

## Key Insights
✅ Efficient for large arrays (`O(n log k)` complexity).
✅ Optimal space usage with a Min-Heap (`O(k)`).
✅ Avoids sorting the entire array, improving performance.

### Problem Statement
Given `k` maximum projects you can complete, initial capital `w`, arrays `profits[]` and `capital[]`, maximize the final capital by strategically picking projects.

### Example 1
**Input:**  
k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]  
**Output:** 4

**Example 2**
**Input:**
k = 3, w = 0, profits = [1, 2, 3], capital = [0, 1, 2]  
**Output:** 6

---

### Approach
1. **Combine Profits and Capital:** Create pairs of `[capital[i], profit[i]]`.
2. **Sort Projects by Capital:** Sort the projects based on the capital required in ascending order.
3. **Max Heap for Profits:** Use a max heap to prioritize the most profitable projects that can be started with the available capital.
4. **Iterate k Times:** Each iteration:
   - Add all feasible projects (projects that require capital ≤ current capital) to the max heap.
   - Pick the project with the highest profit and add its profit to your current capital.

---

### Code Implementation
```java
import java.util.*;

public class MaxCapital {
    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        // Step 1: Combine projects with their capital requirement
        int n = profits.length;
        int[][] projects = new int[n][2];
        for (int i = 0; i < n; i++) {
            projects[i][0] = capital[i];
            projects[i][1] = profits[i];
        }

        // Step 2: Sort projects based on capital requirements
        Arrays.sort(projects, (a, b) -> a[0] - b[0]);

        // Step 3: Max Heap to track highest profits
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

        int i = 0;
        while (k > 0) {
            // Add feasible projects to the maxHeap
            while (i < n && projects[i][0] <= w) {
                maxHeap.add(projects[i][1]);
                i++;
            }

            // If no projects are available, break
            if (maxHeap.isEmpty()) break;

            // Step 4: Pick the most profitable project
            w += maxHeap.poll();
            k--;
        }
        return w;
    }

    public static void main(String[] args) {
        MaxCapital mc = new MaxCapital();
        int[] profits = {1, 2, 3};
        int[] capital = {0, 1, 1};
        System.out.println("Final Maximized Capital: " + mc.findMaximizedCapital(2, 0, profits, capital));
    }
}
```

---

### Dry Run
**Input:**  
k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]

**Step 1:** Combine and sort by capital:  
`projects = [[0, 1], [1, 2], [1, 3]]`

**Step 2:** Initial capital = 0

**Iteration 1:**
- Feasible projects: `[1]` (profit 1)  
- Pick profit = 1 → New capital = `0 + 1 = 1`

**Iteration 2:**
- Feasible projects: `[2, 3]`  
- Pick the highest profit = 3 → New capital = `1 + 3 = 4`

**Output:** `4`

---

### Key Insights
✅ Efficient O(n log n) complexity using sorting and heaps.  
✅ Ensures maximum profit in each step.  
✅ Handles large constraints effectively.  

## Problem Statement
Given two integer arrays `nums1` and `nums2` sorted in non-decreasing order and an integer `k`, return the `k` pairs with the smallest sums.

### Example 1
**Input:**
```
nums1 = [1,7,11], nums2 = [2,4,6], k = 3
```
**Output:**
```
[[1,2],[1,4],[1,6]]
```

### Example 2
**Input:**
```
nums1 = [1,1,2], nums2 = [1,2,3], k = 2
```
**Output:**
```
[[1,1],[1,1]]
```

---

## Approach
### Step 1: Use a Min-Heap (Priority Queue)
- Since the arrays are sorted, we know the smallest possible pair starts with `nums1[0]` and `nums2[0]`.
- Use a **Min-Heap** to track pairs with the smallest sums efficiently.

### Step 2: Add Initial Elements to the Heap
- Add pairs starting with `nums1[0]` and each element from `nums2` into the heap.
- Track their indices to extend potential pairs later.

### Step 3: Extract K Smallest Pairs
- While extracting elements from the heap, if a pair `(nums1[i], nums2[j])` is chosen, push the next pair in sequence: 
  - `(nums1[i + 1], nums2[j])` (if possible)

### Step 4: Return the Result
- Continue until `k` pairs are collected.

---

## Code Implementation
```java
import java.util.*;

class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<List<Integer>> result = new ArrayList<>();
        if (nums1.length == 0 || nums2.length == 0 || k == 0) return result;

        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> (nums1[a[0]] + nums2[a[1]]) - (nums1[b[0]] + nums2[b[1]]));

        // Step 2: Initialize the heap with nums1[0] paired with all nums2 elements
        for (int i = 0; i < Math.min(nums1.length, k); i++) {
            minHeap.offer(new int[]{i, 0}); // Track the indices
        }

        // Step 3: Extract pairs with smallest sums
        while (!minHeap.isEmpty() && k-- > 0) {
            int[] current = minHeap.poll();
            int i = current[0], j = current[1];
            result.add(Arrays.asList(nums1[i], nums2[j]));

            // Step 4: Add the next potential pair
            if (j + 1 < nums2.length) {
                minHeap.offer(new int[]{i, j + 1});
            }
        }

        return result;
    }
}
```

---

## Dry Run
**Input:** `nums1 = [1,7,11], nums2 = [2,4,6], k = 3`

### Step 1: Initialize the Heap
```
Heap: [(1, 2), (7, 2), (11, 2)]
```

### Step 2: Extract the Minimum and Add Next Element
```
Result: [[1, 2]]
Heap: [(1, 4), (7, 2), (11, 2)]
```
```
Result: [[1, 2], [1, 4]]
Heap: [(1, 6), (7, 2), (11, 2)]
```
```
Result: [[1, 2], [1, 4], [1, 6]]
```

**Final Output:** `[[1, 2], [1, 4], [1, 6]]`

---

## Key Insights
✅ Efficient solution using **Min-Heap** for optimal complexity.  
✅ Handles large constraints effectively.  
✅ Ensures correct order by exploiting sorted property of the input arrays.

## Problem Statement
Design a data structure that efficiently finds the **median** from a data stream.

### Operations:
- **`addNum(int num)`**: Adds the integer `num` to the data structure.
- **`findMedian()`**: Returns the median of all elements so far. If the size is even, return the mean of the two middle values.

### Example 1
**Input:**
```
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
```
**Output:**
```
[null, null, null, 1.5, null, 2.0]
```

---

## Approach
To efficiently find the median in O(log n) for insertion and O(1) for retrieval:

### Step 1: Use Two Heaps (Max Heap & Min Heap)
- **Max Heap:** Stores the **smaller half** of the data.
- **Min Heap:** Stores the **larger half** of the data.

### Step 2: Adding a Number
- Add the new number to the **Max Heap** first.
- Transfer the **maximum** element from Max Heap to Min Heap to maintain order.
- If the Min Heap exceeds the Max Heap in size, transfer the **minimum** element back to the Max Heap.

### Step 3: Finding the Median
- If the total number of elements is odd, the median is the top of the **Max Heap**.
- If the total number of elements is even, the median is the **average** of the tops of both heaps.

---

## Code Implementation
```java
import java.util.*;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Lower half (max heap)
    private PriorityQueue<Integer> minHeap; // Upper half (min heap)

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());

        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        } else {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}

// Example Usage
public class Main {
    public static void main(String[] args) {
        MedianFinder medianFinder = new MedianFinder();
        medianFinder.addNum(1);
        medianFinder.addNum(2);
        System.out.println(medianFinder.findMedian()); // 1.5
        medianFinder.addNum(3);
        System.out.println(medianFinder.findMedian()); // 2.0
    }
}
```

---

## Dry Run
**Input:** `[1, 2, 3]`

| Step | Max Heap (Lower Half) | Min Heap (Upper Half) | Median |
|------|-----------------------|------------------------|---------|
| Init  | []                    | []                     | -       |
| Add 1 | [1]                   | []                     | 1       |
| Add 2 | [1]                   | [2]                    | 1.5     |
| Add 3 | [2, 1]                | [3]                    | 2       |

---

## Complexity Analysis
- **Time Complexity for `addNum()`**: `O(log n)` (due to heap insertion)
- **Time Complexity for `findMedian()`**: `O(1)` (direct heap access)
- **Space Complexity**: `O(n)` (for both heaps)

