# Preorder Traversal (Root -> Left -> Right)

### Recursive Code
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public void preorderRecursive(TreeNode root) {
        if (root == null) return;
        System.out.print(root.val + " ");
        preorderRecursive(root.left);
        preorderRecursive(root.right);
    }
}
```

### Iterative Code
```java
import java.util.*;

class Solution {
    public void preorderIterative(TreeNode root) {
        if (root == null) return;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            System.out.print(node.val + " ");
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
    }
}
```

---

# Inorder Traversal (Left -> Root -> Right)

### Recursive Code
```java
class Solution {
    public void inorderRecursive(TreeNode root) {
        if (root == null) return;
        inorderRecursive(root.left);
        System.out.print(root.val + " ");
        inorderRecursive(root.right);
    }
}
```

### Iterative Code
```java
import java.util.*;

class Solution {
    public void inorderIterative(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            System.out.print(curr.val + " ");
            curr = curr.right;
        }
    }
}
```

---

# Postorder Traversal (Left -> Right -> Root)

### Recursive Code
```java
class Solution {
    public void postorderRecursive(TreeNode root) {
        if (root == null) return;
        postorderRecursive(root.left);
        postorderRecursive(root.right);
        System.out.print(root.val + " ");
    }
}
```

### Iterative Code
```java
import java.util.*;

class Solution {
    public void postorderIterative(TreeNode root) {
        if (root == null) return;
        Stack<TreeNode> stack1 = new Stack<>();
        Stack<TreeNode> stack2 = new Stack<>();
        stack1.push(root);
        while (!stack1.isEmpty()) {
            TreeNode node = stack1.pop();
            stack2.push(node);
            if (node.left != null) stack1.push(node.left);
            if (node.right != null) stack1.push(node.right);
        }
        while (!stack2.isEmpty()) {
            System.out.print(stack2.pop().val + " ");
        }
    }
}
```

---

# Level Order Traversal

### Iterative Code
```java
import java.util.*;

class Solution {
    public void levelOrder(TreeNode root) {
        if (root == null) return;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            System.out.print(node.val + " ");
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
    }
}
```

---

## Summary
- **Preorder:** Recursive (Simple), Iterative (Uses Stack)
- **Inorder:** Recursive (Simple), Iterative (Uses Stack)
- **Postorder:** Recursive (Simple), Iterative (Two Stack Approach)
- **Level Order:** Iterative (Uses Queue)

# Maximum Depth of Binary Tree

## Problem Statement
Given the `root` of a binary tree, return its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### Example 1:
```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

### Example 2:
```
Input: root = [1,null,2]
Output: 2
```

### Constraints:
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

---

## Approach
We will use recursion to determine the maximum depth of the binary tree:

1. **Base Case:** If the root is `null`, the depth is 0.
2. **Recursive Case:** Recursively calculate the depth of the left and right subtrees.
3. **Return Value:** The maximum depth is `1 + max(leftDepth, rightDepth)`.

### Key Insight
- The `1` in the return statement accounts for the current node's depth.

---

## Code Implementation (Java)
```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

        System.out.println("Max Depth: " + solution.maxDepth(root));  // Output: 3
    }
}
```

---

## Dry Run
### Input Tree Structure
```
      3
     / \
    9  20
       /  \
      15   7
```

1. `maxDepth(3)`
   - Calls `maxDepth(9)` (returns `1`)
   - Calls `maxDepth(20)`
     - Calls `maxDepth(15)` (returns `1`)
     - Calls `maxDepth(7)` (returns `1`)
   - `maxDepth(20)` = `1 + max(1, 1)` = `2`
2. `maxDepth(3)` = `1 + max(1, 2)` = `3`

**Final Answer:** `3`

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Each node is visited once.
- **Space Complexity:** `O(h)` — Maximum space used by the recursion stack where `h` is the height of the tree (worst case `O(n)` for a skewed tree).


# Balanced Binary Tree

## Problem Statement
Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is defined as:
> A binary tree in which the depth of the two subtrees of every node never differs by more than one.

### Example 1
**Input:**
```
    3
   / \
  9  20
     /  \
    15   7
```
**Output:** `true`

### Example 2
**Input:**
```
    1
   / \
  2   2
 / \
3   3
/ \
4   4
```
**Output:** `false`

### Constraints
- The number of nodes in the tree is in the range [0, 5000].
- -10<sup>4</sup> <= Node.val <= 10<sup>4</sup>

---

## Approach
We will use **recursion** to determine if the tree is balanced:

### Steps
1. **Base Condition:** If the node is `null`, return height as `0`.
2. **Recursive Calls:**
   - Recursively calculate the height of the left subtree.
   - Recursively calculate the height of the right subtree.
3. **Check Balance Condition:**
   - If the absolute difference between the left and right subtree heights is greater than 1, return `-1` to indicate imbalance.
