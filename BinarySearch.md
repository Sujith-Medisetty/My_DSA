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

# Single Element in a Sorted Array

## Problem Statement
You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.

Your solution should run in **O(log n)** time and use **O(1)** space.

### Example
#### Input:
```plaintext
nums = [1,1,2,2,3,4,4,5,5]
```
#### Output:
```plaintext
3
```

---

## Approach
Since the array is sorted and every element appears twice except for one element, we can leverage binary search to find the unique element efficiently.

### **Binary Search Approach**
1. Use binary search with left (`l`) and right (`r`) pointers.
2. Find the middle index `mid`.
3. If `mid` is even, check if `nums[mid] == nums[mid + 1]`. If true, the single element is in the right half.
4. If `mid` is odd, check if `nums[mid] == nums[mid - 1]`. If true, the single element is in the right half.
5. Otherwise, search in the left half.
6. Continue until `l` meets `r`, which will be the single element.

### **Time Complexity:**
- Since we are halving the search space each time, the time complexity is **O(log n)**.
- The space complexity is **O(1)** as we use only constant extra space.

---

## Java Code Implementation
```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (mid % 2 == 1) mid--; // Ensure mid is even
            if (nums[mid] == nums[mid + 1]) {
                l = mid + 2;
            } else {
                r = mid;
            }
        }
        return nums[l];
    }
}
```

---

## Dry Run
### Input:
```plaintext
nums = [1,1,2,2,3,4,4,5,5]
```

### Iteration 1:
| l | r | mid | nums[mid] | nums[mid+1] | Action |
|---|---|----|----------|------------|--------|
| 0 | 8 | 4  | 3        | 4          | Search left |

### Iteration 2:
| l | r | mid | nums[mid] | nums[mid+1] | Action |
|---|---|----|----------|------------|--------|
| 0 | 4 | 2  | 2        | 2          | Search right |

### Iteration 3:
| l | r | mid | nums[mid] | nums[mid+1] | Action |
|---|---|----|----------|------------|--------|
| 4 | 4 | 4  | 3        | -          | Found |

**Output:** `3`

# Find Peak Element

## Problem Statement
Given an array `nums`, find a **peak element** and return its index.
A peak element is an element that is strictly greater than its neighbors.

You may assume that `nums[-1] = -∞` and `nums[n] = -∞`, meaning that the boundaries act as negative infinity.

Your solution must run in **O(log n)** time.

### Example
#### Input:
```plaintext
nums = [1,2,3,1]
```
#### Output:
```plaintext
2
```
#### Explanation:
`nums[2] = 3` is a peak element since `nums[1] < nums[2] > nums[3]`.

---

## Approach
Since we need to find the peak in **O(log n)** time, we use a **Binary Search Approach**:

1. Initialize `left = 0` and `right = nums.length - 1`.
2. Find the middle index `mid`.
3. If `nums[mid] > nums[mid + 1]`, then a peak lies in the left half (including `mid`). Set `right = mid`.
4. Otherwise, the peak lies in the right half. Set `left = mid + 1`.
5. Continue until `left == right`, which will be the peak index.

### **Time Complexity:**
- The time complexity is **O(log n)** because we divide the array in half each step.
- The space complexity is **O(1)** since no extra space is used.

---

## Java Code Implementation
```java
class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
}
```

---

## Dry Run
### Input:
```plaintext
nums = [1,2,3,1]
```

### Iteration 1:
| left | right | mid | nums[mid] | nums[mid+1] | Action |
|------|------|----|----------|------------|--------|
| 0    | 3    | 1  | 2        | 3          | Search right |

### Iteration 2:
| left | right | mid | nums[mid] | nums[mid+1] | Action |
|------|------|----|----------|------------|--------|
| 2    | 3    | 2  | 3        | 1          | Search left |

### Iteration 3:
| left | right | mid | nums[mid] | Action |
|------|------|----|----------|--------|
| 2    | 2    | 2  | 3        | Found |

**Output:** `2`

# Finding Square Root Using Binary Search

## Problem Statement
Given a non-negative integer `x`, compute and return the square root of `x`.
Since the return type is an integer, the decimal digits are truncated, and only the integer part is returned.

Your solution must run in **O(log x)** time.

### Example
#### Input:
```plaintext
x = 8
```
#### Output:
```plaintext
2
```
#### Explanation:
The square root of `8` is approximately `2.828`, so the integer part is `2`.

