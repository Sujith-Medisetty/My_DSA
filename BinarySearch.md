# Binary Search - Study Notes

## Problem Statement
Given a **sorted array** of integers and a target value, determine the index of the target value in the array. If the target is not present, return **-1**.

## Approach
Binary Search works by repeatedly dividing the search interval in half.

1. Start with two pointers: `left = 0` and `right = array.length - 1`.
2. Find the middle index: `mid = left + (right - left) / 2`.
3. If `array[mid] == target`: return `mid`.
4. If `array[mid] < target`: search in the right half (`left = mid + 1`).
5. If `array[mid] > target`: search in the left half (`right = mid - 1`).
6. Repeat until `left > right`.

## Java Code
```java
public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1; // target not found
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11};
        int target = 7;
        int result = binarySearch(nums, target);
        System.out.println("Index of target: " + result);
    }
}
```

## Dry Run Example
### Input:
```
arr = [1, 3, 5, 7, 9, 11]
target = 7
```

### Steps:
1. left = 0, right = 5 ➡️ mid = 2 ➡️ arr[2] = 5 < 7 ➡️ search right (left = 3)
2. left = 3, right = 5 ➡️ mid = 4 ➡️ arr[4] = 9 > 7 ➡️ search left (right = 3)
3. left = 3, right = 3 ➡️ mid = 3 ➡️ arr[3] = 7 == 7 ➡️ **Found at index 3**

### Output:
```
Index of target: 3
```

## Notes
- Works on **sorted arrays**.
- Time complexity: **O(log n)**
- Space complexity: **O(1)**
- Useful for searching efficiently in large datasets.

---

# Lower Bound and Upper Bound Implementation

## Problem Statement

Given a sorted array and a target value, implement functions to find the lower bound and upper bound of the target.

- **Lower Bound:** The index of the first element that is not less than the target.
- **Upper Bound:** The index of the first element that is greater than the target.

## Java Code Implementation

```java
import java.util.*;

public class Bounds {
    
    public static int lowerBound(int[] arr, int target) {
        int left = 0, right = arr.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static int upperBound(int[] arr, int target) {
        int left = 0, right = arr.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] <= target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 4, 4, 5, 6};
        int target = 4;
        
        System.out.println("Lower Bound of " + target + " is at index: " + lowerBound(arr, target));
        System.out.println("Upper Bound of " + target + " is at index: " + upperBound(arr, target));
    }
}
```

## Approach

1. **Lower Bound:**
   - Use binary search to locate the first position where `arr[mid] >= target`.
   - If `arr[mid] < target`, move the left pointer.
   - Otherwise, move the right pointer.
   - Return the left pointer as the lower bound.

2. **Upper Bound:**
   - Use binary search to locate the first position where `arr[mid] > target`.
   - If `arr[mid] <= target`, move the left pointer.
   - Otherwise, move the right pointer.
   - Return the left pointer as the upper bound.

## Example & Dry Run

**Example:**
```plaintext
Input: arr = [1, 2, 2, 4, 4, 5, 6], target = 4
Output: Lower Bound = 3, Upper Bound = 5
```

**Dry Run for Lower Bound (target = 4):**
```plaintext
Initial: left = 0, right = 7
1st Iteration: mid = 3 (arr[3] = 4), move right -> right = 3
2nd Iteration: mid = 2 (arr[2] = 2), move left -> left = 3
End: left = 3 (lower bound)
```

**Dry Run for Upper Bound (target = 4):**
```plaintext
Initial: left = 0, right = 7
1st Iteration: mid = 3 (arr[3] = 4), move left -> left = 4
2nd Iteration: mid = 5 (arr[5] = 5), move right -> right = 5
End: left = 5 (upper bound)
```

## Complexity Analysis
- **Time Complexity:** `O(log n)` for both lower and upper bound (binary search based).
- **Space Complexity:** `O(1)` as no extra space is used.

# First and Last Occurrences in Sorted Array

## Problem Statement

Given a sorted array and a target value, implement functions to find the first and last occurrences of the target.

- **First Occurrence:** The index of the first appearance of the target in the array.
- **Last Occurrence:** The index of the last appearance of the target in the array.

## Java Code Implementation

```java
import java.util.*;

public class FirstLastOccurrences {
    
    public static int firstOccurrence(int[] arr, int target) {
        int left = 0, right = arr.length - 1, result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                result = mid;
                right = mid - 1; // Move left to find first occurrence
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    public static int lastOccurrence(int[] arr, int target) {
        int left = 0, right = arr.length - 1, result = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                result = mid;
                left = mid + 1; // Move right to find last occurrence
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 4, 4, 4, 5, 6};
        int target = 4;
        
        System.out.println("First Occurrence of " + target + " is at index: " + firstOccurrence(arr, target));
        System.out.println("Last Occurrence of " + target + " is at index: " + lastOccurrence(arr, target));
    }
}
```

