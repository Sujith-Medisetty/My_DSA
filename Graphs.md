

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

# Flood Fill Algorithm

## Problem Statement

You are given an `m x n` 2D integer array `image` where each integer represents the color of a pixel, and a starting pixel `(sr, sc)` where you begin the flood fill. You are also given a `newColor` to fill the connected region.

Your task is to implement the flood fill algorithm to change the color of all connected pixels that are of the same color as the starting pixel `(sr, sc)` to the `newColor`.

### Flood Fill Process:
1. Start from the pixel `(sr, sc)`.
2. Change the color of the starting pixel to `newColor`.
3. Recursively apply the same operation to all four adjacent pixels (up, down, left, right) that have the same original color as the starting pixel.
4. Do not visit any pixel that has already been changed to `newColor`.

```plaintext
image = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 0, 1]
]
sr = 1, sc = 1, newColor = 2
```

*** output ***
``` plaintext
[
  [2, 2, 2],
  [2, 2, 0],
  [2, 0, 1]
]
```

### BFS
```java
import java.util.LinkedList;
import java.util.Queue;

public class FloodFill {
    
    // Directions for moving up, down, left, right
    private static final int[] DIRECTIONS = {-1, 0, 1, 0, -1};

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int oldColor = image[sr][sc];

        // If the old color is the same as the new color, no need to do anything
        if (oldColor == newColor) {
            return image;
        }

        int m = image.length;
        int n = image[0].length;

        // Queue for BFS
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[] {sr, sc});

        // BFS to change all connected pixels' colors
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int r = current[0];
            int c = current[1];

            // Change the color of the current pixel
            image[r][c] = newColor;

            // Check the four adjacent pixels (up, down, left, right)
            for (int i = 0; i < 4; i++) {
                int newRow = r + DIRECTIONS[i];
                int newCol = c + DIRECTIONS[i + 1];

                // Check if the new coordinates are within bounds and if the color matches the old color
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && image[newRow][newCol] == oldColor) {
                    queue.offer(new int[] {newRow, newCol});
                }
            }
        }

        return image;
    }

    // Test the function
    public static void main(String[] args) {
        FloodFill floodFill = new FloodFill();

        int[][] image = {
            {1, 1, 1},
            {1, 1, 0},
            {1, 0, 1}
        };
        
        int sr = 1, sc = 1, newColor = 2;

        int[][] result = floodFill.floodFill(image, sr, sc, newColor);

        // Print the modified image
        for (int[] row : result) {
            for (int pixel : row) {
                System.out.print(pixel + " ");
            }
            System.out.println();
        }
    }
}

```

# Rotten Oranges Problem

## Problem Statement

You are given an `m x n` grid `grid` where:
- `grid[i][j]` = `0` represents an empty cell.
- `grid[i][j]` = `1` represents a fresh orange.
- `grid[i][j]` = `2` represents a rotten orange.

Every minute, any fresh orange that is adjacent (up, down, left, right) to a rotten orange becomes rotten. 

Return the **minimum number of minutes** that must elapse until no cell has a fresh orange. If it is impossible for every fresh orange to become rotten, return `-1`.

```plaintext
grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 2]
]
```

*** output ***
``` plaintext
4
```
### BFS
```java
import java.util.LinkedList;
import java.util.Queue;

public class RottenOranges {
    
    // Directions for moving up, down, left, and right
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int freshOranges = 0;
        
        // Step 1: Add all initially rotten oranges to the queue and count fresh oranges
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j});
                } else if (grid[i][j] == 1) {
                    freshOranges++;
                }
            }
        }
        
        // If there are no fresh oranges, return 0
        if (freshOranges == 0) return 0;
        
        int minutes = 0;
        
        // Step 2: Perform BFS to rot fresh oranges
        while (!queue.isEmpty()) {
            int size = queue.size();
            boolean rotted = false;
            
            for (int i = 0; i < size; i++) {
                int[] current = queue.poll();
                int r = current[0], c = current[1];

                // Check all 4 possible directions
                for (int[] dir : DIRECTIONS) {
                    int newRow = r + dir[0];
                    int newCol = c + dir[1];

                    // If the new position is within bounds and has a fresh orange
                    if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] == 1) {
                        grid[newRow][newCol] = 2; // Make it rotten
                        queue.offer(new int[]{newRow, newCol});
                        freshOranges--; // Reduce count of fresh oranges
                        rotted = true;
                    }
                }
            }
            
            if (rotted) minutes++; // Increase time if any fresh oranges were rotted
        }
        
        // If there are still fresh oranges left, return -1
        return freshOranges == 0 ? minutes : -1;
    }

    // Test the function
    public static void main(String[] args) {
        RottenOranges solution = new RottenOranges();
        
        int[][] grid1 = {
            {2, 1, 1},
            {1, 1, 0},
            {0, 1, 2}
        };
        System.out.println(solution.orangesRotting(grid1)); // Output: 4

        int[][] grid2 = {
            {2, 1, 0, 2},
            {1, 1, 0, 0},
            {0, 0, 1, 2}
        };
        System.out.println(solution.orangesRotting(grid2)); // Output: -1
    }
}
```

# Surrounded Regions

## Problem Statement
Given an `m x n` board containing `'X'` and `'O'`, capture all regions surrounded by `'X'`. A region is captured by flipping all `'O'`s that are completely surrounded by `'X'` into `'X'`. An `'O'` on the border or connected to a border `'O'` should **not** be flipped.

## Input
- A 2D grid `board` of dimensions `m x n`.
- Each cell contains either `'X'` or `'O'`.

## Output
- Modify the board **in-place**, replacing surrounded `'O'` cells with `'X'`.

## Example 1:
### **Input:**
```
X X X X
X O O X
X X O X
X O X X
```
### **Output:**
```
X X X X
X X X X
X X X X
X O X X
```

```java
import java.util.LinkedList;
import java.util.Queue;

public class SurroundedRegions {
    
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        Queue<int[]> queue = new LinkedList<>();

        // Step 1: Find all border 'O's and mark them as 'B' (temporary marker)
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') bfs(board, i, 0, queue);
            if (board[i][n - 1] == 'O') bfs(board, i, n - 1, queue);
        }
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') bfs(board, 0, j, queue);
            if (board[m - 1][j] == 'O') bfs(board, m - 1, j, queue);
        }

        // Step 2: Convert all remaining 'O' to 'X' (since they are surrounded)
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';  // Surrounded regions
                } else if (board[i][j] == 'B') {
                    board[i][j] = 'O';  // Restore non-surrounded regions
                }
            }
        }
    }

    private void bfs(char[][] board, int r, int c, Queue<int[]> queue) {
        queue.offer(new int[]{r, c});
        board[r][c] = 'B'; // Mark as visited (temporary)

        int m = board.length, n = board[0].length;
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int row = cell[0], col = cell[1];

            for (int[] dir : DIRECTIONS) {
                int newRow = row + dir[0], newCol = col + dir[1];

                // Check bounds and process only 'O' cells
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && board[newRow][newCol] == 'O') {
                    board[newRow][newCol] = 'B';
                    queue.offer(new int[]{newRow, newCol});
                }
            }
        }
    }

    // Test the function
    public static void main(String[] args) {
        SurroundedRegions sr = new SurroundedRegions();

        char[][] board = {
            {'X', 'X', 'X', 'X'},
            {'X', 'O', 'O', 'X'},
            {'X', 'X', 'O', 'X'},
            {'X', 'O', 'X', 'X'}
        };

        sr.solve(board);

        // Print the modified board
        for (char[] row : board) {
            for (char cell : row) {
                System.out.print(cell + " ");
            }
            System.out.println();
        }
    }
}
```

# Number of Enclaves

## Problem Statement
You are given a `m x n` binary matrix `grid` where `0` represents water and `1` represents land. An enclave is a region of land (`1`s) that is completely surrounded by water (`0`s) on all four sides **and is not connected to the border** of the grid.

Return the number of land cells in all enclaves.

## Input
- A 2D grid `grid` of dimensions `m x n`.
- Each cell contains either `0` (water) or `1` (land).

## Output
- An integer representing the total number of land cells that form enclaves (not connected to the boundary).

## Example 1:
### **Input:**
```
grid = [
  [0, 0, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]
```
### **Output:**
```
3
```
```java
import java.util.LinkedList;
import java.util.Queue;

public class NumberOfEnclaves {
    
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    public int numEnclaves(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        
        // Step 1: Find all border '1's and mark them as visited
        for (int i = 0; i < m; i++) {
            if (grid[i][0] == 1) bfs(grid, i, 0, queue);
            if (grid[i][n - 1] == 1) bfs(grid, i, n - 1, queue);
        }
        for (int j = 0; j < n; j++) {
            if (grid[0][j] == 1) bfs(grid, 0, j, queue);
            if (grid[m - 1][j] == 1) bfs(grid, m - 1, j, queue);
        }
        
        // Step 2: Count the remaining land cells (which are enclaves)
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    count++;
                }
            }
        }
        return count;
    }
    
    private void bfs(int[][] grid, int r, int c, Queue<int[]> queue) {
        queue.offer(new int[]{r, c});
        grid[r][c] = 0; // Mark as water (visited)
        
        int m = grid.length, n = grid[0].length;
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int row = cell[0], col = cell[1];
            
            for (int[] dir : DIRECTIONS) {
                int newRow = row + dir[0], newCol = col + dir[1];
                
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && grid[newRow][newCol] == 1) {
                    grid[newRow][newCol] = 0; // Mark as water
                    queue.offer(new int[]{newRow, newCol});
                }
            }
        }
    }
    
    // Test function
    public static void main(String[] args) {
        NumberOfEnclaves solution = new NumberOfEnclaves();
        int[][] grid = {
            {0, 0, 0, 0},
            {1, 0, 1, 0},
            {0, 1, 1, 0},
            {0, 0, 0, 0}
        };
        System.out.println(solution.numEnclaves(grid)); // Output: 3
    }
}
```
# Number of Distinct Islands

