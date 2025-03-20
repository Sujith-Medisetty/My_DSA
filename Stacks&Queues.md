# Infix, Postfix, prefix conversions.
``` java
import java.util.*;

public class ExpressionConverter {

    // Helper function to get precedence of operators
    private int getPrecedence(char op) {
        switch (op) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
            default: return -1;
        }
    }

    // Infix to Postfix Conversion
    public String infixToPostfix(String expression) {
        StringBuilder result = new StringBuilder();
        Stack<Character> stack = new Stack<>();

        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                result.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                stack.pop();
            } else { 
                while (!stack.isEmpty() && getPrecedence(stack.peek()) >= getPrecedence(ch)) {
                    result.append(stack.pop());
                }
                stack.push(ch);
            }
        }

        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }
        return result.toString();
    }

    // Infix to Prefix Conversion
    public String infixToPrefix(String expression) {
        String reversed = new StringBuilder(expression).reverse().toString();
        reversed = reversed.replace('(', '#').replace(')', '(').replace('#', ')');
        String postfix = infixToPostfix(reversed);
        return new StringBuilder(postfix).reverse().toString();
    }

    // Postfix to Infix Conversion
    public String postfixToInfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op2 = stack.pop();
                String op1 = stack.pop();
                stack.push("(" + op1 + ch + op2 + ")");
            }
        }
        return stack.peek();
    }

    // Prefix to Infix Conversion
    public String prefixToInfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (int i = expression.length() - 1; i >= 0; i--) {
            char ch = expression.charAt(i);
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op1 = stack.pop();
                String op2 = stack.pop();
                stack.push("(" + op1 + ch + op2 + ")");
            }
        }
        return stack.peek();
    }

    // Postfix to Prefix Conversion
    public String postfixToPrefix(String expression) {
        Stack<String> stack = new Stack<>();
        for (char ch : expression.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op2 = stack.pop();
                String op1 = stack.pop();
                stack.push(ch + op1 + op2);
            }
        }
        return stack.peek();
    }

    // Prefix to Postfix Conversion
    public String prefixToPostfix(String expression) {
        Stack<String> stack = new Stack<>();
        for (int i = expression.length() - 1; i >= 0; i--) {
            char ch = expression.charAt(i);
            if (Character.isLetterOrDigit(ch)) {
                stack.push(String.valueOf(ch));
            } else {
                String op1 = stack.pop();
                String op2 = stack.pop();
                stack.push(op1 + op2 + ch);
            }
        }
        return stack.peek();
    }

    public static void main(String[] args) {
        ExpressionConverter converter = new ExpressionConverter();
        String infix = "a+b*(c^d-e)^(f+g*h)-i";
        System.out.println("Infix to Postfix: " + converter.infixToPostfix(infix));
        System.out.println("Infix to Prefix: " + converter.infixToPrefix(infix));
        System.out.println("Postfix to Infix: " + converter.postfixToInfix("abcd^e-fgh*+^*+i-"));
        System.out.println("Prefix to Infix: " + converter.prefixToInfix("-+a*b^-^cde+f*ghi"));
        System.out.println("Postfix to Prefix: " + converter.postfixToPrefix("abcd^e-fgh*+^*+i-"));
        System.out.println("Prefix to Postfix: " + converter.prefixToPostfix("-+a*b^-^cde+f*ghi"));
    }
}
```
/**
Approach for Solving Each Conversion:

1. Infix to Postfix:
   - Traverse the expression.
   - Push operators onto a stack based on precedence.
   - Append operands directly to the result.
   - Handle parentheses carefully.

2. Infix to Prefix:
   - Reverse the string.
   - Swap '(' with ')' and vice versa.
   - Apply the infix-to-postfix logic, then reverse the result.

3. Postfix to Infix:
   - Traverse the expression.
   - Push operands onto the stack.
   - For operators, pop two elements from the stack, combine them, and push the result back.

4. Prefix to Infix:
   - Traverse the expression from right to left.
   - Follow the same logic as postfix-to-infix.

5. Postfix to Prefix:
   - Traverse the expression.
   - Push operands onto the stack.
   - For operators, pop two elements, combine them with the operator, and push the result back.

6. Prefix to Postfix:
   - Traverse the expression from right to left.
   - Follow the same logic as postfix-to-prefix.
**/

# Next Greater Element