4. **Return Height:**
   - If both subtrees are balanced, return the height of the current node as `1 + max(leftHeight, rightHeight)`.
5. In the main function, check if the final height value is `-1`. If yes, return `false`; otherwise, return `true`.

---

## Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) {
        this.val = val;
    }
}

class Solution {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }

    // Helper function to check height and balance status
    private int checkHeight(TreeNode node) {
        if (node == null) return 0; // Base case

        int leftHeight = checkHeight(node.left);
        if (leftHeight == -1) return -1; // Left subtree imbalance

        int rightHeight = checkHeight(node.right);
        if (rightHeight == -1) return -1; // Right subtree imbalance

        // Check if the current node is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        // Return height if balanced
        return Math.max(leftHeight, rightHeight) + 1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        TreeNode root1 = new TreeNode(3);
        root1.left = new TreeNode(9);
        root1.right = new TreeNode(20);
        root1.right.left = new TreeNode(15);
        root1.right.right = new TreeNode(7);
        System.out.println("Is Balanced (Example 1): " + solution.isBalanced(root1)); // true

        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(2);
        root2.left.left = new TreeNode(3);
        root2.left.right = new TreeNode(3);
        root2.left.left.left = new TreeNode(4);
        root2.left.left.right = new TreeNode(4);
        System.out.println("Is Balanced (Example 2): " + solution.isBalanced(root2)); // false
    }
}
```

---

## Dry Run
### Example 1 Input Tree
```
    3
   / \
  9  20
     /  \
    15   7
```
1. Start at root (3):
   - Left Height = 1 (from subtree rooted at 9)
   - Right Height = 2 (from subtree rooted at 20)
   - `|1 - 2| <= 1` → Balanced

2. Subtree rooted at node 20:
   - Left Height = 1 (from node 15)
   - Right Height = 1 (from node 7)
   - `|1 - 1| = 0` → Balanced

3. Subtree rooted at node 9:
   - Left Height = 0
   - Right Height = 0
   - Balanced

Final Result: **`true`**

---

## Complexity Analysis
- **Time Complexity:** `O(n)` — Each node is visited once.
- **Space Complexity:** `O(h)` — Recursion stack space where `h` is the tree height (O(log n) for balanced trees; O(n) in the worst case for skewed trees).


# Diameter of a Binary Tree

## Problem Statement
The **diameter** of a binary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.

The length of a path is measured by the number of edges between nodes.

### Example
#### Input:
```
       1
      / \
     2   3
    / \
   4   5
```
#### Output:
```
3
```
#### Explanation:
The longest path in this tree is **4 → 2 → 1 → 3** or **5 → 2 → 1 → 3**, which consists of 3 edges.

---

## Java Solution
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    int diameter = 0;
    
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return diameter;
    }
    
    private int height(TreeNode node) {
        if (node == null) return 0;
        
        int leftHeight = height(node.left);
        int rightHeight = height(node.right);
        
        // Update diameter at this node
        diameter = Math.max(diameter, leftHeight + rightHeight);
        
        // Return height of subtree
        return 1 + Math.max(leftHeight, rightHeight);
    }
}
```

---

## Dry Run

### Given Input:
```
       1
      / \
     2   3
    / \
   4   5
```

### Step-by-step Execution:
1. `height(4) = 1`, `height(5) = 1` → `diameter = max(0, 1+1) = 2`
2. `height(2) = 1 + max(1,1) = 2`
3. `height(3) = 1` → `diameter = max(2, 2+1) = 3`
4. `height(1) = 1 + max(2,1) = 3`

### Final Diameter: **3**

# Maximum Path Sum in a Binary Tree

## Problem Statement
The **maximum path sum** of a binary tree is the highest possible sum of node values along any path in the tree. A path can start and end at any node but must follow parent-child connections.

### Example
#### Input:
```
       1
      / \
     2   3
```
#### Output:
```
6
```
#### Explanation:
The maximum path sum is **2 → 1 → 3**, which sums to **6**.

---

## Java Solution
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    int maxSum = Integer.MIN_VALUE;
    
    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }
    
    private int maxGain(TreeNode node) {
        if (node == null) return 0;
        
        int leftGain = Math.max(0, maxGain(node.left));
        int rightGain = Math.max(0, maxGain(node.right));
        
        int priceNewPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, priceNewPath);
        
        return node.val + Math.max(leftGain, rightGain);
    }
}
```

---

## Dry Run

### Given Input:
```
       1
      / \
     2   3
```

### Step-by-step Execution:
1. `maxGain(2) = 2`, `maxGain(3) = 3` → `priceNewPath = 2 + 3 + 1 = 6`
2. `maxGain(1) = 1 + max(2,3) = 4`
3. `maxSum = 6`

### Final Maximum Path Sum: **6**

# Check if Two Binary Trees are Identical

## Problem Statement
Given two binary trees, determine if they are identical. Two binary trees are considered identical if they have the same structure and node values.

### Example
#### Input:
```
Tree 1:      Tree 2:
    1           1
   / \         / \
  2   3       2   3