## Problem Statement
You are given an `m x n` binary matrix `grid` where `0` represents water and `1` represents land. Two islands are considered the same if one island can be translated (shifted) to match the other.

Return the number of **distinct** islands in the grid.

## Input
- A 2D grid `grid` of dimensions `m x n`.
- Each cell contains either `0` (water) or `1` (land).

## Output
- An integer representing the total number of **distinct** islands.

## Example 1:
### **Input:**
```
grid = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 1]
]
```
### **Output:**
```
1
```

## Constraints:
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.

## Explanation:
1. Two islands are considered the same if they have the **same shape** (ignoring position).
2. Islands that have different shapes count as separate distinct islands.
3. This problem requires finding **unique island shapes** regardless of their locations.

```java
import java.util.HashSet;
import java.util.Set;

public class DistinctIslands {
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    
    public int numDistinctIslands(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Set<String> uniqueIslands = new HashSet<>();
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    StringBuilder shape = new StringBuilder();
                    dfs(grid, i, j, i, j, shape);
                    uniqueIslands.add(shape.toString());
                }
            }
        }
        
        return uniqueIslands.size();
    }
    
    private void dfs(int[][] grid, int baseRow, int baseCol, int row, int col, StringBuilder shape) {
        int m = grid.length, n = grid[0].length;
        if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] == 0) {
            return;
        }
        
        grid[row][col] = 0; // Mark as visited
        shape.append((row - baseRow) + "" + (col - baseCol) + ",");
        
        for (int[] dir : DIRECTIONS) {
            dfs(grid, baseRow, baseCol, row + dir[0], col + dir[1], shape);
        }
    }
    
    public static void main(String[] args) {
        DistinctIslands solution = new DistinctIslands();
        int[][] grid = {
            {1, 1, 0, 0, 0},
            {1, 1, 0, 0, 0},
            {0, 0, 0, 1, 1},
            {0, 0, 0, 1, 1}
        };
        System.out.println(solution.numDistinctIslands(grid)); // Output: 1
    }
}
```

# Bipartite Graph

## Problem Statement
A graph is **bipartite** if we can split its set of `V` vertices into two independent subsets `U` and `V` such that every edge connects a vertex in `U` to a vertex in `V`.

Given an **undirected** graph represented as an adjacency list, determine if the graph is **bipartite**.

## Input
- An integer `V` representing the number of vertices.
- A list of edges where each edge is represented as `[u, v]`, denoting an undirected edge between vertex `u` and vertex `v`.

## Output
- Return `true` if the graph is **bipartite**, otherwise return `false`.

## Example 1:
### **Input:**
```
V = 4
edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0]
]
```
### **Output:**
```
true
```

## Example 2:
### **Input:**
```
V = 3
edges = [
  [0, 1],
  [1, 2],
  [2, 0]
]
```
### **Output:**
```
false
```

## Explanation:
1. If a graph can be colored using **two colors** such that no two adjacent nodes have the same color, then the graph is bipartite.
2. A graph **containing an odd-length cycle** is **not bipartite**.

---

## BFS Approach (Java)
```java
import java.util.*;

public class BipartiteGraphBFS {
    public boolean isBipartite(int V, List<int[]> edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < V; i++) graph.add(new ArrayList<>());
        
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        
        int[] colors = new int[V];
        Arrays.fill(colors, -1);
        
        for (int i = 0; i < V; i++) {
            if (colors[i] == -1) {
                if (!bfsCheck(graph, i, colors)) return false;
            }
        }
        return true;
    }
    
    private boolean bfsCheck(List<List<Integer>> graph, int src, int[] colors) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(src);
        colors[src] = 0;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int neighbor : graph.get(node)) {
                if (colors[neighbor] == -1) {
                    colors[neighbor] = 1 - colors[node];
                    queue.add(neighbor);
                } else if (colors[neighbor] == colors[node]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        BipartiteGraphBFS solution = new BipartiteGraphBFS();
        List<int[]> edges = Arrays.asList(new int[]{0,1}, new int[]{1,2}, new int[]{2,3}, new int[]{3,0});
        System.out.println(solution.isBipartite(4, edges)); // Output: true
    }
}
```

---

## DFS Approach (Java)
```java
import java.util.*;

public class BipartiteGraphDFS {
    public boolean isBipartite(int V, List<int[]> edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < V; i++) graph.add(new ArrayList<>());
        
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }
        
        int[] colors = new int[V];
        Arrays.fill(colors, -1);
        
        for (int i = 0; i < V; i++) {
            if (colors[i] == -1) {
                if (!dfsCheck(graph, i, 0, colors)) return false;
            }
        }
        return true;
    }
    
    private boolean dfsCheck(List<List<Integer>> graph, int node, int color, int[] colors) {
        colors[node] = color;
        for (int neighbor : graph.get(node)) {
            if (colors[neighbor] == -1) {
                if (!dfsCheck(graph, neighbor, 1 - color, colors)) return false;
            } else if (colors[neighbor] == colors[node]) {
                return false;
            }
        }
        return true;
    }
    
    public static void main(String[] args) {
        BipartiteGraphDFS solution = new BipartiteGraphDFS();
        List<int[]> edges = Arrays.asList(new int[]{0,1}, new int[]{1,2}, new int[]{2,3}, new int[]{3,0});
        System.out.println(solution.isBipartite(4, edges)); // Output: true
    }
}
```

# Topological Sort Problem

## Problem Statement

Given a directed acyclic graph (DAG), you are required to find a topological ordering of its vertices. A topological order of a directed graph is a linear ordering of its vertices such that for every directed edge \( uv \), vertex \( u \) comes before \( v \) in the ordering.

### Input
- A directed graph \( G \) with \( V \) vertices and \( E \) edges.
- The graph is represented as an adjacency list.

### Output
- A topological sort of the graph, i.e., a list of vertices in a linear order.

### Constraints
- The graph is a Directed Acyclic Graph (DAG).
- There can be multiple valid topological orders for a given graph.

### Example

```plaintext
Input: 
Graph: 
    5 -> 2
    5 -> 0
    4 -> 0
    4 -> 1
    2 -> 3
    3 -> 1

Output:
Topological Sort: [5, 4, 2, 3, 1, 0]
```

### BFS (Khans algo)
```java
import java.util.*;

public class TopologicalSortBFS {
    public List<Integer> topologicalSort(int V, List<List<Integer>> graph) {
        int[] inDegree = new int[V];
        for (List<Integer> neighbors : graph) {
            for (int neighbor : neighbors) {
                inDegree[neighbor]++;
            }
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        List<Integer> result = new ArrayList<>();
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            result.add(node);
            
            for (int neighbor : graph.get(node)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        return result.size() == V ? result : new ArrayList<>();
    }

    public static void main(String[] args) {
        TopologicalSortBFS ts = new TopologicalSortBFS();
        List<List<Integer>> graph = new ArrayList<>();
        
        for (int i = 0; i < 6; i++) {
            graph.add(new ArrayList<>());
        }
        
        graph.get(5).add(2);
        graph.get(5).add(0);
        graph.get(4).add(0);
        graph.get(4).add(1);
        graph.get(2).add(3);
        graph.get(3).add(1);
        
        System.out.println(ts.topologicalSort(6, graph));
    }
}
```

### DFS
```java
import java.util.*;

public class TopologicalSortDFS {
    public List<Integer> topologicalSort(int V, List<List<Integer>> graph) {
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < V; i++) {
            if (!visited[i]) {
                dfs(graph, i, visited, stack);
            }
        }
        
        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
        
        return result;
    }
    
    private void dfs(List<List<Integer>> graph, int node, boolean[] visited, Stack<Integer> stack) {
        visited[node] = true;
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                dfs(graph, neighbor, visited, stack);
            }
        }
        
        stack.push(node);
    }

    public static void main(String[] args) {
        TopologicalSortDFS ts = new TopologicalSortDFS();
        List<List<Integer>> graph = new ArrayList<>();
        
        for (int i = 0; i < 6; i++) {
            graph.add(new ArrayList<>());
        }
        
        graph.get(5).add(2);
        graph.get(5).add(0);
        graph.get(4).add(0);
        graph.get(4).add(1);
        graph.get(2).add(3);
        graph.get(3).add(1);
        
        System.out.println(ts.topologicalSort(6, graph));
    }
}
```

# Detect Cycle in a Directed Graph

## Problem Statement