---

## Approach
Since we need an efficient **O(log x)** solution, we use **Binary Search**:

1. Initialize `left = 0` and `right = x`.
2. Use binary search to find the largest integer `mid` such that `mid * mid <= x`.
3. If `mid * mid == x`, return `mid`.
4. If `mid * mid < x`, move the search to the right half (`left = mid + 1`), keeping track of the possible answer.
5. Otherwise, move the search to the left half (`right = mid - 1`).
6. Continue until `left` exceeds `right`, and return the best found integer.

### **Time Complexity:**
- The time complexity is **O(log x)** because we divide the search space in half at each step.
- The space complexity is **O(1)** since we use only a few variables.

---

## Java Code Implementation
```java
class Solution {
    public int mySqrt(int x) {
        if (x == 0 || x == 1) return x;
        int left = 1, right = x, ans = 0;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (mid <= x / mid) { // To avoid overflow: mid * mid <= x
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return ans;
    }
}
```

---

## Dry Run
### Input:
```plaintext
x = 8
```

### Iteration 1:
| left | right | mid | mid * mid | Action |
|------|------|----|----------|--------|
| 1    | 8    | 4  | 16       | Search left |

### Iteration 2:
| left | right | mid | mid * mid | Action |
|------|------|----|----------|--------|
| 1    | 3    | 2  | 4        | Search right |

### Iteration 3:
| left | right | mid | mid * mid | Action |
|------|------|----|----------|--------|
| 3    | 3    | 3  | 9        | Search left |

### End Condition:
`right = 2`, so `ans = 2`.

**Output:** `2`

# Finding Nth Root of an Integer Using Binary Search

## Problem Statement
Given two integers `x` and `n`, compute and return the **nth root** of `x`.
If the `nth` root is not a perfect integer, return `-1`.

Your solution must run in **O(log x)** time.

### Example 1:
#### Input:
```plaintext
x = 16, n = 4
```
#### Output:
```plaintext
2
```
#### Explanation:
The 4th root of 16 is `2` since `2^4 = 16`.

### Example 2:
#### Input:
```plaintext
x = 10, n = 3
```
#### Output:
```plaintext
-1
```
#### Explanation:
There is no integer whose cube is exactly `10`.

---

## Approach
Since we need an efficient **O(log x)** solution, we use **Binary Search**:

1. Initialize `left = 1` and `right = x`.
2. Use binary search to find an integer `mid` such that `mid^n == x`.
3. If `mid^n == x`, return `mid`.
4. If `mid^n < x`, move to the right half (`left = mid + 1`).
5. If `mid^n > x`, move to the left half (`right = mid - 1`).
6. If no valid integer is found, return `-1`.

### **Time Complexity:**
- The time complexity is **O(log x)** because we halve the search space at each step.
- The space complexity is **O(1)** since we use only a few variables.

---