## Approach

1. **First Occurrence:**
   - Use binary search to locate the first position where `arr[mid] == target`.
   - If found, store `mid` in `result` and continue searching in the left half.
   - Return `result`.

2. **Last Occurrence:**
   - Use binary search to locate the last position where `arr[mid] == target`.
   - If found, store `mid` in `result` and continue searching in the right half.
   - Return `result`.

## Example & Dry Run

**Example:**
```plaintext
Input: arr = [1, 2, 2, 4, 4, 4, 5, 6], target = 4
Output: First Occurrence = 3, Last Occurrence = 5
```

**Dry Run for First Occurrence (target = 4):**
```plaintext
Initial: left = 0, right = 7
1st Iteration: mid = 3 (arr[3] = 4), store result = 3, move right -> right = 2
End: result = 3 (first occurrence)
```

**Dry Run for Last Occurrence (target = 4):**
```plaintext
Initial: left = 0, right = 7
1st Iteration: mid = 3 (arr[3] = 4), store result = 3, move left -> left = 4
2nd Iteration: mid = 5 (arr[5] = 4), store result = 5, move left -> left = 6
End: result = 5 (last occurrence)
```

## Complexity Analysis
- **Time Complexity:** `O(log n)` for both first and last occurrence (binary search based).
- **Space Complexity:** `O(1)` as no extra space is used.

# Search Element in Rotated Sorted Array - I

## Problem Statement

Given a rotated sorted array and a target value, implement a function to find the index of the target.

- If the target exists, return its index.
- If the target does not exist, return `-1`.

## Java Code Implementation

```java
import java.util.*;

public class SearchRotatedArray {
    
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            }
            
            // Determine which half is sorted
            if (arr[left] <= arr[mid]) { // Left half is sorted
                if (arr[left] <= target && target < arr[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else { // Right half is sorted
                if (arr[mid] < target && target <= arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1; // Target not found
    }

    public static void main(String[] args) {
        int[] arr = {4, 5, 6, 7, 0, 1, 2};
        int target = 0;
        
        System.out.println("Element " + target + " is at index: " + search(arr, target));
    }
}
```

## Approach

1. **Binary Search with Rotation Check:**
   - Find `mid` and check if it's the target.
   - Determine which half of the array is sorted.
   - If the left half is sorted, check if the target lies in that range.
   - Otherwise, search in the right half.
   - Continue until the target is found or the search space is exhausted.

## Example & Dry Run

**Example:**
```plaintext
Input: arr = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: Index = 4
```

**Dry Run for target = 0:**
```plaintext
Initial: left = 0, right = 6
1st Iteration: mid = 3 (arr[3] = 7), left half sorted, target not in range, move left -> left = 4
2nd Iteration: mid = 5 (arr[5] = 1), right half sorted, target in range, move right -> right = 4
3rd Iteration: mid = 4 (arr[4] = 0), target found at index 4
```

## Complexity Analysis
- **Time Complexity:** `O(log n)` due to binary search.
- **Space Complexity:** `O(1)` as no extra space is used.

# Search Element in Rotated Sorted Array - II

## Problem Statement

Given a rotated sorted array that may contain duplicate elements, implement a function to determine whether a target value exists in the array.

## Java Code Implementation

```java
import java.util.*;

public class SearchRotatedArray {
    
    public static boolean search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return true;
            }
            
            // Handle duplicates: shrink the search space
            if (arr[left] == arr[mid] && arr[mid] == arr[right]) {
                left++;
                right--;
                continue;
            }
            
            // Left half is sorted
            if (arr[left] <= arr[mid]) {
                if (arr[left] <= target && target < arr[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } 
            // Right half is sorted
            else {
                if (arr[mid] < target && target <= arr[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] arr = {4, 5, 6, 7, 0, 1, 2, 4, 4};
        int target = 0;
        
        System.out.println("Element " + target + " found: " + search(arr, target));
    }
}
```

## Approach

1. Use binary search with an additional check for duplicates.
2. If `arr[mid]` matches the target, return `true`.
3. If `arr[left]`, `arr[mid]`, and `arr[right]` are equal, move both pointers to shrink the search space.
4. If the left half is sorted:
   - Check if the target is within this range; if yes, move `right`, else move `left`.
5. If the right half is sorted:
   - Check if the target is within this range; if yes, move `left`, else move `right`.
6. Repeat until the target is found or the search space is exhausted.

## Example & Dry Run

**Example:**
```plaintext
Input: arr = [4, 5, 6, 7, 0, 1, 2, 4, 4], target = 0
Output: true
```

**Dry Run (target = 0):**
```plaintext
Initial: left = 0, right = 8
1st Iteration: mid = 4 (arr[4] = 0), found target -> return true
```

## Complexity Analysis
- **Time Complexity:** `O(log n)` on average, `O(n)` in worst case (when duplicates cause linear scan).
- **Space Complexity:** `O(1)` as no extra space is used.

