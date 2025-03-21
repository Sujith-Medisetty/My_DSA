# Monotonic Stack - Cheat Sheet

## What is a Monotonic Stack?
A **monotonic stack** is a stack data structure that maintains its elements in a monotonically increasing or decreasing order.
- **Monotonically Increasing Stack:** Elements from top to bottom are in increasing order.
- **Monotonically Decreasing Stack:** Elements from top to bottom are in decreasing order.

---

## Why and When to Use Monotonic Stack?

### 🔥 Common Scenarios:

1. **Next Greater Element (NGE)**
   - Problem: For each element in an array, find the next element greater than it.
   - Stack type: Monotonically decreasing stack.

2. **Next Smaller Element (NSE)**
   - Problem: For each element, find the next element smaller than it.
   - Stack type: Monotonically increasing stack.

3. **Previous Greater/Smaller Element**
   - Just like NGE/NSE but in reverse (left to right instead of right to left).

4. **Largest Rectangle in Histogram**
   - Problem: Find the largest rectangle area in a histogram.
   - Stack type: Monotonically increasing stack to find nearest smaller to left and right.

5. **Stock Span Problem**
   - Problem: Find the number of consecutive days before today with a lower stock price.
   - Stack type: Monotonically decreasing stack.

6. **Daily Temperatures**
   - Problem: For each day, find how many days you have to wait until a warmer temperature.
   - Stack type: Monotonically decreasing stack.

7. **Trapping Rain Water**
   - Problem: Find how much water can be trapped after raining.
   - Can be solved using a two-pointer approach or monotonic stack.

8. **Minimum/Maximum in Sliding Window**
   - Problem: Maintain the min/max of each window of size k in an array.
   - Can be solved via monotonic deque (variation of monotonic stack).

---

## 🎯 Monotonic Stack & Subarrays

- Monotonic stacks are **heavily used in subarray-based problems**, especially when you are dealing with:
  - **Ranges** or **windows** (sliding or fixed)
  - **Contiguous segments** where you need to track next/previous larger/smaller values
  - **Optimizing brute-force O(n²) scans** to **O(n)**

### 💡 Why?
- Many subarray problems need you to look for an element’s "influence" within its range, like:
  - Who blocks me to the left/right?
  - When does my next min/max occur?
  - What’s the boundary for this segment?

### 💎 Common Subarray Patterns:
- **Max/Min subarray values in ranges**
- **Histogram/bar-based range queries**
- **Sliding window problems** (max/min in window)
- **Water trapped between elevations** (treated as left/right boundaries)

---

## ✨ Key Insights / How to Spot it
- You need to find **next/previous greater/smaller elements**.
- You need to process elements **one by one** and keep track of candidates.
- **"Pop until condition met"** pattern.
- Typical space complexity: **O(n)**
- Typical time complexity: **O(n)** (since every element is pushed & popped at most once).

---

## 📝 Handy Tips
- Process **from left to right** or **right to left** depending on "next" or "previous".
- For NGE/NSE: Think in terms of "who blocks this element?"
- Always decide: Do I want increasing or decreasing order based on the problem?
- Don't forget edge cases (e.g., empty stack, no next greater).

---