Given a directed graph, your task is to detect if the graph contains a cycle. A cycle in a directed graph is a path that starts and ends at the same vertex, with all edges in the path following the direction of the graph.

### Input
- A directed graph \( G \) with \( V \) vertices and \( E \) edges.
- The graph is represented as an adjacency list.

### Output
- Return `true` if there is a cycle in the graph, otherwise return `false`.

### Constraints
- The graph may have multiple vertices and edges.
- The graph can be empty or contain only a single node.

### Example

```plaintext
Input: 
Graph:
    0 -> 1
    1 -> 2
    2 -> 0

Output:
Cycle Detected: true

Input:
Graph:
    0 -> 1
    1 -> 2
    2 -> 3

Output:
Cycle Detected: false
```
### DFS 
```java
import java.util.*;

public class DetectCycleDFS {
    public boolean hasCycle(int V, List<List<Integer>> graph) {
        int[] visited = new int[V]; // 0 = unvisited, 1 = visiting, 2 = visited
        
        for (int i = 0; i < V; i++) {
            if (visited[i] == 0) {
                if (dfs(graph, i, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private boolean dfs(List<List<Integer>> graph, int node, int[] visited) {
        if (visited[node] == 1) { // Node is in the recursion stack, cycle found
            return true;
        }
        if (visited[node] == 2) { // Node is already fully processed
            return false;
        }
        
        visited[node] = 1; // Mark node as being visited
        
        for (int neighbor : graph.get(node)) {
            if (dfs(graph, neighbor, visited)) {
                return true;
            }
        }
        
        visited[node] = 2; // Mark node as fully processed
        return false;
    }

    public static void main(String[] args) {
        DetectCycleDFS cycleDetector = new DetectCycleDFS();
        List<List<Integer>> graph = new ArrayList<>();
        
        for (int i = 0; i < 4; i++) {
            graph.add(new ArrayList<>());
        }
        
        graph.get(0).add(1);
        graph.get(1).add(2);
        graph.get(2).add(0);
        
        System.out.println(cycleDetector.hasCycle(4, graph)); // Output: true
    }
}
```

###BFS
```java
import java.util.*;

public class DetectCycleBFS {
    public boolean hasCycle(int V, List<List<Integer>> graph) {
        int[] inDegree = new int[V];
        
        // Calculate in-degree for each vertex
        for (List<Integer> neighbors : graph) {
            for (int neighbor : neighbors) {
                inDegree[neighbor]++;
            }
        }
        
        Queue<Integer> queue = new LinkedList<>();
        
        // Add vertices with in-degree 0 to the queue
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        int visitedCount = 0;
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            visitedCount++;
            
            for (int neighbor : graph.get(node)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // If all vertices are visited, no cycle exists
        return visitedCount != V;
    }

    public static void main(String[] args) {
        DetectCycleBFS cycleDetector = new DetectCycleBFS();
        List<List<Integer>> graph = new ArrayList<>();
        
        for (int i = 0; i < 4; i++) {
            graph.add(new ArrayList<>());
        }
        
        graph.get(0).add(1);
        graph.get(1).add(2);
        graph.get(2).add(0);
        
        System.out.println(cycleDetector.hasCycle(4, graph)); // Output: true
    }
}
```

# Course Schedule 1

## Problem Statement

You are given a list of courses and their prerequisites. You need to determine if it is possible to finish all the courses. If it is possible, return `true`, otherwise return `false`.

### Input
- An integer `numCourses` representing the total number of courses.
- A 2D array `prerequisites`, where each element is a pair `[course, prerequisite]`, meaning that you must take the course `prerequisite` before the course `course`.

### Output
- Return `true` if it is possible to finish all courses (i.e., no cycle exists), otherwise return `false`.

### Constraints
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`

### Example 1

```plaintext
Input:
numCourses = 2
prerequisites = [[1, 0]]

Output:
true

Explanation:
There are 2 courses. To finish course 1, you need to take course 0. So, it is possible to finish all courses.

Input:
numCourses = 2
prerequisites = [[1, 0], [0, 1]]

Output:
false

Explanation:
There are a total of 2 courses. To finish course 1, you need to take course 0. But to finish course 0, you need to take course 1. So, a cycle exists and it is impossible to finish all courses.

```
### BFS
```java
import java.util.*;

public class CourseScheduleBFS {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> graph = new ArrayList<>();
        
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }
        
        // Build the graph and in-degree array
        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prereq = pair[1];
            graph.get(prereq).add(course);
            inDegree[course]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        int count = 0;
        
        // Add courses with no prerequisites (in-degree 0) to the queue
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        // Process each course from the queue
        while (!queue.isEmpty()) {
            int course = queue.poll();
            count++;
            
            for (int neighbor : graph.get(course)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // If all courses are processed, return true, otherwise false
        return count == numCourses;
    }

    public static void main(String[] args) {
        CourseScheduleBFS courseScheduler = new CourseScheduleBFS();
        
        int numCourses1 = 2;
        int[][] prerequisites1 = {{1, 0}};
        System.out.println(courseScheduler.canFinish(numCourses1, prerequisites1)); // Output: true
        
        int numCourses2 = 2;
        int[][] prerequisites2 = {{1, 0}, {0, 1}};
        System.out.println(courseScheduler.canFinish(numCourses2, prerequisites2)); // Output: false
    }
}
```
```DFS
import java.util.*;

public class CourseScheduleDFS {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }
        
        // Build the graph
        for (int[] pair : prerequisites) {
            graph.get(pair[1]).add(pair[0]);
        }
        
        int[] visited = new int[numCourses]; // 0 = unvisited, 1 = visiting, 2 = visited
        
        // Perform DFS on each course
        for (int i = 0; i < numCourses; i++) {
            if (visited[i] == 0) { // If the course is unvisited
                if (hasCycle(graph, i, visited)) {
                    return false; // Cycle detected
                }
            }
        }
        
        return true; // No cycle detected
    }
    
    private boolean hasCycle(List<List<Integer>> graph, int node, int[] visited) {
        if (visited[node] == 1) {
            return true; // Cycle detected
        }
        if (visited[node] == 2) {
            return false; // Already fully processed, no cycle
        }
        
        visited[node] = 1; // Mark the node as visiting
        
        // Visit all neighbors
        for (int neighbor : graph.get(node)) {
            if (hasCycle(graph, neighbor, visited)) {
                return true; // Cycle detected in neighbor
            }
        }
        
        visited[node] = 2; // Mark the node as fully visited
        return false; // No cycle detected
    }

    public static void main(String[] args) {
        CourseScheduleDFS courseScheduler = new CourseScheduleDFS();
        
        int numCourses1 = 2;
        int[][] prerequisites1 = {{1, 0}};
        System.out.println(courseScheduler.canFinish(numCourses1, prerequisites1)); // Output: true
        
        int numCourses2 = 2;
        int[][] prerequisites2 = {{1, 0}, {0, 1}};
        System.out.println(courseScheduler.canFinish(numCourses2, prerequisites2)); // Output: false
    }
}
```

# Eventual Safe States

## Problem Statement

A **directed graph** is given with `n` nodes, where each node is labeled from `0` to `n-1`. You are given a list of `n` arrays `graph`, where each `graph[i]` is a list of nodes that node `i` points to.

We need to determine which nodes are **safe**. A node `i` is safe if:
- It does not lead to a cycle, and
- All paths starting from it eventually reach a terminal node (a node with no outgoing edges).

Return a list of all the nodes that are **safe**.

### Input:
- An integer `n` representing the number of nodes.
- A 2D array `graph` where each `graph[i]` contains a list of nodes that node `i` points to.

### Output:
- A list of all the nodes that are **safe**.

### Constraints:
- `1 <= n <= 10000`
- `0 <= graph[i].length <= n`
- `0 <= graph[i][j] < n`

### Example 1:

```plaintext
Input:
graph = [[1,2],[2,3],[5],[0],[5],[],[]]

Output:
[2, 4, 5, 6]

Explanation:
Nodes 2, 4, 5, and 6 are safe because:
- Node 2 has no outgoing edges.
- Node 4 has no outgoing edges.
- Node 5 has no outgoing edges.
- Node 6 has no outgoing edges.

Input:
graph = [[1,2,3,4],[1,2],[3,4],[],[5],[]]

Output:
[4, 5]

