# Longest Substring Without Repeating Characters

### Problem Statement
Given a string `s`, find the length of the longest substring without duplicate characters.

A substring is a contiguous sequence of characters within a string.

### Example 1:
**Input:**
```plaintext
s = "zxyzxyz"
```
**Output:**
```plaintext
3
```
**Explanation:** The string "xyz" is the longest without duplicate characters.

### Example 2:
**Input:**
```plaintext
s = "xxxx"
```
**Output:**
```plaintext
1
```

### Constraints:
- `0 <= s.length <= 1000`
- `s` may consist of printable ASCII characters.

### Java Code Implementation
```java
import java.util.HashSet;

public class LongestSubstringWithoutRepeating {
    public static int lengthOfLongestSubstring(String s) {
        int left = 0, right = 0, maxLength = 0;
        HashSet<Character> set = new HashSet<>();
        
        while (right < s.length()) {
            if (!set.contains(s.charAt(right))) {
                set.add(s.charAt(right));
                maxLength = Math.max(maxLength, right - left + 1);
                right++;
            } else {
                set.remove(s.charAt(left));
                left++;
            }
        }
        
        return maxLength;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("zxyzxyz")); // Output: 3
        System.out.println(lengthOfLongestSubstring("xxxx")); // Output: 1
    }
}
```

### Dry Run
#### Input: "zxyzxyz"
1. `left = 0`, `right = 0`, `set = {}`
2. Add 'z': `set = {z}`, `maxLength = 1`
3. Add 'x': `set = {z, x}`, `maxLength = 2`
4. Add 'y': `set = {z, x, y}`, `maxLength = 3`
5. 'z' is a duplicate -> Remove 'z', move `left`.
6. Continue this process for the rest of the string.
7. Maximum substring length found: **3** ("xyz").

#### Input: "xxxx"
1. `left = 0`, `right = 0`, `set = {}`
2. Add 'x': `set = {x}`, `maxLength = 1`
3. Encounter duplicate 'x' -> Remove old 'x', move `left`.
4. Repeat for all characters.
5. Maximum substring length found: **1**.

### Complexity Analysis
- **Time Complexity:** `O(n)`, where `n` is the length of `s` (each character is processed once).
- **Space Complexity:** `O(min(n, 128))`, since we use a HashSet storing at most 128 ASCII characters.


# Longest Repeating Character Replacement

### Problem Statement
You are given a string `s` consisting of only uppercase English characters and an integer `k`. You can choose up to `k` characters of the string and replace them with any other uppercase English character.

After performing at most `k` replacements, return the length of the longest substring which contains only one distinct character.

### Example 1:
**Input:**
```plaintext
s = "XYYX", k = 2
```
**Output:**
```plaintext
4
```
**Explanation:** Either replace the 'X's with 'Y's, or replace the 'Y's with 'X's.

### Example 2:
**Input:**
```plaintext
s = "AAABABB", k = 1
```
**Output:**
```plaintext
5
```

### Constraints:
- `1 <= s.length <= 1000`
- `0 <= k <= s.length`

---

## Java Solution
```java
public class LongestRepeatingCharacterReplacement {
    public static int characterReplacement(String s, int k) {
        int[] freq = new int[26]; // Frequency of characters in the window
        int maxFreq = 0; // Max frequency of a single character in the window
        int left = 0; // Left pointer of the sliding window
        int maxLength = 0;
        
        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++; // Increase frequency count
            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']); // Update maxFreq
            
            // Window size - maxFreq > k means we need more than k replacements, so shrink the window
            while ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--; // Remove left character from window
                left++; // Move left pointer
            }
            
            maxLength = Math.max(maxLength, right - left + 1); // Update max length
        }
        return maxLength;
    }
    
    public static void main(String[] args) {
        System.out.println(characterReplacement("XYYX", 2)); // Output: 4
        System.out.println(characterReplacement("AAABABB", 1)); // Output: 5
    }
}
```

## Permutation in String

### Problem Statement
You are given two strings `s1` and `s2`. 

Return `true` if `s2` contains a permutation of `s1`, or `false` otherwise. That means if a permutation of `s1` exists as a substring of `s2`, then return `true`.

Both strings only contain lowercase letters.

### Example 1:
**Input:**  
`s1 = "abc"`, `s2 = "lecabee"`

**Output:**  
`true`

**Explanation:**  
The substring "cab" is a permutation of "abc" and is present in "lecabee".

### Example 2:
**Input:**  
`s1 = "abc"`, `s2 = "lecaabee"`

**Output:**  
`false`

### Constraints:
- `1 <= s1.length, s2.length <= 1000`
- `s1` and `s2` consist of lowercase English letters.

---

### Approach
We use the **Sliding Window + Frequency Count** approach:
1. Maintain a frequency count of characters in `s1`.
2. Iterate through `s2` with a window of size `s1.length`, updating a frequency count of the window.
3. If at any point, the window's frequency matches `s1`'s frequency, return `true`.
4. If no match is found, return `false`.

This ensures an efficient `O(n)` time complexity using a constant space `O(26) = O(1)`.

---

