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