```

### Approach for Eventual Safe States

### Problem Understanding

Given a directed graph with `n` nodes, each node can point to other nodes, and we need to determine which nodes are "safe". A node is considered **safe** if it:
- Does not lead to a cycle, and
- All paths starting from it eventually lead to a terminal node (a node with no outgoing edges).

## Approach

There are two possible approaches to solve the **Eventual Safe States** problem: **BFS (Kahn’s Algorithm for Topological Sort)** and **DFS (Cycle Detection)**.

### 1. BFS Approach (Kahn's Algorithm for Topological Sort)

#### Steps:
1. **Reverse the graph**: 
   - Reverse all the edges of the given directed graph. This helps in processing nodes that can reach terminal nodes.
   
2. **Calculate In-Degree**:
   - Compute the **in-degree** for each node. The in-degree of a node represents how many nodes point to it.
   - If a node has zero in-degree, it means no other node is dependent on it, so it must be safe.

3. **Topological Sort**:
   - Use a **queue** to store nodes with zero in-degree.
   - Process nodes from the queue and add their neighbors to the queue as their in-degrees reduce to zero.
   - As we process the nodes, we can mark them as **safe**.

4. **Final Check**:
   - After processing all nodes, the ones that are marked as safe are the eventual safe nodes.

#### Time Complexity:
- **O(V + E)** where `V` is the number of nodes and `E` is the number of edges, as each node and edge is processed once.

#### Space Complexity:
- **O(V + E)** for storing the graph and auxiliary data structures like in-degrees and queues.

### 2. DFS Approach (Cycle Detection)

#### Steps:
1. **Track the State of Each Node**:
   - Use an array `visited[]` to track the state of each node:
     - `0` for unvisited nodes.
     - `1` for nodes currently being visited (part of the current DFS stack).
     - `2` for nodes that have been fully processed (safe).

2. **DFS Traversal**:
   - For each unvisited node, start a DFS traversal:
     - If we encounter a node that is currently being visited (i.e., in the recursion stack), it means there's a cycle, and the node is unsafe.
     - If the DFS reaches a node that has no outgoing edges (terminal node), it is safe.
     - Mark nodes that do not lead to cycles as safe after the DFS finishes.
   
3. **Return Safe Nodes**:
   - After all DFS traversals, the nodes marked as safe will be the eventual safe nodes.

#### Time Complexity:
- **O(V + E)** where `V` is the number of nodes and `E` is the number of edges, as we visit each node and edge once during the DFS traversal.

#### Space Complexity:
- **O(V + E)** for storing the graph, visited states, and recursion stack.

### Conclusion:
- **BFS Approach**: Suitable when you want to detect safe nodes via topological sorting, leveraging in-degrees to identify terminal nodes.
- **DFS Approach**: Effective for cycle detection and marking nodes as safe through a recursive exploration of all paths from a node.


### BFS
```java
import java.util.*;

public class EventualSafeStatesBFS {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<Integer> safeNodes = new ArrayList<>();
        
        // Step 1: Reverse the graph and compute in-degrees
        List<List<Integer>> reverseGraph = new ArrayList<>();
        int[] inDegree = new int[n];
        
        for (int i = 0; i < n; i++) {
            reverseGraph.add(new ArrayList<>());
        }
        
        for (int i = 0; i < n; i++) {
            for (int neighbor : graph[i]) {
                reverseGraph.get(neighbor).add(i);
                inDegree[i]++;
            }
        }
        
        // Step 2: BFS on the reversed graph
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            safeNodes.add(node);
            
            for (int neighbor : reverseGraph.get(node)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        
        // Sort the safe nodes for final output
        Collections.sort(safeNodes);
        return safeNodes;
    }

    public static void main(String[] args) {
        EventualSafeStatesBFS solution = new EventualSafeStatesBFS();
        int[][] graph1 = {{1,2},{2,3},{5},{0},{5},[],[]};
        System.out.println(solution.eventualSafeNodes(graph1)); // Output: [2, 4, 5, 6]
        
        int[][] graph2 = {{1,2,3,4},{1,2},{3,4},[],[5],[]};
        System.out.println(solution.eventualSafeNodes(graph2)); // Output: [4, 5]
    }
}
```

### DFS
```java
import java.util.*;

public class EventualSafeStatesDFS {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<Integer> safeNodes = new ArrayList<>();
        int[] visited = new int[n]; // 0 = unvisited, 1 = visiting, 2 = visited
        
        for (int i = 0; i < n; i++) {
            if (visited[i] == 0) {
                if (isSafe(graph, i, visited)) {
                    safeNodes.add(i);
                }
            }
        }
        
        return safeNodes;
    }

    private boolean isSafe(int[][] graph, int node, int[] visited) {
        if (visited[node] == 1) {
            return false; // Cycle detected
        }
        if (visited[node] == 2) {
            return true; // Already fully processed (safe)
        }
        
        visited[node] = 1; // Mark as visiting
        
        for (int neighbor : graph[node]) {
            if (!isSafe(graph, neighbor, visited)) {
                return false; // Unsafe node
            }
        }
        
        visited[node] = 2; // Mark as visited (safe)
        return true;
    }

    public static void main(String[] args) {
        EventualSafeStatesDFS solution = new EventualSafeStatesDFS();
        int[][] graph1 = {{1,2},{2,3},{5},{0},{5},[],[]};
        System.out.println(solution.eventualSafeNodes(graph1)); // Output: [2, 4, 5, 6]
        
        int[][] graph2 = {{1,2,3,4},{1,2},{3,4},[],[5],[]};
        System.out.println(solution.eventualSafeNodes(graph2)); // Output: [4, 5]
    }
}
```

# Alien Dictionary

## Problem Statement

There is a new alien language that uses the English alphabet. However, the order of the letters is different from the standard English alphabet. You are given a list of words sorted lexicographically by the rules of this alien language. 

You need to determine the correct order of the letters in the alien language.

### Input:
- An integer `n`, representing the number of words.
- A list of `n` strings `words` representing the dictionary sorted lexicographically in the alien language.

### Output:
- A string representing the order of characters in the alien language. If there is no valid order (due to a cycle), return an empty string.

### Constraints:
- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- The characters in words are lowercase English letters, and there are at most 26 different letters in the alien language.

### Example 1

```plaintext
Input:
words = ["wrt", "wrf", "er", "ett", "rftt"]

Output:
"wertf"

Explanation:
The correct order of characters is:
- "w" comes before "r", "r" comes before "t", and so on.

Input:
words = ["z", "x"]

Output:
"zx"

Explanation:
The correct order is "z" before "x".

```
### BFS-based Algorithm Summary:
1. **Initialize graph**: For each word, create a directed edge between characters.
2. **Compute in-degrees**: For each character, track how many characters come before it.
3. **Process nodes with zero in-degree**: Use BFS to add nodes to the result, reducing in-degree of their neighbors.
4. **Check for cycles**: If any node has an in-degree > 0 after BFS, return an empty string (cycle detected).

### BFS
```java
import java.util.*;