### Problem Statement
Given an array `arr[]` of size `n`, for each element, find the **Next Greater Element (NGE)** in the array. The Next Greater Element for an element is the first greater element on the right side of the array. If no greater element exists, output `-1` for that element.

### Example
**Input:** `arr[] = {4, 5, 2, 25}`  
**Output:** `{5, 25, 25, -1}`  

**Input:** `arr[] = {13, 7, 6, 12}`  
**Output:** `{-1, 12, 12, -1}`

---

### Approach
1. **Initialize a Stack:**
   - Traverse the array from **right to left**.
   - For each element:
     - Pop elements from the stack until you find a greater element or the stack is empty.
     - If the stack is empty, there's no greater element — mark `-1`.
     - Otherwise, the top of the stack is the next greater element.
   - Push the current element onto the stack.

2. **Time Complexity:** `O(n)`

---

### Java Code Implementation
```java
import java.util.*;

public class NextGreaterElement {

    public int[] nextGreaterElement(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }

        return result;
    }

    public static void main(String[] args) {
        NextGreaterElement nge = new NextGreaterElement();
        int[] arr = {4, 5, 2, 25};
        System.out.println("Next Greater Elements: " + Arrays.toString(nge.nextGreaterElement(arr)));

        int[] arr2 = {13, 7, 6, 12};
        System.out.println("Next Greater Elements: " + Arrays.toString(nge.nextGreaterElement(arr2)));
    }
}
```

---

### Dry Run
**Input:** `arr = {4, 5, 2, 25}`  

| Element | Stack | Next Greater Element |
|:--------:|:------:|:--------------------:|
| 25       | 25     | -1                   |
| 2        | 25     | 25                   |
| 5        | 25     | 25                   |
| 4        | 5      | 5                    |

**Output:** `{5, 25, 25, -1}`

---

# Next Greater Element - II

### Problem Statement
Given a **circular array** `nums` (the next element of the last element is the first element of the array), find the **Next Greater Number** for each element. The Next Greater Number for an element is the first greater number encountered while moving to the right in the array. If no greater number exists, output `-1`.

### Example
**Input:** `nums = [1, 2, 1]`  
**Output:** `[2, -1, 2]`

**Input:** `nums = [3, 8, 4, 1, 2]`  
**Output:** `[8, -1, 8, 2, 3]`

---

### Approach
1. **Initialize a Stack:**
   - Traverse the array **twice** (to simulate the circular property).
   - For each element:
     - Pop elements from the stack until you find a greater element or the stack is empty.
     - If the stack is empty, mark `-1`.
     - Otherwise, the top of the stack is the next greater element.
   - Push the current element onto the stack.
2. **Store Results:**
   - As we traverse the array in the second pass, fill the result array only for the first `n` elements (not the extra iteration).

3. **Time Complexity:** `O(n)`

---

### Java Code Implementation
```java
import java.util.*;

public class NextGreaterElementII {

    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        Stack<Integer> stack = new Stack<>();

        Arrays.fill(result, -1);
        
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i % n]) {
                stack.pop();
            }
            if (i < n) {
                result[i] = stack.isEmpty() ? -1 : stack.peek();
            }
            stack.push(nums[i % n]);
        }

        return result;
    }

    public static void main(String[] args) {
        NextGreaterElementII nge = new NextGreaterElementII();
        int[] nums = {1, 2, 1};
        System.out.println("Next Greater Elements: " + Arrays.toString(nge.nextGreaterElements(nums)));

        int[] nums2 = {3, 8, 4, 1, 2};
        System.out.println("Next Greater Elements: " + Arrays.toString(nge.nextGreaterElements(nums2)));
    }
}
```

---

### Dry Run
**Input:** `nums = [1, 2, 1]`  

| Element | Stack | Next Greater Element |
|:--------:|:------:|:--------------------:|
| 1        | 2      | 2                    |
| 2        | 2      | -1                   |
| 1        | 2      | 2                    |

**Output:** `[2, -1, 2]`

---

# Sum of Subarray Minimums

## Problem Statement
Given an integer array `arr`, find the sum of the **minimum values** in all possible subarrays. Since the result may be large, return the result **modulo** `10^9 + 7`.

