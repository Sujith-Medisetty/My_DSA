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