public class AlienDictionary {
    public String alienOrder(String[] words) {
        if (words == null || words.length == 0) {
            return "";
        }
        
        // Step 1: Build the graph and calculate in-degrees
        Map<Character, Set<Character>> graph = new HashMap<>();
        Map<Character, Integer> inDegree = new HashMap<>();
        
        for (String word : words) {
            for (char c : word.toCharArray()) {
                inDegree.put(c, 0); // Initialize in-degree to 0 for each unique character
                graph.put(c, new HashSet<>());
            }
        }
        
        // Build the graph by comparing adjacent words
        for (int i = 0; i < words.length - 1; i++) {
            String word1 = words[i];
            String word2 = words[i + 1];
            int minLength = Math.min(word1.length(), word2.length());
            
            // Compare each character of both words
            for (int j = 0; j < minLength; j++) {
                char parent = word1.charAt(j);
                char child = word2.charAt(j);
                
                if (parent != child) {
                    // If there's no edge between parent and child, create it
                    if (!graph.get(parent).contains(child)) {
                        graph.get(parent).add(child);
                        inDegree.put(child, inDegree.get(child) + 1);
                    }
                    break; // Stop at the first different character
                }
            }
        }

        // Step 2: Perform BFS (Kahn's Algorithm)
        Queue<Character> queue = new LinkedList<>();
        for (char c : inDegree.keySet()) {
            if (inDegree.get(c) == 0) {
                queue.offer(c); // Add characters with 0 in-degree to the queue
            }
        }
        
        StringBuilder result = new StringBuilder();
        
        while (!queue.isEmpty()) {
            char current = queue.poll();
            result.append(current);
            
            for (char neighbor : graph.get(current)) {
                inDegree.put(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // If we have processed all characters, return the result
        if (result.length() == inDegree.size()) {
            return result.toString();
        }
        
        // Cycle detected, return an empty string
        return "";
    }

    public static void main(String[] args) {
        AlienDictionary solution = new AlienDictionary();
        
        String[] words1 = {"wrt", "wrf", "er", "ett", "rftt"};
        System.out.println(solution.alienOrder(words1)); // Output: "wertf"
        
        String[] words2 = {"z", "x"};
        System.out.println(solution.alienOrder(words2)); // Output: "zx"
        
        String[] words3 = {"abc", "ab"};
        System.out.println(solution.alienOrder(words3)); // Output: ""
    }
}
```
# Shortest Path in Directed Acyclic Graph (DAG) - Topological Sort

## Problem Statement

You are given a **Directed Acyclic Graph (DAG)** and a source node `src`. The task is to find the **shortest path** from the source node to all other nodes in the graph. The graph does not have cycles, and it can have any number of nodes and edges. Each edge has a non-negative weight.

### Input:
- An integer `V`, the number of nodes in the graph.
- An integer `E`, the number of edges in the graph.
- A list of `E` edges, where each edge is represented by a pair `(u, v, w)` indicating a directed edge from node `u` to node `v` with weight `w`.
- An integer `src`, the source node.

### Output:
- An array of integers representing the shortest distances from the source node to all other nodes. If a node is unreachable, return `Integer.MAX_VALUE` for that node.

### Constraints:
- `1 <= V <= 10^4`
- `1 <= E <= 10^5`
- `0 <= w <= 10^4`

### Example:

#### Example 1:
```plaintext
Input:
V = 6, E = 7
edges = [(0, 1, 5), (0, 2, 3), (1, 2, 2), (1, 3, 6), (2, 3, 7), (2, 4, 4), (3, 4, 2)]
src = 0

Output:
[0, 5, 3, 11, 7]

Input:
V = 5, E = 6
edges = [(0, 1, 2), (0, 3, 6), (1, 2, 3), (1, 3, 2), (2, 4, 1), (3, 4, 5)]
src = 0

Output:
[0, 2, 5, 6, 6]
```
### Approach
#### 3. **Steps**:
   - **Topological Sort**: Perform **Kahn’s algorithm** or a **DFS-based topological sort**.
   - **Initialization**: Set the distance of the source node as `0`, and all other nodes as `Integer.MAX_VALUE`.
   - **BFS Traversal**: For each node in topological order, relax the edges.

```java
import java.util.*;

public class ShortestPathDAG {
    static class Edge {
        int v, weight;
        Edge(int v, int weight) {
            this.v = v;
            this.weight = weight;
        }
    }

    public int[] shortestPath(int V, List<Edge>[] graph, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        // Step 1: Topological Sort (using Kahn's Algorithm)
        Queue<Integer> queue = new LinkedList<>();
        int[] inDegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (Edge edge : graph[i]) {
                inDegree[edge.v]++;
            }
        }

        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }

        // Step 2: Process nodes in topological order
        while (!queue.isEmpty()) {
            int u = queue.poll();

            // Relax edges for the current node
            for (Edge e : graph[u]) {
                if (dist[u] != Integer.MAX_VALUE && dist[u] + e.weight < dist[e.v]) {
                    dist[e.v] = dist[u] + e.weight;
                }
                inDegree[e.v]--;
                if (inDegree[e.v] == 0) {
                    queue.add(e.v);
                }
            }
        }

        return dist;
    }

    public static void main(String[] args) {
        ShortestPathDAG sp = new ShortestPathDAG();
        int V = 6;
        List<Edge>[] graph = new List[V];

        // Initialize adjacency list
        for (int i = 0; i < V; i++) {
            graph[i] = new ArrayList<>();
        }

        // Add edges to the graph
        graph[0].add(new Edge(1, 5));
        graph[0].add(new Edge(2, 3));
        graph[1].add(new Edge(2, 2));
        graph[1].add(new Edge(3, 6));
        graph[2].add(new Edge(3, 7));
        graph[2].add(new Edge(4, 4));
        graph[3].add(new Edge(4, 2));

        // Call the shortestPath function
        int[] dist = sp.shortestPath(V, graph, 0);

        // Print the result
        System.out.println(Arrays.toString(dist));  // Output: [0, 5, 3, 11, 7]
    }
}
```

### Shortest Path in a Directed Acyclic Graph (DAG) - BFS Approach

#### Understanding the Concept
In a **Directed Acyclic Graph (DAG)**, we can efficiently compute the **shortest path** from a given source node using **Topological Sorting + BFS**.

**Key Concept:**
- If a node is **processed** in **topological order**, its shortest path is **finalized**.
- We then **use its shortest path to update its dependent nodes**.
- Even if a node is dependent on multiple parents, we only take the **minimum distance**.

#### Example Graph
Consider the following **weighted DAG**:
```
    0 → 1 (5)
    0 → 2 (3)
    1 → 2 (2)
    1 → 3 (6)
    2 → 3 (7)
    2 → 4 (4)
    3 → 4 (2)
```

#### Processing Order (Topological Sort)
Assume we obtain the **topological order** as:
```
0 → 1 → 2 → 3 → 4
```

### Step-by-Step Processing

#### **Processing 0**
```
dist[1] = min(∞, dist[0] + 5) = 5
dist[2] = min(∞, dist[0] + 3) = 3
```

#### **Processing 1**
```
dist[2] = min(3, dist[1] + 2) = 3  (NO UPDATE, as 3 is already shorter)
dist[3] = min(∞, dist[1] + 6) = 11
```

#### **Processing 2**
```
dist[3] = min(11, dist[2] + 7) = 10 (Updated)
dist[4] = min(∞, dist[2] + 4) = 7
```

#### **Processing 3**
```
dist[4] = min(7, dist[3] + 2) = 7 (NO UPDATE, as 7 is already shorter)
```

#### **Processing 4**
```
No outgoing edges. Processing is complete.
```

### **Key Takeaways**
1. **Once a node is processed, its shortest path is finalized.**
   - This is because **we process nodes in topological order**, ensuring dependencies are settled first.

2. **We update a node’s shortest path if it depends on multiple nodes, taking the minimum value.**
   - Example: `dist[2]` was **not updated by `dist[1]`**, as `dist[0] → 2` was already shorter.

3. **Each node is processed once, avoiding unnecessary revisits.**
   - Unlike Dijkstra’s algorithm, which needs priority queues, **topological sorting ensures nodes are processed only when their shortest path is ready.**

**Conclusion:** This approach guarantees the correct shortest path for a **DAG** in **O(V + E)** time complexity.


# Shortest Path in an Undirected Graph with Unit Weights

### Problem Statement

Given an **undirected graph** with `V` vertices and `E` edges, where each edge has a **unit weight (weight = 1)**, find the shortest path from a given **source node** `src` to all other nodes in the graph.

### Input:
- An integer `V`, representing the number of vertices in the graph.
- An integer `E`, representing the number of edges.
- A list of `E` edges, where each edge is represented as a pair `(u, v)`, indicating an undirected edge between node `u` and node `v`.
- An integer `src`, representing the source node.

### Output:
- An array of integers representing the **shortest distance** from the source node to all other nodes. If a node is unreachable, return `-1` for that node.

---

### Approach

### 1. **Graph Representation**
- We represent the graph using an **adjacency list**, where each node stores a list of its connected neighbors.

### 2. **Breadth-First Search (BFS)**
- Since all edges have the same weight (`1`), **BFS** is the optimal choice for finding the shortest path. BFS explores all nodes at the current distance before moving deeper, ensuring the shortest path is found in **O(V + E) time**.

### 3. **Algorithm Steps**
1. **Initialize Distance Array**:
   - Create an array `dist[]` of size `V`, initialized to `-1` (representing unreachable nodes).
   - Set `dist[src] = 0` (distance from source to itself is `0`).

2. **Use a Queue for BFS**:
   - Create a queue and enqueue the source node.

3. **Perform BFS Traversal**:
   - Dequeue a node `u` and visit all its neighbors `v`.
   - If `dist[v]` is `-1` (i.e., not visited), update `dist[v] = dist[u] + 1` and enqueue `v`.

4. **Return the Distance Array**:
   - The `dist[]` array now contains the shortest path from `src` to all other nodes.

### 4. **Time and Space Complexity**
- **Time Complexity**: **O(V + E)** (Each node and edge is visited once).
- **Space Complexity**: **O(V + E)** (For adjacency list and BFS queue).

---

## Java Code

```java
import java.util.*;

public class ShortestPathUndirectedUnitWeights {
    public int[] shortestPath(int V, int[][] edges, int src) {
        List<List<Integer>> graph = new ArrayList<>();
        
        // Initialize adjacency list
        for (int i = 0; i < V; i++) {
            graph.add(new ArrayList<>());
        }

        // Build the graph (Undirected)
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        // Distance array, initialized to -1 (unreachable)
        int[] dist = new int[V];
        Arrays.fill(dist, -1);
        dist[src] = 0; // Distance from source to itself is 0

        // BFS Queue
        Queue<Integer> queue = new LinkedList<>();
        queue.add(src);

        // BFS traversal
        while (!queue.isEmpty()) {
            int u = queue.poll();

            for (int v : graph.get(u)) {
                if (dist[v] == -1) { // If not visited
                    dist[v] = dist[u] + 1; // Update distance
                    queue.add(v);
                }
            }
        }

        return dist;
    }

    public static void main(String[] args) {
        ShortestPathUndirectedUnitWeights sp = new ShortestPathUndirectedUnitWeights();
        int V = 6;
        int[][] edges = {
            {0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}, {4, 5}
        };
        int src = 0;

        int[] shortestDistances = sp.shortestPath(V, edges, src);
        System.out.println(Arrays.toString(shortestDistances));
    }
}
```
## Word Ladder - I | Shortest Paths

### Problem Statement
You are given two words, `beginWord` and `endWord`, and a dictionary `wordList`. Find the length of the shortest transformation sequence from `beginWord` to `endWord`, such that:
1. Only one letter can be changed at a time.
2. Each transformed word must exist in the given `wordList`.

**Constraints:**
- Each word in `wordList` and `beginWord` have the same length.
- Only lowercase English letters are used.
- No duplicate words in `wordList`.
- It is guaranteed that `beginWord` and `endWord` are different.

### Example
#### Input:
```text
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
```
#### Output:
```text
5
```
#### Explanation:
A shortest transformation sequence is:
```
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
```
Length = **5**

### Approach
We can solve this problem using **Breadth-First Search (BFS)** since we need the shortest path. BFS explores all neighbors (one-letter transformed words) before moving deeper, ensuring the shortest sequence is found first.

#### Steps:
1. **Convert `wordList` into a Set** for quick lookups.
2. **Use a Queue** to perform BFS. Start from `beginWord`.
3. For each word in the queue:
   - Try changing each character (A-Z) to form a new word.
   - If the new word exists in `wordList`, push it into the queue.
   - Remove the word from `wordList` to avoid revisiting.
4. Repeat until `endWord` is found or queue is empty.

### Java Code
```java
import java.util.*;

public class WordLadder {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String word = queue.poll();
                if (word.equals(endWord)) return level;
                