### Example
**Input:** `arr = [3, 1, 2, 4]`  
**Output:** `17`  
**Explanation:**
- Subarrays are: `[3]`, `[1]`, `[2]`, `[4]`, `[3,1]`, `[1,2]`, `[2,4]`, `[3,1,2]`, `[1,2,4]`, `[3,1,2,4]`
- Minimums are: `3, 1, 2, 4, 1, 1, 2, 1, 1, 1`
- Sum of minimums = `17`

---

## Approach 1: Stack (Optimal Solution)
**Time Complexity:** `O(n)`  
**Space Complexity:** `O(n)`

### Java Code (Stack Solution)
```java
import java.util.Stack;

public class SubarrayMinStack {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1_000_000_007; // Modulo to prevent overflow
        int n = arr.length;
        long result = 0; // Store the final result
        
        Stack<Integer> stack = new Stack<>(); // Monotonic increasing stack
        int[] left = new int[n]; // Stores how many elements are greater on the left
        int[] right = new int[n]; // Stores how many elements are greater or equal on the right

        // Step 1: Compute left[] (distance to previous smaller element)
        for (int i = 0; i < n; i++) {
            // Pop elements from stack while they are greater than arr[i]
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }
            // If stack is empty, all elements to the left are greater -> i+1 subarrays
            // Otherwise, distance from previous smaller element
            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i); // Push current index to stack
        }

        // Clear stack to reuse for right[] computation
        stack.clear();
        
        // Step 2: Compute right[] (distance to next smaller or equal element)
        for (int i = n - 1; i >= 0; i--) {
            // Pop elements from stack while they are greater or equal to arr[i]
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            // If stack is empty, all elements to the right are greater -> n-i subarrays
            // Otherwise, distance to next smaller element
            right[i] = stack.isEmpty() ? n - i : stack.peek() - i;
            stack.push(i); // Push current index to stack
        }

        // Step 3: Calculate final result using left[] and right[]
        for (int i = 0; i < n; i++) {
            // Contribution formula: arr[i] * left[i] * right[i]
            result = (result + (long) arr[i] * left[i] * right[i]) % MOD;
        }

        return (int) result;
    }

    public static void main(String[] args) {
        SubarrayMinStack obj = new SubarrayMinStack();
        int[] arr = {3, 1, 2, 4}; // Example input
        System.out.println("Sum of subarray minimums (Stack): " + obj.sumSubarrayMins(arr));
    }
}
```

### Dry Run for Stack Solution
- **Input:** `[3, 1, 2, 4]`
- Left array: `[1, 2, 1, 1]`
- Right array: `[1, 3, 2, 1]`

Final calculation:
```
(3 * 1 * 1) + (1 * 2 * 3) + (2 * 1 * 2) + (4 * 1 * 1)
= 3 + 6 + 4 + 4
= 17
```

---

## Approach 2: DP Solution (Less Optimal)
**Time Complexity:** `O(n^2)`  
**Space Complexity:** `O(n^2)`

### Java Code (DP Solution)
```java
public class SubarrayMinDP {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1_000_000_007;
        int n = arr.length;
        int[][] dp = new int[n][n];
        long result = 0;

        for (int i = 0; i < n; i++) {
            dp[i][i] = arr[i];
            result = (result + dp[i][i]) % MOD;
        }

        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Math.min(dp[i][j - 1], arr[j]);
                result = (result + dp[i][j]) % MOD;
            }
        }

        return (int) result;
    }

    public static void main(String[] args) {
        SubarrayMinDP obj = new SubarrayMinDP();
        int[] arr = {3, 1, 2, 4};
        System.out.println("Sum of subarray minimums (DP): " + obj.sumSubarrayMins(arr));
    }
}
```

### Dry Run for DP Solution
**DP Table:**
| `i \ j` |  0  |  1  |  2  |  3  |
|:---------|:----|:----|:----|:----|
| **0**     | **3** |  1  |  1  |  1  |
| **1**     |      | **1** |  1  |  1  |
| **2**     |      |      | **2** |  2  |
| **3**     |      |      |      | **4** |

Final Sum: **`17`**

---

## Conclusion
- ✅ **Stack Solution:** Most optimal with `O(n)` complexity — Recommended for real-world scenarios.
- 🚫 **DP Solution:** Less efficient with `O(n²)` complexity — Good for understanding subarray behavior but not optimal.


---

# **Sum Subaarat Ranges**
Given an integer array `arr`, find the **sum of all subarray ranges**.
- A **range** of a subarray is defined as the difference between the maximum and minimum element in that subarray.
- Return the sum of all subarray ranges.

