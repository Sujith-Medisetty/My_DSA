# Trapping Rain Water - Two Pointer Approach

## Problem Statement
Given an array `height` of non-negative integers where each element represents the height of a bar, compute how much water it can trap after raining.

## Approach: Two Pointer Method
- Use two pointers, `left` and `right`, starting at both ends.
- Maintain two variables, `leftMax` and `rightMax`, to store the maximum height encountered from the left and right sides, respectively.
- Move the pointer pointing to the smaller height inward while calculating trapped water.

## Java Code
```java
public class TrappingRainWater {
    public static int trap(int[] height) {
        if (height == null || height.length == 0) return 0;
        
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int trappedWater = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trappedWater += (leftMax - height[left]);
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trappedWater += (rightMax - height[right]);
                }
                right--;
            }
        }
        
        return trappedWater;
    }

    public static void main(String[] args) {
        int[] height = {0,1,0,2,1,0,1,3,2,1,2,1};
        System.out.println("Trapped Rain Water: " + trap(height));
    }
}
```

## Dry Run
**Example Input:**
```plaintext
height = [0,1,0,2,1,0,1,3,2,1,2,1]
```

**Step-by-Step Execution:**
| Left | Right | LeftMax | RightMax | Water Trapped |
|------|-------|---------|----------|---------------|
| 0    | 11    | 0       | 1        | 0             |
| 1    | 11    | 1       | 1        | 0             |
| 2    | 11    | 1       | 1        | 1             |
| 3    | 11    | 2       | 1        | 1             |
| 3    | 10    | 2       | 2        | 1             |
| 4    | 10    | 2       | 2        | 2             |
| 5    | 10    | 2       | 2        | 4             |
| 6    | 10    | 2       | 2        | 5             |
| 7    | 10    | 3       | 2        | 5             |
| 7    | 9     | 3       | 2        | 6             |
| 7    | 8     | 3       | 2        | 6             |
| 7    | 7     | 3       | 3        | 6             |

**Final Output:** `6` units of trapped rainwater.

## Time and Space Complexity
- **Time Complexity:** `O(n)`, since we traverse the array once.
- **Space Complexity:** `O(1)`, as we use only a few extra variables.

This approach efficiently computes the trapped rainwater while keeping space usage minimal.