                char[] wordChars = word.toCharArray();
                for (int j = 0; j < wordChars.length; j++) {
                    char originalChar = wordChars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == originalChar) continue;
                        wordChars[j] = c;
                        String newWord = new String(wordChars);
                        if (wordSet.contains(newWord)) {
                            queue.add(newWord);
                            wordSet.remove(newWord);
                        }
                    }
                    wordChars[j] = originalChar;
                }
            }
            level++;
        }
        
        return 0;
    }
    
    public static void main(String[] args) {
        WordLadder wl = new WordLadder();
        List<String> wordList = Arrays.asList("hot", "dot", "dog", "lot", "log", "cog");
        System.out.println(wl.ladderLength("hit", "cog", wordList));
    }
}
```

### Time Complexity Analysis
- **Each word transformation takes O(L × 26)** (L = length of word)
- **BFS runs for all words in `wordList` once** → O(N)
- **Overall Complexity:** O(N × L × 26) ≈ **O(N × L)**

### Space Complexity Analysis
- **Queue stores words → O(N)**
- **Set for word lookups → O(N)**
- **Total Space:** **O(N)**

### Summary
- BFS is used to find the shortest path.
- Each transformation is checked by changing one character at a time.
- A `Set` helps in O(1) lookups to validate transformations.
- The approach ensures that each word is processed at most once.
- 

# Dijkstra's Algorithm - Print Shortest Path

## Problem Statement
You are given a weighted graph with `V` vertices and `E` edges, and a source node `S`. Implement Dijkstra's Algorithm to find the shortest path from `S` to all other vertices and print the actual shortest path for each vertex.

## Approach
1. **Use a Priority Queue (Min-Heap):**
   - Extract the node with the smallest distance (greedy approach).
   - Update the distances of its neighboring nodes.
   
2. **Maintain Distance and Parent Arrays:**
   - `dist[]` to store the shortest known distance from the source to each node.
   - `parent[]` to track the previous node in the shortest path.

3. **Reconstruct the Path:**
   - Use `parent[]` to backtrack from the destination to the source.

## Java Code Implementation

```java
import java.util.*;

class DijkstraShortestPath {
    static class Node implements Comparable<Node> {
        int vertex, distance;
        Node(int v, int d) {
            this.vertex = v;
            this.distance = d;
        }
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }

    public static void dijkstra(int V, List<List<int[]>> graph, int source) {
        int[] dist = new int[V];
        int[] parent = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        dist[source] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(source, 0));

        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int u = current.vertex;

            for (int[] edge : graph.get(u)) {
                int v = edge[0], weight = edge[1];
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    parent[v] = u;
                    pq.add(new Node(v, dist[v]));
                }
            }
        }

        printPaths(source, dist, parent);
    }

    public static void printPaths(int source, int[] dist, int[] parent) {
        System.out.println("Shortest paths from source " + source + ":");
        for (int i = 0; i < dist.length; i++) {
            System.out.print("To " + i + " (Distance: " + dist[i] + ") Path: ");
            printPath(i, parent);
            System.out.println();
        }
    }

    private static void printPath(int v, int[] parent) {
        if (parent[v] == -1) {
            System.out.print(v);
            return;
        }
        printPath(parent[v], parent);
        System.out.print(" -> " + v);
    }

    public static void main(String[] args) {
        int V = 5; // Number of vertices
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < V; i++) graph.add(new ArrayList<>());
        
        // Adding edges: {destination, weight}
        graph.get(0).add(new int[]{1, 2});
        graph.get(0).add(new int[]{2, 4});
        graph.get(1).add(new int[]{2, 1});
        graph.get(1).add(new int[]{3, 7});
        graph.get(2).add(new int[]{4, 3});
        graph.get(3).add(new int[]{4, 1});
        
        int source = 0;
        dijkstra(V, graph, source);
    }
}
```

## Example Run
```
Shortest paths from source 0:
To 0 (Distance: 0) Path: 0
To 1 (Distance: 2) Path: 0 -> 1
To 2 (Distance: 3) Path: 0 -> 1 -> 2
To 3 (Distance: 9) Path: 0 -> 1 -> 3
To 4 (Distance: 6) Path: 0 -> 1 -> 2 -> 4
```

## Complexity Analysis
- **Priority Queue Operations:** `O((V + E) log V)`
- **Total Time Complexity:** `O(E log V)`, where `E` is the number of edges and `V` is the number of vertices.

## Summary
- Uses **Priority Queue (Min-Heap)** for efficiency.
- Maintains **distance and parent arrays**.
- **Prints the shortest path** for each node using backtracking.

# Shortest Distance in a Binary Maze

## Problem Statement
You are given a **binary grid** (maze) of size `N x M`, where:
- `0` represents an **open path** (you can walk through it).
- `1` represents a **wall** (you cannot walk through it).
- You can move **up, down, left, or right** (but not diagonally).
- Given a **source cell (sx, sy)** and a **destination cell (dx, dy)**, find the **shortest path length** from the source to the destination.
- If there is no possible path, return `-1`.

## Approach
### Why BFS Works?
- The grid can be treated as an **unweighted graph** where each cell is a node and its **adjacent 4 cells** (up, down, left, right) are its neighbors.
- **Breadth-First Search (BFS)** is optimal for finding the shortest path in an **unweighted** graph because it explores all nodes at the current level before moving to the next.
- We use a **queue** to store the `(x, y, distance)` tuple to track movement.
- A **visited array** ensures we do not revisit cells.

## Java Code

```java
import java.util.*;

class ShortestPathBinaryMaze {
    static class Cell {
        int x, y, dist;
        Cell(int x, int y, int dist) {
            this.x = x;
            this.y = y;
            this.dist = dist;
        }
    }

    public static int shortestPath(int[][] maze, int sx, int sy, int dx, int dy) {
        int N = maze.length, M = maze[0].length;
        if (maze[sx][sy] == 1 || maze[dx][dy] == 1) return -1; // No path if start or destination is blocked

        int[] dRow = {-1, 1, 0, 0}; // Directions for row movement (Up, Down, Left, Right)
        int[] dCol = {0, 0, -1, 1}; // Directions for col movement

        boolean[][] visited = new boolean[N][M];
        Queue<Cell> queue = new LinkedList<>();
        queue.add(new Cell(sx, sy, 0));
        visited[sx][sy] = true;

        while (!queue.isEmpty()) {
            Cell curr = queue.poll();
            int x = curr.x, y = curr.y, dist = curr.dist;

            if (x == dx && y == dy) return dist; // Reached the destination

            for (int i = 0; i < 4; i++) {
                int newX = x + dRow[i], newY = y + dCol[i];
                if (isValid(newX, newY, N, M, maze, visited)) {
                    visited[newX][newY] = true;
                    queue.add(new Cell(newX, newY, dist + 1));
                }
            }
        }
        return -1; // Destination unreachable
    }

    private static boolean isValid(int x, int y, int N, int M, int[][] maze, boolean[][] visited) {
        return x >= 0 && x < N && y >= 0 && y < M && maze[x][y] == 0 && !visited[x][y];
    }

    public static void main(String[] args) {
        int[][] maze = {
            {0, 1, 0, 0, 0},
            {0, 1, 0, 1, 0},
            {0, 0, 0, 1, 0},
            {1, 1, 1, 1, 0},
            {0, 0, 0, 0, 0}
        };
        int sx = 0, sy = 0, dx = 4, dy = 4;
        int shortestDist = shortestPath(maze, sx, sy, dx, dy);
        System.out.println("Shortest Path Length: " + shortestDist);
    }
}
```

## Example Run
### **Input Maze:**
```
0  1  0  0  0
0  1  0  1  0
0  0  0  1  0
1  1  1  1  0
0  0  0  0  0
```

**Source:** `(0, 0)`

**Destination:** `(4, 4)`

### **Output:**
```
Shortest Path Length: 8
```

## Complexity Analysis
- **Each cell is visited at most once** → `O(N * M)`
- **Queue operations (constant time each)** → `O(1) per operation`
- **Total Complexity:** `O(N * M)` (Optimal for grid-based shortest path problems)

# Path With Minimum Effort

## Problem Statement

You are given an `N x M` grid where each cell `(i, j)` has a height value. You need to find a path from the **top-left** corner `(0,0)` to the **bottom-right** corner `(N-1, M-1)`, minimizing the **maximum effort** required in the path.

Effort is defined as the **absolute difference** in height between two adjacent cells. Your task is to find a path where the largest height difference between consecutive cells is minimized.

### **Constraints**

- You can move **up, down, left, or right**.
- The grid will always have a valid path.

## Approach

### Why Use Dijkstra’s Algorithm?

- This problem is similar to Dijkstra’s shortest path algorithm but instead of minimizing **sum of distances**, we need to minimize the **maximum effort** in the path.
- **Priority Queue (Min-Heap)** is used to always expand the path with the least effort first.
- A **distance (effort) array** is maintained to keep track of the minimum effort required to reach each cell.

### Steps:

1. **Initialize a min-heap priority queue** and start from `(0,0)` with effort `0`.
2. **Use a distance array** (`effort[][]`), initializing all values to `Integer.MAX_VALUE`.
3. **Iterate using Dijkstra’s approach**:
   - Extract the cell with the **minimum effort**.
   - Explore its **four neighbors**.
   - If moving to a neighbor reduces the max effort seen so far, update it and push it into the queue.
4. **When reaching ****`(N-1, M-1)`****, return the minimum effort found**.

## Java Code Implementation

```java
import java.util.*;