### **Example**
#### **Input:**
```java
arr = {1, 2, 3}
```
#### **Output:**
```java
Sum of subarray ranges: 4
```
#### **Explanation:**
- The subarrays and their ranges are:
  - `[1]` → max=1, min=1, range=0
  - `[2]` → max=2, min=2, range=0
  - `[3]` → max=3, min=3, range=0
  - `[1,2]` → max=2, min=1, range=1
  - `[2,3]` → max=3, min=2, range=1
  - `[1,2,3]` → max=3, min=1, range=2
  
Total sum of ranges: `1 + 1 + 2 = 4`

---

# **Approach**
To efficiently compute the sum of subarray ranges, we use a **monotonic stack approach**:
1. Compute the **sum of subarray maximum elements**.
2. Compute the **sum of subarray minimum elements**.
3. Compute the **final result**:
   
   ```
   Sum of subarray ranges = sumOfSubarrayMax - sumOfSubarrayMin
   ```
4. Use **monotonic stacks** to efficiently find the previous and next **greater** (for max) and **smaller** (for min) elements, reducing the time complexity to **O(n)**.

---

# **Java Code**
```java
import java.util.Stack;

/**
 * Class to calculate the sum of subarray ranges.
 * Formula: Sum of subarray max elements - Sum of subarray min elements
 */
public class SumOfSubarrayRanges {
    
    public long subArrayRanges(int[] arr) {
        return sumOfSubarrayMax(arr) - sumOfSubarrayMin(arr);
    }
    
    /**
     * Computes the sum of minimum elements in all subarrays.
     */
    private long sumOfSubarrayMin(int[] arr) {
        int n = arr.length;
        long sum = 0;
        Stack<Integer> stack = new Stack<>();
        int[] left = new int[n]; // Stores distances to the previous smaller element
        int[] right = new int[n]; // Stores distances to the next smaller or equal element
        
        // Compute left[]
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        
        stack.clear();
        
        // Compute right[]
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n - i : stack.peek() - i;
            stack.push(i);
        }
        
        // Compute sum using contribution formula
        for (int i = 0; i < n; i++) {
            sum += (long) arr[i] * left[i] * right[i];
        }
        
        return sum;
    }
    
    /**
     * Computes the sum of maximum elements in all subarrays.
     */
    private long sumOfSubarrayMax(int[] arr) {
        int n = arr.length;
        long sum = 0;
        Stack<Integer> stack = new Stack<>();
        int[] left = new int[n]; // Stores distances to the previous larger element
        int[] right = new int[n]; // Stores distances to the next larger or equal element
        
        // Compute left[]
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
                stack.pop();
            }
            left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
            stack.push(i);
        }
        
        stack.clear();
        
        // Compute right[]
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] <= arr[i]) {
                stack.pop();
            }
            right[i] = stack.isEmpty() ? n - i : stack.peek() - i;
            stack.push(i);
        }
        
        // Compute sum using contribution formula
        for (int i = 0; i < n; i++) {
            sum += (long) arr[i] * left[i] * right[i];
        }
        
        return sum;
    }

    /**
     * Main function to test the sum of subarray ranges.
     */
    public static void main(String[] args) {
        SumOfSubarrayRanges obj = new SumOfSubarrayRanges();
        int[] arr = {1, 2, 3};
        System.out.println("Sum of subarray ranges: " + obj.subArrayRanges(arr));
    }
}
```

---

# **Dry Run**
### **Input:** `{1, 2, 3}`

### **Step 1: Compute `left[]` and `right[]` for Min Contribution**
| Index | arr[i] | left[i] | right[i] | Contribution |
|--------|--------|--------|--------|----------------|
| 0 | 1 | 1 | 3 | `1 × 1 × 3 = 3` |
| 1 | 2 | 1 | 2 | `2 × 1 × 2 = 4` |
| 2 | 3 | 1 | 1 | `3 × 1 × 1 = 3` |
**Sum of min contributions** = `3 + 4 + 3 = 10`

### **Step 2: Compute `left[]` and `right[]` for Max Contribution**
| Index | arr[i] | left[i] | right[i] | Contribution |
|--------|--------|--------|--------|----------------|
| 0 | 1 | 1 | 1 | `1 × 1 × 1 = 1` |
| 1 | 2 | 2 | 1 | `2 × 2 × 1 = 4` |
| 2 | 3 | 3 | 1 | `3 × 3 × 1 = 9` |
**Sum of max contributions** = `1 + 4 + 9 = 14`

