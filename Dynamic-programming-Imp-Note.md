# Subset Sum Problem - Key Points

``` Problem Ref
https://www.naukri.com/code360/problems/subset-sum-equal-to-k_1550954?leftPanelTab=1%3Fsource%3Dyoutube&campaign=striver_dp_videos&utm_source=youtube&utm_medium=affiliate&utm_campaign=striver_dp_videos
```

## Understanding Iteration in 1D DP Array

- **Without Repetition:** Iterate from the **end to start** to ensure that each element is considered only once.
- **With Repetition:** Iterate from the **start to end** to allow elements to be used multiple times.

## Transition in 2D DP Array

- **Without Repetition:** Use `dp[i - 1][sum - arr[i - 1]]`, ensuring that each element is picked at most once.
- **With Repetition:** Use `dp[i][sum - arr[i - 1]]`, allowing the same element to be included multiple times.

## Explanation of Key DP Transition

```java
boolean exclude = dp[i - 1][sum];
boolean include = (arr[i - 1] <= sum) ? dp[i - 1][sum - arr[i - 1]] : false;
```
- **Exclude case:** We do not pick the current element, so we rely on the previous row's result.
- **Include case:** If the element can be included, we check whether the remaining sum (`sum - arr[i-1]`) was achievable in the previous row.

### For **Repetition Allowed:**
Modify `include` condition to:
```java
boolean include = (arr[i - 1] <= sum) ? dp[i][sum - arr[i - 1]] : false;
```
This allows picking the same element multiple times.

## Summary
| Case                 | Loop Direction | DP Transition      |
|----------------------|---------------|--------------------|
| Without Repetition  | End to Start   | `dp[i - 1][sum - arr[i - 1]]` |
| With Repetition     | Start to End   | `dp[i][sum - arr[i - 1]]` |

This structured approach helps in efficiently solving subset sum and related DP problems!

-- 
# Note for DP on Subsequences Problems

### Key Structure for DP Table:
- **Rows:** Represent the(subset) **number of elements considered** (or the **index of the element** in the array).
- **Columns:** Represent the:
  - **Target Value** (e.g., in Target Sum problem)
  - **Subset Length** (e.g., in Combination Sum problem)
  - **Total Achievable Sum** (e.g., in Subset Sum problem)

### Why This Structure?
This setup effectively tracks decisions involving element inclusion/exclusion in subsequence-based DP problems.

### Common Problems Using This Structure:
- ✅ **0/1 Knapsack**
- ✅ **Subset Sum**
- ✅ **Coin Change**
- ✅ **Target Sum**