class Tuple{
    int distance;
    int row;
    int col;
    public Tuple(int distance,int row, int col){
        this.row = row;
        this.distance = distance;
        this.col = col; 
    }
}
class Solution {
    
    int MinimumEffort(int heights[][]) {

        // Create a priority queue containing pairs of cells 
        // and their respective distance from the source cell in the 
        // form {diff, {row of cell, col of cell}}.
        PriorityQueue<Tuple> pq = 
        new PriorityQueue<Tuple>((x,y) -> x.distance - y.distance);
       
      
        int n = heights.length; 
        int m = heights[0].length; 

        // Create a distance matrix with initially all the cells marked as
        // unvisited and the dist for source cell (0,0) as 0.
        int[][] dist = new int[n][m]; 
        for(int i = 0;i<n;i++) {
            for(int j = 0;j<m;j++) {
                dist[i][j] = (int)(1e9); 
            }
        }
        
        dist[0][0] = 0; 
        pq.add(new Tuple(0, 0, 0)); 

         // The following delta rows and delts columns array are created such that
        // each index represents each adjacent node that a cell may have 
        // in a direction.
        int dr[] = {-1, 0, 1, 0}; 
        int dc[] = {0, 1, 0, -1}; 
        
        // Iterate through the matrix by popping the elements out of the queue
        // and pushing whenever a shorter distance to a cell is found.
        while(pq.size() != 0) {
            Tuple it = pq.peek(); 
            pq.remove(); 
            int diff = it.distance; 
            int row = it.row; 
            int col = it.col; 
            
            // Check if we have reached the destination cell,
            // return the current value of difference (which will be min).
            if(row == n-1 && col == m-1) return diff; 
            // row - 1, col
            // row, col + 1 
            // row - 1, col 
            // row, col - 1
            for(int i = 0;i<4;i++) {
                int newr = row + dr[i]; 
                int newc = col + dc[i];

                // Checking validity of the cell.
                if(newr>=0 && newc >=0 && newr < n && newc < m) {

                    // Effort can be calculated as the max value of differences 
                    // between the heights of the node and its adjacent nodes.
                    int newEffort = 
                    Math.max(
                        Math.abs(heights[row][col] - heights[newr][newc]), diff); 

                    // If the calculated effort is less than the prev value
                    // we update as we need the min effort.
                    if(newEffort < dist[newr][newc]) {
                        dist[newr][newc] = newEffort; 
                        pq.add(new Tuple(newEffort, newr, newc)); 
                    }
                }
            }
        }
        // If the destination is unreachable.
        return 0;
    }
}

class tuf {

    public static void main(String[] args) {
       
        int[][] heights={{1, 2, 2}, {3, 8, 2}, {5, 3, 5}};

        Solution obj = new Solution();
        int ans = obj.MinimumEffort(heights);
        
        System.out.print(ans);
        System.out.println();
    }
}
```

## Example Run

### **Input Grid:**

```
1  2  2
3  8  2
5  3  5
```

**Expected Output:**

```
Minimum Effort Required: 2
```

**Explanation:**

- The optimal path: `(0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)`.
- The highest absolute difference in this path is `|1 - 3| = 2`, `|3 - 5| = 2`, `|5 - 3| = 2`, `|3 - 5| = 2` → **Effort = 2**.

## Complexity Analysis

- **Each cell is visited once:** `O(N * M)`
- **Priority Queue operations (logarithmic per update):** `O(E log V)`, where `E ≈ 4 * (N*M)`, `V = N*M`.
- **Total Complexity:** `O(N * M log (N * M))`.

# Cheapest Flights Within K Stops

### There are n cities and m edges connected by some number of flights. You are given an array of flights where flights[i] = [ fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost price. You have also given three integers src, dst, and k, and return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

*** No need of Priority queue as this is a simple increase .. So normal BFS will work , no need of dijkstra algo ***
```Ref
https://takeuforward.org/data-structure/g-37-path-with-minimum-effort/
```

```plain text
Input:
n = 4
flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
src = 0
dst = 3
k = 1
Output:
700
Explanation: 
The optimal path with at most 1 stops from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
```

```java
import java.util.*;

class Pair{
    int first;
    int second;
    public Pair(int first,int second){
        this.first = first;
        this.second = second;
    }
}
class Tuple {
    int first, second, third; 
    Tuple(int first, int second, int third) {
        this.first = first; 
        this.second = second;
        this.third = third; 
    }
}
class Solution {
    public int CheapestFLight(int n,int flights[][],int src,int dst,int K) {

        // Create the adjacency list to depict airports and flights in
        // the form of a graph.
        ArrayList<ArrayList<Pair>> adj = new ArrayList<>(); 
        for(int i = 0;i<n;i++) {
            adj.add(new ArrayList<>()); 
        }
        int m = flights.length; 
        for(int i = 0;i<m;i++) {
            adj.get(flights[i][0]).add(new Pair(flights[i][1], flights[i][2])); 
        }
        
        // Create a queue which stores the node and their distances from the
        // source in the form of {stops, {node, dist}} with ‘stops’ indicating 
        // the no. of nodes between src and current node.
        Queue<Tuple> q = new LinkedList<>(); 
        
        q.add(new Tuple(0, src, 0));

        // Distance array to store the updated distances from the source. 
        int[] dist = new int[n]; 
        for(int i = 0;i<n;i++) {
            dist[i] = (int)(1e9); 
        }
        dist[src] = 0; 

        // Iterate through the graph using a queue like in Dijkstra with 
        // popping out the element with min stops first.
        while(!q.isEmpty()) {
            Tuple it = q.peek(); 
            q.remove(); 
            int stops = it.first; 
            int node = it.second; 
            int cost = it.third; 
            
            // We stop the process as soon as the limit for the stops reaches.
            if(stops > K) continue; 
            for(Pair iter: adj.get(node)) {
                int adjNode = iter.first; 
                int edW = iter.second; 
                
                // We only update the queue if the new calculated dist is
                // less than the prev and the stops are also within limits.
                if (cost + edW < dist[adjNode] && stops <= K) {
                    dist[adjNode] = cost + edW; 
                    q.add(new Tuple(stops + 1, adjNode, cost + edW)); 
                }
            }
        }
        // If the destination node is unreachable return ‘-1’
        // else return the calculated dist from src to dst.
        if(dist[dst] == (int)(1e9)) return -1; 
        return dist[dst]; 
    }
}

class tuf {

    public static void main(String[] args) {
       
        int n = 4, src = 0, dst = 3, K = 1;
        int[][] flights={{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}};

        Solution obj = new Solution();
        int ans = obj.CheapestFLight(n,flights,src,dst,K);
        
        System.out.print(ans);
        System.out.println();
    }
}
```
# Minimum Multiplications to Reach End

### Given start, end, and an array arr of n numbers. At each step, the start is multiplied by any number in the array and then a mod operation with 100000 is done to get the new start.
Your task is to find the minimum steps in which the end can be achieved starting from the start. If it is not possible to reach the end, then return -1.

```plain text
Input:
arr[] = {2, 5, 7}
start = 3
end = 30
Output:
2
Explanation: 
Step 1: 3*2 = 6 % 100000 = 6 
Step 2: 6*5 = 30 % 100000 = 30
Therefore, in minimum 2 multiplications we reach the 
end number which is treated as a destination 
node of a graph here.
```

```Ref
https://takeuforward.org/graph/g-39-minimum-multiplications-to-reach-end/
```

```java
import java.util.*;

class Pair {
    int first, second; 
    Pair(int first, int second) {
        this.first = first;
        this.second = second; 
    }
}
class Solution {
    int minimumMultiplications(int[] arr, 
    int start, int end) {

        // Create a queue for storing the numbers as a result of multiplication
        // of the numbers in the array and the start number.
        Queue<Pair> q = new LinkedList<>(); 
        q.add(new Pair(start, 0)); 

        // Create a dist array to store the no. of multiplications to reach
        // a particular number from the start number.
        int[] dist = new int[100000]; 
        for(int i = 0;i<100000;i++) dist[i] = (int)(1e9);
        dist[start] = 0; 
        int mod = 100000;
        int n = arr.length; 
        // O(100000 * N) 

        // Multiply the start no. with each of numbers in the arr
        // until we get the end no.
        while(!q.isEmpty()) {
            int node = q.peek().first; 
            int steps = q.peek().second;
            q.remove(); 
            
            for(int i = 0;i < n; i++) {
                int num = (arr[i] * node) % mod; 

                // If the no. of multiplications are less than before
                // in order to reach a number, we update the dist array.
                if(steps + 1 < dist[num]) {
                    dist[num] = steps + 1; 

                    // Whenever we reach the end number
                    // return the calculated steps
                    if(num == end) return steps + 1; 
                    q.add(new Pair(num, steps + 1)); 
                }
            }
        }
        // If the end no. is unattainable.
        return -1; 
    }
}