```
#### Output:
```
true
```
#### Explanation:
Both trees have the same structure and node values.

---

## Java Solution
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public boolean isIdentical(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        
        return isIdentical(p.left, q.left) && isIdentical(p.right, q.right);
    }
}
```

---

## Dry Run

### Given Input:
```
Tree 1:      Tree 2:
    1           1
   / \         / \
  2   3       2   3
```

### Step-by-step Execution:
1. `isIdentical(1,1)`: values match, check left and right subtrees.
2. `isIdentical(2,2)`: values match, check left and right (both null, return true).
3. `isIdentical(3,3)`: values match, check left and right (both null, return true).
4. Since all recursive calls return `true`, the final result is **`true`**.

### Final Output: **true**

# Zigzag Level Order Traversal of a Binary Tree

## Problem Statement
Given the root of a binary tree, return its **zigzag level order traversal**. This means the nodes of each level are traversed in an alternating left-to-right and right-to-left order.

### Example
#### Input:
```
        1
       / \
      2   3
     / \   \
    4   5   6
```
#### Output:
```
[[1], [3, 2], [4, 5, 6]]
```
#### Explanation:
- Level 1: Left to Right → `[1]`
- Level 2: Right to Left → `[3, 2]`
- Level 3: Left to Right → `[4, 5, 6]`

---

## Java Solution
```java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean leftToRight = true;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            LinkedList<Integer> level = new LinkedList<>();
            
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (leftToRight) {
                    level.addLast(node.val);
                } else {
                    level.addFirst(node.val);
                }
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
            leftToRight = !leftToRight;
        }
        
        return result;
    }
}
```

---

## Dry Run

### Given Input:
```
        1
       / \
      2   3
     / \   \
    4   5   6
```

### Step-by-step Execution:
1. **Level 1:** `[1]` (left-to-right)
2. **Level 2:** `[3, 2]` (right-to-left)
3. **Level 3:** `[4, 5, 6]` (left-to-right)

### Final Output: **`[[1], [3, 2], [4, 5, 6]]`**

# Boundary Traversal of a Binary Tree

## Problem Statement
Given the root of a binary tree, return its **boundary traversal**. The boundary traversal consists of three parts:
1. **Left Boundary**: Nodes from the root to the left-most leaf (excluding leaf nodes).
2. **Leaf Nodes**: All leaf nodes (from left to right).
3. **Right Boundary**: Nodes from the right-most leaf to the root in reverse order (excluding leaf nodes).

### Example
#### Input:
```
        1
       / \
      2   3
     / \   \
    4   5   6
   /       / \
  7       8   9
```
#### Output:
```
[1, 2, 4, 7, 5, 8, 9, 6, 3]
```
#### Explanation:
- **Left Boundary:** `[1, 2, 4]` (excluding leaf `7`)
- **Leaf Nodes:** `[7, 5, 8, 9]`
- **Right Boundary:** `[6, 3]` (excluding leaf `9` and in reverse order)

---

## Java Solution
```java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<Integer> boundaryTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;
        
        if (!isLeaf(root)) result.add(root.val);
        addLeftBoundary(root.left, result);
        addLeaves(root, result);
        addRightBoundary(root.right, result);
        
        return result;
    }
    
    private boolean isLeaf(TreeNode node) {
        return (node.left == null && node.right == null);
    }
    
    private void addLeftBoundary(TreeNode node, List<Integer> result) {
        while (node != null) {
            if (!isLeaf(node)) result.add(node.val);
            node = (node.left != null) ? node.left : node.right;
        }
    }
    
    private void addLeaves(TreeNode node, List<Integer> result) {
        if (node == null) return;
        if (isLeaf(node)) {
            result.add(node.val);
            return;
        }
        addLeaves(node.left, result);
        addLeaves(node.right, result);
    }
    
    private void addRightBoundary(TreeNode node, List<Integer> result) {
        Stack<Integer> stack = new Stack<>();
        while (node != null) {
            if (!isLeaf(node)) stack.push(node.val);
            node = (node.right != null) ? node.right : node.left;
        }
        while (!stack.isEmpty()) {
            result.add(stack.pop());
        }
    }
}
```

---

## Dry Run

### Given Input:
```
        1
       / \
      2   3
     / \   \
    4   5   6
   /       / \
  7       8   9
```

### Step-by-step Execution:
1. **Left Boundary:** `[1, 2, 4]`
2. **Leaf Nodes:** `[7, 5, 8, 9]`
3. **Right Boundary:** `[6, 3]` (added in reverse order)

### Final Output: **`[1, 2, 4, 7, 5, 8, 9, 6, 3]`**


