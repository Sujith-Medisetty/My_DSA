

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

### BFS
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

# Number of Islands

## Problem Statement

Given an `m x n` 2D grid `grid` where:

- `'1'` represents land,
- `'0'` represents water,

Determine the number of **islands**. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

You may assume all four edges of the grid are surrounded by water.

### Example 1:

**Input:**

```plaintext
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
```

*** output ***
``` plaintext
1
```

### DFS
```java
import java.util.*;

public class Solution {

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int m = grid.length, n = grid[0].length;
        int islandCount = 0;

        // Iterate through the grid
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    // Start DFS to mark all land in the island
                    dfs(grid, i, j, m, n);
                    islandCount++; // One island is found
                }
            }
        }

        return islandCount;
    }

    private void dfs(char[][] grid, int i, int j, int m, int n) {
        // Base cases: check for out-of-bound or water cells
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == '0') {
            return;
        }

        // Mark the current land as visited by turning it to '0'
        grid[i][j] = '0';

        // Explore all four directions (up, down, left, right)
        dfs(grid, i + 1, j, m, n);
        dfs(grid, i - 1, j, m, n);
        dfs(grid, i, j + 1, m, n);
        dfs(grid, i, j - 1, m, n);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        char[][] grid = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        
        System.out.println("Number of islands (DFS): " + sol.numIslands(grid));
    }
}

```

### BFS
```java
import java.util.*;

public class Solution {

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        
        int m = grid.length, n = grid[0].length;
        int islandCount = 0;

        // Iterate through the grid
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    // Start BFS to mark all land in the island
                    bfs(grid, i, j, m, n);
                    islandCount++; // One island is found
                }
            }
        }

        return islandCount;
    }

    private void bfs(char[][] grid, int i, int j, int m, int n) {
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{i, j});
        grid[i][j] = '0'; // Mark the current land as visited

        // Directions: up, down, left, right
        int[] directions = {-1, 0, 1, 0, -1, 0};

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0], y = current[1];

            // Explore all four directions
            for (int k = 0; k < 4; k++) {
                int newX = x + directions[k];
                int newY = y + directions[k + 1];

                // Check if the new position is valid and land
                if (newX >= 0 && newY >= 0 && newX < m && newY < n && grid[newX][newY] == '1') {
                    grid[newX][newY] = '0'; // Mark as visited
                    queue.offer(new int[]{newX, newY});
                }
            }
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        char[][] grid = {
            {'1','1','1','1','0'},
            {'1','1','0','1','0'},
            {'1','1','0','0','0'},
            {'0','0','0','0','0'}
        };
        
        System.out.println("Number of islands (BFS): " + sol.numIslands(grid));
    }
}
```