### Java Implementation
```java
import java.util.Arrays;

public class PermutationInString {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        
        int[] s1Freq = new int[26];
        int[] windowFreq = new int[26];
        
        // Count frequency of characters in s1
        for (char c : s1.toCharArray()) {
            s1Freq[c - 'a']++;
        }
        
        int n = s1.length();
        
        // Sliding window over s2
        for (int i = 0; i < s2.length(); i++) {
            windowFreq[s2.charAt(i) - 'a']++;  // Include new character
            
            // If window size exceeds s1, remove leftmost character
            if (i >= n) {
                windowFreq[s2.charAt(i - n) - 'a']--;
            }
            
            // Compare frequency arrays
            if (Arrays.equals(s1Freq, windowFreq)) {
                return true;
            }
        }
        
        return false;
    }
    
    public static void main(String[] args) {
        PermutationInString obj = new PermutationInString();
        System.out.println(obj.checkInclusion("abc", "lecabee")); // true
        System.out.println(obj.checkInclusion("abc", "lecaabee")); // false
    }
}
```

---
# Minimum Window Substring

## Problem Statement
Given two strings `s` and `t`, return the shortest substring of `s` such that every character in `t`, including duplicates, is present in the substring. If such a substring does not exist, return an empty string `""`.

You may assume that the correct output is always unique.

### Example 1:
**Input:**  
`s = "OUZODYXAZV"`, `t = "XYZ"`

**Output:**  
`"YXAZ"`

**Explanation:**  
`"YXAZ"` is the shortest substring that includes `X`, `Y`, and `Z` from string `t`.

### Example 2:
**Input:**  
`s = "xyz"`, `t = "xyz"`

**Output:**  
`"xyz"`

### Example 3:
**Input:**  
`s = "x"`, `t = "xy"`

**Output:**  
`""`

### Constraints:
- `1 <= s.length <= 1000`
- `1 <= t.length <= 1000`
- `s` and `t` consist of uppercase and lowercase English letters.

---

## Approach
This problem can be solved efficiently using the **Sliding Window** technique:
1. Use two pointers (`left` and `right`) to represent a window in `s`.
2. Expand the `right` pointer until the window contains all characters of `t`.
3. Once all characters are included, try to minimize the window by moving the `left` pointer.
4. Keep track of the minimum length substring that contains all characters of `t`.
5. Return the smallest valid window.

---

## Java Code
```java
import java.util.*;

public class MinimumWindowSubstring {
    public static String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) return "";
        
        Map<Character, Integer> charCount = new HashMap<>();
        for (char c : t.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }
        
        int left = 0, right = 0, required = charCount.size();
        int formed = 0;
        Map<Character, Integer> windowCount = new HashMap<>();
        int minLen = Integer.MAX_VALUE;
        int minLeft = 0, minRight = 0;
        
        while (right < s.length()) {
            char c = s.charAt(right);
            windowCount.put(c, windowCount.getOrDefault(c, 0) + 1);
            
            if (charCount.containsKey(c) && windowCount.get(c).intValue() == charCount.get(c).intValue()) {
                formed++;
            }
            
            while (left <= right && formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minLeft = left;
                    minRight = right;
                }
                
                char leftChar = s.charAt(left);
                windowCount.put(leftChar, windowCount.get(leftChar) - 1);
                if (charCount.containsKey(leftChar) && windowCount.get(leftChar) < charCount.get(leftChar)) {
                    formed--;
                }
                left++;
            }
            right++;
        }
        
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minRight + 1);
    }
    
    public static void main(String[] args) {
        System.out.println(minWindow("OUZODYXAZV", "XYZ")); // Output: "YXAZ"
        System.out.println(minWindow("xyz", "xyz")); // Output: "xyz"
        System.out.println(minWindow("x", "xy")); // Output: ""
    }
}
```

---

## Time Complexity Analysis
- Constructing the frequency map of `t`: **O(t.length())**
- Expanding and shrinking the window across `s`: **O(s.length())** (each character is processed at most twice)
- Overall time complexity: **O(s.length() + t.length())**

## Space Complexity Analysis
- Storing character frequencies for `t` and `s` window: **O(1)** (since the maximum unique characters are **52** for English letters)
- Overall space complexity: **O(1)**

---

# Sliding Window Maximum

### Problem Statement
You are given an array of integers `nums` and an integer `k`. There is a sliding window of size `k` that starts at the left edge of the array. The window slides one position to the right until it reaches the right edge of the array.

Return a list that contains the maximum element in the window at each step.

### Example 1:
**Input:**
```java
nums = [1,2,1,0,4,2,6]
k = 3
```

**Output:**
```java
[2,2,4,4,6]
```

**Explanation:**
```
Window position            Max
---------------           -----
[1  2  1] 0  4  2  6        2
 1 [2  1  0] 4  2  6        2
 1  2 [1  0  4] 2  6        4
 1  2  1 [0  4  2] 6        4
 1  2  1  0 [4  2  6]       6
```

### Constraints:
- `1 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `1 <= k <= nums.length`

---

### Java Code Implementation

```java
import java.util.*;

public class SlidingWindowMaximum {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0) {
            return new int[0];
        }
        
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new LinkedList<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Remove elements from the deque that are out of the current window
            if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }
            
            // Remove smaller elements as they are useless
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            
            // Add the current element index
            deque.offerLast(i);
            
            // Add maximum to result when we have a full window
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums = {1,2,1,0,4,2,6};
        int k = 3;
        System.out.println(Arrays.toString(maxSlidingWindow(nums, k)));
    }
}
```

### Time Complexity Analysis
- The algorithm uses a **deque (double-ended queue)** to efficiently keep track of window elements.
- Each element is added and removed **at most once** from the deque.
- The overall complexity is **O(n)**, where `n` is the length of `nums`.