## Java Code Implementation
```java
class Solution {
    public int nthRoot(int x, int n) {
        if (x == 0 || x == 1) return x;
        int left = 1, right = x;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            long power = (long) Math.pow(mid, n);
            if (power == x) {
                return mid;
            } else if (power < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

---

## Dry Run
### Input:
```plaintext
x = 16, n = 4
```

### Iteration 1:
| left | right | mid | mid^4 | Action |
|------|------|----|------|--------|
| 1    | 16   | 8  | 4096 | Search left |

### Iteration 2:
| left | right | mid | mid^4 | Action |
|------|------|----|------|--------|
| 1    | 7    | 4  | 256  | Search left |

### Iteration 3:
| left | right | mid | mid^4 | Action |
|------|------|----|------|--------|
| 1    | 3    | 2  | 16   | Found |

**Output:** `2`

# Koko Eating Bananas

## Problem Statement
Koko loves to eat bananas. There are `n` piles of bananas, where the `i-th` pile has `piles[i]` bananas. The guards have gone, and Koko has `h` hours to eat all the bananas.

Each hour, Koko can eat up to `k` bananas from a single pile. If the pile has fewer than `k` bananas, she eats the whole pile and moves to the next one.

Find the minimum integer `k` (the eating speed) such that Koko can eat all the bananas within `h` hours.

Your solution must run in **O(n log m)** time, where `m` is the maximum pile size.

### Example
#### Input:
```plaintext
piles = [3,6,7,11], h = 8
```
#### Output:
```plaintext
4
```
#### Explanation:
If Koko eats at speed `4`, she can finish in exactly `8` hours.

---

## Approach
Since we need to minimize `k`, we use **Binary Search**:

1. The possible eating speed ranges from `1` to `max(piles)`.
2. Use binary search to find the smallest `k` that allows Koko to finish in `h` hours.
3. Check if `k` is feasible by simulating the number of hours required to eat all piles.
4. If Koko can finish within `h` hours, try a smaller `k` (`right = mid - 1`).
5. Otherwise, increase `k` (`left = mid + 1`).
6. Continue until `left` converges to the minimum valid `k`.

### **Time Complexity:**
- The binary search runs in **O(log m)**.
- Each feasibility check runs in **O(n)**.
- The total complexity is **O(n log m)**.

---

## Java Code Implementation
```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1, right = getMax(piles);
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canFinish(piles, h, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    private int getMax(int[] piles) {
        int max = 0;
        for (int pile : piles) {
            max = Math.max(max, pile);
        }
        return max;
    }
    
    private boolean canFinish(int[] piles, int h, int k) {
        int hours = 0;
        for (int pile : piles) {
            hours += (pile + k - 1) / k; // Equivalent to ceil(pile/k)
        }
        return hours <= h;
    }
}
```

---

## Dry Run
### Input:
```plaintext
piles = [3,6,7,11], h = 8
```

### Iteration 1:
| left | right | mid | Can Finish? | Action |
|------|------|----|------------|--------|
| 1    | 11   | 6  | Yes        | Search left |

### Iteration 2:
| left | right | mid | Can Finish? | Action |
|------|------|----|------------|--------|
| 1    | 6    | 3  | No         | Search right |

### Iteration 3:
| left | right | mid | Can Finish? | Action |
|------|------|----|------------|--------|
| 4    | 6    | 5  | Yes        | Search left |

### Iteration 4:
| left | right | mid | Can Finish? | Action |
|------|------|----|------------|--------|
| 4    | 5    | 4  | Yes        | Found |

**Output:** `4`

# Minimum Days to Make M Bouquets

## Problem Statement
You are given an integer array `bloomDay` of size `n`, where `bloomDay[i]` represents the day on which the `i-th` flower blooms. You are also given two integers `m` and `k`.

You need to make `m` bouquets. To make one bouquet, you need **k consecutive bloomed flowers**. You can only pick flowers that have bloomed on or before a specific day.

Return the **minimum number of days** required to make `m` bouquets, or `-1` if it's not possible.

### Example
#### Input:
```plaintext
bloomDay = [1,10,3,10,2], m = 3, k = 1
```
#### Output:
```plaintext
3
```
#### Explanation:
On day `3`, the flowers at indices `[0,2,4]` have bloomed, allowing us to make 3 bouquets.

---

## Approach
Since we need to minimize the number of days, we use **Binary Search**:

1. The minimum possible day is `min(bloomDay)`, and the maximum is `max(bloomDay)`.
2. Use binary search to find the smallest day `d` where it's possible to make `m` bouquets.
3. Check feasibility for a given day `d` by:
   - Iterating through `bloomDay`.
   - Counting consecutive bloomed flowers.
   - If `k` consecutive flowers are found, form a bouquet and reset the counter.
   - If `m` bouquets are made, return `true`; otherwise, return `false`.
4. Adjust the binary search range based on feasibility.

### **Time Complexity:**
- The binary search runs in **O(log max(bloomDay))**.
- Each feasibility check runs in **O(n)**.
- The total complexity is **O(n log max(bloomDay))**.

---

## Java Code Implementation
```java
class Solution {
    public int minDays(int[] bloomDay, int m, int k) {
        if (m * k > bloomDay.length) return -1; // Impossible case
        
        int left = Integer.MAX_VALUE, right = Integer.MIN_VALUE;
        for (int day : bloomDay) {
            left = Math.min(left, day);
            right = Math.max(right, day);
        }
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canMakeBouquets(bloomDay, m, k, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    private boolean canMakeBouquets(int[] bloomDay, int m, int k, int day) {
        int count = 0, bouquets = 0;
        for (int bloom : bloomDay) {
            if (bloom <= day) {
                count++;
                if (count == k) {
                    bouquets++;
                    count = 0;
                }
            } else {
                count = 0;
            }
        }
        return bouquets >= m;
    }
}
```

---

## Dry Run
### Input:
```plaintext
bloomDay = [1,10,3,10,2], m = 3, k = 1
```

### Iteration 1:
| left | right | mid | Can Make Bouquets? | Action |
|------|------|----|-------------------|--------|
| 1    | 10   | 5  | No                | Search right |

### Iteration 2:
| left | right | mid | Can Make Bouquets? | Action |
|------|------|----|-------------------|--------|
| 6    | 10   | 8  | No                | Search right |

### Iteration 3:
| left | right | mid | Can Make Bouquets? | Action |
|------|------|----|-------------------|--------|
| 9    | 10   | 9  | No                | Search right |

### Iteration 4:
| left | right | mid | Can Make Bouquets? | Action |
|------|------|----|-------------------|--------|
| 10   | 10   | 10 | Yes               | Found |

**Output:** `3`

# Find the Smallest Divisor Given a Threshold

## Problem Statement
Given an integer array `nums` and an integer `threshold`, find the **smallest divisor** such that the sum of all elements in `nums` after being divided by this divisor (rounded up to the nearest integer) is **less than or equal to** `threshold`.

Return the **smallest possible divisor**.

### Example
#### Input:
```plaintext
nums = [1,2,5,9], threshold = 6
```
#### Output:
```plaintext
5
```
#### Explanation:
- If divisor = `1`, sum = `1+2+5+9 = 17` (too large)
- If divisor = `2`, sum = `1+1+3+5 = 10`
- If divisor = `5`, sum = `1+1+1+2 = 5` (valid, and smallest possible)

---

## Approach
This problem can be efficiently solved using **Binary Search**:

1. **Search space**: The divisor can range from `1` to `max(nums)`, so we perform binary search in this range.
2. **Check feasibility** for a mid-value divisor:
   - Compute the sum of `ceil(nums[i] / mid)` for all elements.
   - If the sum is within `threshold`, the divisor is valid.
   - Otherwise, increase the divisor.
3. **Optimize using binary search**:
   - If the current divisor satisfies the condition, try a smaller divisor (`right = mid`).
   - Otherwise, increase (`left = mid + 1`).

### **Time Complexity:**
- **Binary search** runs in **O(log max(nums))**.
- **Sum calculation** runs in **O(n)** per iteration.
- **Total complexity:** `O(n log max(nums))`.

---

## Java Code Implementation
```java
class Solution {
    public int smallestDivisor(int[] nums, int threshold) {
        int left = 1, right = getMax(nums);
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isValid(nums, mid, threshold)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    private int getMax(int[] nums) {
        int max = 0;
        for (int num : nums) max = Math.max(max, num);
        return max;
    }
    
    private boolean isValid(int[] nums, int divisor, int threshold) {
        int sum = 0;
        for (int num : nums) {
            sum += (num + divisor - 1) / divisor; // Equivalent to ceil(num / divisor)
        }
        return sum <= threshold;
    }
}
```

---

## Dry Run
### Input:
```plaintext
nums = [1, 2, 5, 9], threshold = 6
```

### Iteration 1:
| left | right | mid | Sum | Valid? | Action |
|------|------|----|----|------|--------|
| 1    | 9    | 5  | 5  | Yes  | Move left |

### Iteration 2:
| left | right | mid | Sum | Valid? | Action |
|------|------|----|----|------|--------|
| 1    | 5    | 3  | 7  | No   | Move right |

### Iteration 3:
| left | right | mid | Sum | Valid? | Action |
|------|------|----|----|------|--------|
| 4    | 5    | 4  | 6  | Yes  | Move left |

**Output:** `5`

# Capacity to Ship Packages within D Days

## Problem Statement
A conveyor belt has packages that must be shipped from one port to another within `D` days. The `i`-th package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages in the order they appear on `weights`. The ship can carry at most **one continuous sequence** of packages per day, but it cannot exceed its weight capacity.

Return the **minimum weight capacity** of the ship that will allow all packages to be shipped within `D` days.

### Example
#### Input:
```plaintext
weights = [1,2,3,4,5,6,7,8,9,10], D = 5
```
#### Output:
```plaintext
15
```
#### Explanation:
- A ship capacity of `15` allows the following shipments:
  - Day 1: [1,2,3,4,5]
  - Day 2: [6,7]
  - Day 3: [8]
  - Day 4: [9]
  - Day 5: [10]
  
This is the **minimum capacity** required to complete the shipment in `D` days.

---

## Approach
This problem can be efficiently solved using **Binary Search**:

1. **Search space**:
   - The minimum ship capacity is `max(weights)` (since we must at least be able to ship the heaviest package).
   - The maximum ship capacity is `sum(weights)` (if we ship everything in one day).
2. **Binary search for the optimal capacity**:
   - Check if a given capacity allows shipping within `D` days.
   - If yes, try a smaller capacity (`right = mid`).
   - If no, increase capacity (`left = mid + 1`).

### **Time Complexity:**
- **Binary search** runs in **O(log sum(weights))**.
- **Checking feasibility** runs in **O(n)** per iteration.
- **Total complexity:** `O(n log sum(weights))`.

---

## Java Code Implementation
```java
class Solution {
    public int shipWithinDays(int[] weights, int days) {
        int left = getMax(weights), right = getSum(weights);
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (canShip(weights, days, mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    
    private int getMax(int[] weights) {
        int max = 0;
        for (int w : weights) max = Math.max(max, w);
        return max;
    }
    
    private int getSum(int[] weights) {
        int sum = 0;
        for (int w : weights) sum += w;
        return sum;
    }
    
    private boolean canShip(int[] weights, int days, int capacity) {
        int dayCount = 1, currentLoad = 0;
        for (int w : weights) {
            if (currentLoad + w > capacity) {
                dayCount++;
                currentLoad = 0;
            }
            currentLoad += w;
        }
        return dayCount <= days;
    }
}
```

---

## Dry Run
### Input:
```plaintext
weights = [1,2,3,4,5,6,7,8,9,10], D = 5
```

### Iteration 1:
| left | right | mid | Can Ship? | Action |
|------|------|----|---------|--------|
| 10   | 55   | 32 | Yes     | Move left |

### Iteration 2:
| left | right | mid | Can Ship? | Action |
|------|------|----|---------|--------|
| 10   | 32   | 21 | Yes     | Move left |

### Iteration 3:
| left | right | mid | Can Ship? | Action |
|------|------|----|---------|--------|
| 10   | 21   | 15 | Yes     | Move left |

**Output:** `15`

# Kth Missing Positive Number

## Problem Statement

Given an array `arr` of positive integers sorted in **strictly increasing order**, and an integer `k`, return the **kth missing positive integer**.

### Example

#### Input:

```plaintext
arr = [2,3,4,7,11], k = 5
```

#### Output:

```plaintext
9
```

#### Explanation:

The missing numbers are `[1,5,6,8,9,10,...]`. The 5th missing number is `9`.

---

## Approach

We can solve this problem efficiently using **Binary Search**:

1. **Understanding Missing Count:**
   - At index `i`, the number of missing elements up to `arr[i]` is `arr[i] - (i + 1)`.
   - We need to find the smallest index `i` where `arr[i] - (i + 1) >= k`.
2. **Binary Search:**
   - Perform binary search on `arr` to find the first index `mid` where `arr[mid] - (mid + 1) >= k`.
   - The missing number count before `arr[mid]` is `k`, and the exact missing number is calculated as `mid + k`.

### **Time Complexity:**

- **Binary Search** runs in **O(log n)**.
- **Total complexity:** `O(log n)`.

---

## Java Code Implementation

```java
class Solution {
    public int findKthPositive(int[] arr, int k) {
        int left = 0, right = arr.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] - (mid + 1) >= k) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left + k;
    }
}
```

---

## Dry Run

### Input:

```plaintext
arr = [2,3,4,7,11], k = 5
```

### Iteration 1:

| left | right | mid | Missing Count | Action     |
| ---- | ----- | --- | ------------- | ---------- |
| 0    | 5     | 2   | 1             | Move right |

### Iteration 2:

| left | right | mid | Missing Count | Action    |
| ---- | ----- | --- | ------------- | --------- |
| 3    | 5     | 4   | 6             | Move left |

### Iteration 3:

| left | right | mid | Missing Count | Action     |
| ---- | ----- | --- | ------------- | ---------- |
| 3    | 4     | 3   | 3             | Move right |

**Output:** `9`