class tuf {

    public static void main(String[] args) {
       
        int start=3, end=30;
        int[] arr = {2,5,7};

        Solution obj = new Solution();
        int ans = obj.minimumMultiplications(arr,start,end);
        
        System.out.print(ans);
        System.out.println();
    }
}
```

# Number of Ways to Arrive at Destination

### You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer n and a 2D integer array ‘roads’ where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7

```plain text
Input:
n=7, m=10
edges= [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output:
4
Explanation: 
The four ways to get there in 7 minutes (which is the shortest calculated time) are:
- 0  6
- 0  4  6
- 0  1  2  5  6
- 0  1  3  5  6
```

```Ref
https://takeuforward.org/data-structure/g-40-number-of-ways-to-arrive-at-destination/
```

```java
import java.util.*;
class Main {

    public static void main(String[] args) {

        int n = 7;
        List < List < Integer >> roads = new ArrayList < > () {
            {
                add(new ArrayList<Integer>(Arrays.asList(0, 6, 7)));
                add(new ArrayList<Integer>(Arrays.asList(0, 1, 2)));
                add(new ArrayList<Integer>(Arrays.asList(1, 2, 3)));
                add(new ArrayList<Integer>(Arrays.asList(1, 3, 3)));
                add(new ArrayList<Integer>(Arrays.asList(6, 3, 3)));
                add(new ArrayList<Integer>(Arrays.asList(3, 5, 1)));
                add(new ArrayList<Integer>(Arrays.asList(6, 5, 1)));
                add(new ArrayList<Integer>(Arrays.asList(2, 5, 1)));
                add(new ArrayList<Integer>(Arrays.asList(0, 4, 5)));
                add(new ArrayList<Integer>(Arrays.asList(4, 6, 2)));

            }
        };
        Solution obj = new Solution();
        int ans = obj.countPaths(n, roads);

        System.out.print(ans);
        System.out.println();
    }
}
class Pair {
    int first;
    int second;
    public Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}
class Solution {

    static int countPaths(int n, List < List < Integer >> roads) {

        // Creating an adjacency list for the given graph.
        ArrayList < ArrayList < Pair >> adj = new ArrayList < > ();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList < > ());
        }
        int m = roads.size();
        for (int i = 0; i < m; i++) {
            adj.get(roads.get(i).get(0)).add(new Pair(roads.get(i).get(1), roads.get(i).get(2)));
            adj.get(roads.get(i).get(1)).add(new Pair(roads.get(i).get(0), roads.get(i).get(2)));
        }

        // Defining a priority queue (min heap). 
        PriorityQueue < Pair > pq = new PriorityQueue < Pair > ((x, y) -> x.first - y.first);

        // Initializing the dist array and the ways array
        // along with their first indices.
        int[] dist = new int[n];
        int[] ways = new int[n];
        for (int i = 0; i < n; i++) {
            dist[i] = Integer.MAX_VALUE;
            ways[i] = 0;
        }
        dist[0] = 0;
        ways[0] = 1;
        pq.add(new Pair(0, 0));

        // Define modulo value
        int mod = (int)(1e9 + 7);

        // Iterate through the graph with the help of priority queue
        // just as we do in Dijkstra's Algorithm.
        while (pq.size() != 0) {
            int dis = pq.peek().first;
            int node = pq.peek().second;
            pq.remove();

            for (Pair it : adj.get(node)) {
                int adjNode = it.first;
                int edW = it.second;

                // This ‘if’ condition signifies that this is the first
                // time we’re coming with this short distance, so we push
                // in PQ and keep the no. of ways the same.
                if (dis + edW < dist[adjNode]) {
                    dist[adjNode] = dis + edW;
                    pq.add(new Pair(dis + edW, adjNode));
                    ways[adjNode] = ways[node];
                } 

                    // If we again encounter a node with the same short distance
                    // as before, we simply increment the no. of ways.
                    else if (dis + edW == dist[adjNode]) {
                    ways[adjNode] = (ways[adjNode] + ways[node]) % mod;
                }
            }
        }
        // Finally, we return the no. of ways to reach
        // (n-1)th node modulo 10^9+7.
        return ways[n - 1] % mod;
    }
}
```

# Snakes and Ladders Game Solution in Java

```Ref
https://leetcode.com/problems/snakes-and-ladders/description/?envType=study-plan-v2&envId=top-interview-150
```

## Problem Statement
You are given an `n x n` integer matrix `board` where the cells are labeled from `1` to `n^2` in a Boustrophedon style starting from the bottom left of the board and alternating direction each row.

### Objective
- Starting at square `1`, determine the minimum number of dice rolls required to reach square `n^2`.
- If reaching the destination is impossible, return `-1`.

## Approach
We'll use **BFS (Breadth-First Search)** for this problem since BFS efficiently finds the shortest path in an unweighted graph-like structure.

### Step 1: Flatten the Board
- Convert the 2D board into a 1D array where `arr[1]` corresponds to cell `1` on the board.
- While filling the array, respect the Boustrophedon order (left-to-right and right-to-left alternation per row).

### Step 2: BFS Traversal
- Initialize a queue starting at cell `1` with `0` moves.
- While processing each cell:
  - For each possible dice roll (1 to 6):
    - If the next cell has a snake or ladder, jump to its destination.
    - If the cell is visited, skip it. Otherwise, mark it as visited and continue.
- Return the number of moves when reaching the final cell (`n^2`).

### Step 3: Edge Cases
- Handle cases where:
  - The board has no valid path to the goal (`return -1`).
  - The goal is reached in the first roll.

## Java Code Implementation
```java
import java.util.*;

class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int[] arr = new int[n * n + 1]; // Flattened array to represent the board
        boolean leftToRight = true;
        int idx = 1;

        // Flatten the board
        for (int row = n - 1; row >= 0; row--) {
            if (leftToRight) {
                for (int col = 0; col < n; col++) {
                    arr[idx++] = board[row][col];
                }
            } else {
                for (int col = n - 1; col >= 0; col--) {
                    arr[idx++] = board[row][col];
                }
            }
            leftToRight = !leftToRight;
        }

        // BFS Setup
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{1, 0}); // Start at position 1 with 0 moves
        boolean[] visited = new boolean[n * n + 1];
        visited[1] = true;

        // BFS Traversal
        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int pos = current[0];
            int moves = current[1];

            if (pos == n * n) return moves; // Reached the final square

            for (int i = 1; i <= 6; i++) {
                int nextPos = pos + i;
                if (nextPos > n * n) continue; // Out of board boundaries

                // If the cell has a ladder or snake, jump to its destination
                if (arr[nextPos] != -1) {
                    nextPos = arr[nextPos];
                }

                if (!visited[nextPos]) {
                    visited[nextPos] = true;
                    queue.offer(new int[]{nextPos, moves + 1});
                }
            }
        }

        return -1; // No valid path to the goal
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        int[][] board1 = {
            {-1, -1, -1, -1, -1, -1},
            {-1, -1, -1, -1, -1, -1},
            {-1, -1, -1, -1, -1, -1},
            {-1, 35, -1, -1, 13, -1},
            {-1, -1, -1, -1, -1, -1},
            {-1, 15, -1, -1, -1, -1}
        };

        System.out.println("Result: " + solution.snakesAndLadders(board1)); // Output: 4

        int[][] board2 = {
            {-1, -1},
            {-1, 3}
        };

        System.out.println("Result: " + solution.snakesAndLadders(board2)); // Output: 1
    }
}
```

## Dry Run
### Input 1:
```java
board = [
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,35,-1,-1,13,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,15,-1,-1,-1,-1]
]
```
### Step-by-Step Execution
- Start at `1` → Roll dice to reach `2` → Ladder to `15`
- From `15` → Roll dice to `17` → Snake to `13`
- From `13` → Roll dice to `14` → Ladder to `35`
- From `35` → Roll dice to `36` (Final Square)

**Result:** 4 moves

### Input 2:
```java
board = [
  [-1, -1],
  [-1, 3]
]
```
### Step-by-Step Execution
- Start at `1` → Roll dice to reach `2` → Ladder to `3`

**Result:** 1 move

## Complexity Analysis
- **Time Complexity:** `O(n^2)` — Each cell can be visited at most once.
- **Space Complexity:** `O(n^2)` — BFS queue and visited array can both store up to `n^2` elements.

## Key Takeaways
✅ BFS efficiently handles the shortest path logic.
✅ The board-flattening logic simplifies the traversal.
✅ Clear handling of ladders, snakes, and unreachable paths.

