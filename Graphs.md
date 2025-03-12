

# Number of Provinces

## Problem Statement
You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` indicates that the `ith` city and `jth` city are directly connected, and `isConnected[i][j] = 0` indicates that they are not directly connected.

A province is a group of directly or indirectly connected cities, and no other cities outside of the group.

Return the total number of provinces.

### Example 1:
**Input:**
```plaintext
isConnected = [[1,1,0],
               [1,1,0],
               [0,0,1]]
```
**Output:** `2`

### Example 2:
**Input:**
```plaintext
isConnected = [[1,0,0],
               [0,1,0],
               [0,0,1]]
```
**Output:** `3`

## Constraints:
- `1 <= n <= 200`
- `isConnected[i][j]` is `1` or `0`.
- `isConnected[i][i] == 1` (each city is connected to itself).
*/

### DFS
```java
public class NumberOfProvinces {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int provinces = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, visited, i);
                provinces++;
            }
        }
        return provinces;
    }
    
    private void dfs(int[][] isConnected, boolean[] visited, int i) {
        visited[i] = true;
        for (int j = 0; j < isConnected.length; j++) {
            if (isConnected[i][j] == 1 && !visited[j]) {
                dfs(isConnected, visited, j);
            }
        }
    }
    
    public static void main(String[] args) {
        NumberOfProvinces obj = new NumberOfProvinces();
        int[][] isConnected1 = {{1,1,0}, {1,1,0}, {0,0,1}};
        System.out.println(obj.findCircleNum(isConnected1)); // Output: 2
        
        int[][] isConnected2 = {{1,0,0}, {0,1,0}, {0,0,1}};
        System.out.println(obj.findCircleNum(isConnected2)); // Output: 3
    }
}
```

### DFS
```java
import java.util.*;

public class Solution {

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int provinces = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                bfs(isConnected, visited, i, n);
                provinces++;
            }
        }

        return provinces;
    }

    private void bfs(int[][] isConnected, boolean[] visited, int start, int n) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        visited[start] = true;

        while (!queue.isEmpty()) {
            int current = queue.poll();

            for (int i = 0; i < n; i++) {
                // Check if there is a road between `current` and province `i` and if province `i` is not visited
                if (isConnected[current][i] == 1 && !visited[i]) {
                    visited[i] = true;
                    queue.offer(i);
                }
            }
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        
        // Example: Input for adjacency matrix
        int[][] isConnected = {
            {1, 1, 0},
            {1, 1, 0},
            {0, 0, 1}
        };
        
        System.out.println("Number of provinces: " + sol.findCircleNum(isConnected));
    }
}

```