# Minimum in Rotated Sorted Array

## Problem Statement
Given a rotated sorted array of distinct integers, find the minimum element in the array.

The array was originally sorted in ascending order and then rotated at some pivot.

### Constraints:
- The array contains **distinct** integers.
- The array is **rotated at some pivot**.
- The solution should run in **O(log n) time complexity**.

### Example:
#### Example 1:
**Input:**
```
nums = [3, 4, 5, 1, 2]
```
**Output:**
```
1
```

#### Example 2:
**Input:**
```
nums = [4, 5, 6, 7, 0, 1, 2]
```
**Output:**
```
0
```

#### Example 3:
**Input:**
```
nums = [11, 13, 15, 17]
```
**Output:**
```
11
```

---

## Approach
We can solve this problem using **Binary Search** since the array is rotated and partially sorted. The idea is:

1. **Initialize Pointers:**
   - `left = 0`, `right = nums.length - 1`.
2. **Check If Already Sorted:**
   - If `nums[left] < nums[right]`, the array is already sorted, and `nums[left]` is the minimum.
3. **Binary Search:**
   - Find `mid = left + (right - left) / 2`.
   - If `nums[mid] > nums[right]`, the minimum must be in the **right half**, so move `left = mid + 1`.
   - Else, the minimum is in the **left half**, so move `right = mid`.
4. **Return `nums[left]`** as the minimum value.

### **Time Complexity:**
- **O(log n)** due to binary search.

### **Space Complexity:**
- **O(1)** as no extra space is used.

---

## Java Code Implementation
```java
public class MinInRotatedSortedArray {
    public static int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 4, 5, 1, 2};
        System.out.println(findMin(nums)); // Output: 1
    }
}
```

---

## Dry Run
### Example: `nums = [4, 5, 6, 7, 0, 1, 2]`

| Left | Mid | Right | nums[mid] | nums[right] | Action |
|------|-----|-------|-----------|-------------|--------|
| 0    | 3   | 6     | 7         | 2           | Move left to `mid + 1` (4) |
| 4    | 5   | 6     | 1         | 2           | Move right to `mid` (5) |
| 4    | 4   | 5     | 0         | 1           | Move right to `mid` (4) |

**Final Answer:** `nums[left] = 0`.

---

This approach efficiently finds the minimum element in a rotated sorted array in **O(log n) time**.

# Find the Number of Times a Sorted Array Has Been Rotated

## Problem Statement
Given a rotated sorted array of distinct integers, determine the number of times the array has been rotated. The rotation count is equal to the index of the minimum element.

### Constraints:
- The array contains **distinct** integers.
- The array was **originally sorted in ascending order** and then rotated.
- The solution should run in **O(log n) time complexity**.

### Example:
#### Example 1:
**Input:**
```
nums = [3, 4, 5, 1, 2]
```
**Output:**
```
3
```

#### Example 2:
**Input:**
```
nums = [4, 5, 6, 7, 0, 1, 2]
```
**Output:**
```
4
```

#### Example 3:
**Input:**
```
nums = [1, 2, 3, 4, 5]
```
**Output:**
```
0 (Not rotated)
```

---

## Approach
Since the array is rotated, the minimum element will indicate the number of rotations. The index of the minimum element gives us the rotation count.

### **Steps:**
1. **Initialize Pointers:**
   - `left = 0`, `right = nums.length - 1`.
2. **Check If Already Sorted:**
   - If `nums[left] < nums[right]`, return `0` (array is not rotated).
3. **Binary Search:**
   - Find `mid = left + (right - left) / 2`.
   - If `nums[mid] > nums[right]`, move `left = mid + 1`.
   - Else, move `right = mid`.
4. **Return `left`**, which is the index of the minimum element.

### **Time Complexity:**
- **O(log n)** due to binary search.

### **Space Complexity:**
- **O(1)** as no extra space is used.

---

## Java Code Implementation
```java
public class RotationCountInSortedArray {
    public static int findRotationCount(int[] nums) {
        int left = 0, right = nums.length - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left; // Index of minimum element is the rotation count
    }
    
    public static void main(String[] args) {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        System.out.println(findRotationCount(nums)); // Output: 4
    }
}
```

---

## Dry Run
### Example: `nums = [4, 5, 6, 7, 0, 1, 2]`

| Left | Mid | Right | nums[mid] | nums[right] | Action |
|------|-----|-------|-----------|-------------|--------|
| 0    | 3   | 6     | 7         | 2           | Move left to `mid + 1` (4) |
| 4    | 5   | 6     | 1         | 2           | Move right to `mid` (5) |
| 4    | 4   | 5     | 0         | 1           | Move right to `mid` (4) |

**Final Answer:** `left = 4`, so the array has been rotated **4 times**.

---

This approach efficiently finds the number of rotations in **O(log n) time**.