### **Final Result:**
```
Sum of subarray ranges = 14 - 10 = 4
```

**Output:**
```
Sum of subarray ranges: 4
```

---


# Asteroid Collision Problem

## Problem Statement
You are given an array of integers `asteroids` where:
- Positive values represent asteroids moving right.
- Negative values represent asteroids moving left.
- If two asteroids collide, the smaller one (absolute value) is destroyed.
- If both have the same size, both are destroyed.
- If a moving left asteroid collides with a moving right asteroid, they interact based on their sizes.

Return the state of asteroids after all collisions.

## Approach
1. Use a stack to simulate asteroid movement.
2. Iterate through the `asteroids` array:
   - If the stack is empty or the asteroid is moving right (`>0`), push it onto the stack.
   - If the asteroid is moving left (`<0`), check the top of the stack:
     - If the top is moving right (`>0`), a collision occurs.
     - Compare sizes and remove the smaller one.
     - If they are equal, remove both.
     - If the moving left asteroid is larger, keep checking the stack.
3. Convert the stack to an array and return it.

## Code Implementation
```java
import java.util.Stack;

public class AsteroidCollision {
    public static int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> stack = new Stack<>();
        for (int asteroid : asteroids) {
            boolean destroyed = false;
            while (!stack.isEmpty() && asteroid < 0 && stack.peek() > 0) {
                if (stack.peek() < -asteroid) {
                    stack.pop();
                    continue;
                } else if (stack.peek() == -asteroid) {
                    stack.pop();
                }
                destroyed = true;
                break;
            }
            if (!destroyed) {
                stack.push(asteroid);
            }
        }
        return stack.stream().mapToInt(i -> i).toArray();
    }
    
    public static void main(String[] args) {
        int[] asteroids = {5, 10, -5};
        int[] result = asteroidCollision(asteroids);
        
        System.out.print("Result: ");
        for (int r : result) {
            System.out.print(r + " ");
        }
    }
}
```

## Dry Run Example
### Input
```
asteroids = [5, 10, -5]
```

### Step-by-Step Execution
1. Stack is empty.
2. `5` is positive, push to stack → `[5]`
3. `10` is positive, push to stack → `[5, 10]`
4. `-5` is negative:
   - Compare with `10`, no collision as `10 > |-5|`
   - `-5` is destroyed

### Final Stack
```
[5, 10]
```

### Output
```
[5, 10]
```

# Largest Rectangle in Histogram

## Problem Statement
Given an array `heights` representing the heights of histogram bars, find the largest rectangular area that can be formed using these bars.

## Approach
1. Use a **monotonic increasing stack** to keep track of indices of histogram bars.
2. Iterate through the array, maintaining the stack:
   - If the current height is greater than the stack's top, push it.
   - If it is smaller, pop elements from the stack and compute the area with the popped bar as height.
3. Continue until all elements are processed.
4. Return the maximum computed area.

## Code Implementation
```java
import java.util.Stack;

public class LargestRectangleHistogram {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;
        
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
    
    public static void main(String[] args) {
        int[] heights = {2, 1, 5, 6, 2, 3};
        System.out.println("Largest Rectangle Area: " + largestRectangleArea(heights));
    }
}
```

## Dry Run Example
### Input
```
heights = [2, 1, 5, 6, 2, 3]
```

### Step-by-Step Execution
1. Push index `0` (height `2`) → Stack: `[0]`
2. Pop index `0` (height `2`), calculate area `2 × 1 = 2`
3. Push index `1` (height `1`) → Stack: `[1]`
4. Push index `2` (height `5`), Push index `3` (height `6`) → Stack: `[1, 2, 3]`
5. Pop index `3` (height `6`), calculate area `6 × 1 = 6`
6. Pop index `2` (height `5`), calculate area `5 × 2 = 10`
7. Push index `4` (height `2`), Push index `5` (height `3`) → Stack: `[1, 4, 5]`
8. Pop index `5` (height `3`), calculate area `3 × 1 = 3`
9. Pop index `4` (height `2`), calculate area `2 × 4 = 8`
10. Pop index `1` (height `1`), calculate area `1 × 6 = 6`

### Final Maximum Area
```
10
```

