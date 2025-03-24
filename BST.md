# 🔍 Search in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and a target value `val`, write a function to search for the node with that value in the BST. If the node exists, return the node. Otherwise, return `null`.

### Example:
**Input:**
```
       4
     /   \
    2     7
   / \
  1   3
```
`val = 2`

**Output:**
```
     2
    / \
   1   3
```

---

## 💡 Approach
### 🔎 Key Observations
A Binary Search Tree has the following properties:
- **Left subtree nodes** are **less than** the root.
- **Right subtree nodes** are **greater than** the root.

### 🚀 Steps to Solve
1. **Base Case:**
   - If `root == null`, return `null`.
   - If `root.val == val`, return the current node (found).

2. **Decision Logic:**
   - If `val < root.val`, search in the **left subtree**.
   - If `val > root.val`, search in the **right subtree**.

3. Continue this process recursively or iteratively.

---

## 🖥️ Java Code Implementation
### 🔄 Recursive Approach
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTSearch {

    // Recursive Solution
    public TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) {
            return root; // Found or tree is empty
        }
        
        if (val < root.val) {
            return searchBST(root.left, val); // Search left
        } else {
            return searchBST(root.right, val); // Search right
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);

        BSTSearch bstSearch = new BSTSearch();
        TreeNode result = bstSearch.searchBST(root, 2);

        if (result != null) {
            System.out.println("Node found with value: " + result.val);
        } else {
            System.out.println("Node not found");
        }
    }
}
```

### 🔄 Iterative Approach
```java
public TreeNode searchBSTIterative(TreeNode root, int val) {
    while (root != null && root.val != val) {
        root = val < root.val ? root.left : root.right;
    }
    return root; // Found node or null if not present
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       4
     /   \
    2     7
   / \
  1   3
```
### Searching for `val = 2`
1. Start at root (`4`).
   - `2 < 4` ➔ Move to **left subtree**.
2. Now at node `2`.
   - `val == 2` ➔ **Found!**

**Output:** Node with value `2` and its subtree.

---

## ✅ Final Output
```
Node found with value: 2
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST)
- **Space Complexity:**
  - **Recursive Approach:** `O(log n)` for recursion stack (worst case `O(n)` for skewed BST)
  - **Iterative Approach:** `O(1)` since no extra space is used

---

## 🔎 When to Use Recursive vs Iterative?
| Approach   | Best Use Case            |
|-------------|---------------------------|
| **Recursive** | Cleaner code for simpler logic. |
| **Iterative** | Preferred for space efficiency. |

# 🔼 Ceil in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and a target value `key`, write a function to find the **Ceil** of the target value in the BST.

### What is Ceil?
The **Ceil** of a given value in a BST is defined as the **smallest node value that is greater than or equal to the given value**. If no such value exists, return `-1`.

### Example:
**Input:**
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
`key = 5`

**Output:** `6`

---

## 💡 Approach
### 🔎 Key Observations
- If `root == null`, return `-1` (tree is empty).
- If `root.val == key`, the ceil is the node's value itself.
- If `key < root.val`, the ceil might be in the **left subtree**, but also check the current node.
- If `key > root.val`, the ceil can only exist in the **right subtree**.

### 🚀 Steps to Solve
1. Initialize `ceil = -1`.
2. Traverse the BST as follows:
   - If `key == root.val`: Return `root.val` (found exact match).
   - If `key < root.val`: Update `ceil = root.val` and move to the **left subtree**.
   - If `key > root.val`: Move to the **right subtree**.
3. Continue until the traversal ends.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTCeil {

    // Ceil Function in BST
    public int findCeil(TreeNode root, int key) {
        int ceil = -1;
        while (root != null) {
            if (root.val == key) {
                return root.val; // Exact match found
            }
            
            if (key < root.val) {
                ceil = root.val; // Potential ceil value
                root = root.left; // Continue search in left subtree
            } else {
                root = root.right; // Continue search in right subtree
            }
        }
        return ceil;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(4);
        root.right = new TreeNode(12);
        root.left.left = new TreeNode(2);
        root.left.right = new TreeNode(6);
        root.right.left = new TreeNode(10);
        root.right.right = new TreeNode(14);

        BSTCeil bstCeil = new BSTCeil();
        int key = 5;
        System.out.println("Ceil value for " + key + " is: " + bstCeil.findCeil(root, key));
    }
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
### Searching for `key = 5`
1. Start at root (`8`).
   - `5 < 8` ➔ Potential ceil = `8`, move to **left subtree**.
2. Now at node `4`.
   - `5 > 4` ➔ Move to **right subtree**.
3. Now at node `6`.
   - `5 < 6` ➔ Potential ceil = `6`, move to **left subtree**.
4. Left subtree is `null`. End traversal.

**Final Ceil Value:** `6`

---

## ✅ Final Output
```
Ceil value for 5 is: 6
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST)
- **Space Complexity:** `O(1)` (iterative approach, no extra space used)

---
# 🔽 Floor in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and a target value `key`, write a function to find the **Floor** of the target value in the BST.

### What is Floor?
The **Floor** of a given value in a BST is defined as the **largest node value that is less than or equal to the given value**. If no such value exists, return `-1`.

### Example:
**Input:**
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
`key = 11`

**Output:** `10`

---

## 💡 Approach
### 🔎 Key Observations
- If `root == null`, return `-1` (tree is empty).
- If `root.val == key`, the floor is the node's value itself.
- If `key > root.val`, the floor might be in the **right subtree**, but also check the current node.
- If `key < root.val`, the floor can only exist in the **left subtree**.

### 🚀 Steps to Solve
1. Initialize `floor = -1`.
2. Traverse the BST as follows:
   - If `key == root.val`: Return `root.val` (found exact match).
   - If `key > root.val`: Update `floor = root.val` and move to the **right subtree**.
   - If `key < root.val`: Move to the **left subtree**.
3. Continue until the traversal ends.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTFloor {

    // Floor Function in BST
    public int findFloor(TreeNode root, int key) {
        int floor = -1;
        while (root != null) {
            if (root.val == key) {
                return root.val; // Exact match found
            }
            
            if (key > root.val) {
                floor = root.val; // Potential floor value
                root = root.right; // Continue search in right subtree
            } else {
                root = root.left; // Continue search in left subtree
            }
        }
        return floor;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(4);
        root.right = new TreeNode(12);
        root.left.left = new TreeNode(2);
        root.left.right = new TreeNode(6);
        root.right.left = new TreeNode(10);
        root.right.right = new TreeNode(14);

        BSTFloor bstFloor = new BSTFloor();
        int key = 11;
        System.out.println("Floor value for " + key + " is: " + bstFloor.findFloor(root, key));
    }
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
### Searching for `key = 11`
1. Start at root (`8`).
   - `11 > 8` → Potential floor = `8`, move to **right subtree**.
2. Now at node `12`.
   - `11 < 12` → Move to **left subtree**.
3. Now at node `10`.
   - `11 > 10` → Potential floor = `10`, move to **right subtree**.
4. Right subtree is `null`. End traversal.

**Final Floor Value:** `10`

---

## ✅ Final Output
```
Floor value for 11 is: 10
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST)
- **Space Complexity:** `O(1)` (iterative approach, no extra space used)

---

# 🌳 Insert a Node in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and an integer value `key`, insert the key into the BST while maintaining its properties.

### BST Property
- Left subtree nodes contain values **less than** the root.
- Right subtree nodes contain values **greater than** the root.
- Each subtree must also be a valid BST.

### Example:
**Input:**
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
`key = 5`

**Output:**
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
     /
    5
```

---

## 💡 Approach
### 🔎 Key Observations
- If `root == null`, create a new node with the given `key` and return it.
- If `key < root.val`, recursively insert the key in the **left subtree**.
- If `key > root.val`, recursively insert the key in the **right subtree**.
- Return the modified tree's root.

### 🚀 Steps to Solve
1. **Base Case:** If `root == null`, return `new TreeNode(key)`.
2. **Recursion:**
   - If `key < root.val`, move to the **left subtree**.
   - If `key > root.val`, move to the **right subtree**.
3. Return the updated root after insertion.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTInsert {

    // Insert Function in BST
    public TreeNode insertNode(TreeNode root, int key) {
        if (root == null) return new TreeNode(key); // Base case: empty spot found

        if (key < root.val) {
            root.left = insertNode(root.left, key); // Insert in left subtree
        } else if (key > root.val) {
            root.right = insertNode(root.right, key); // Insert in right subtree
        }

        return root; // Return updated root
    }

    // In-order Traversal to Print the BST
    public void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.print(root.val + " ");
            inorderTraversal(root.right);
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(8);
        root.left = new TreeNode(4);
        root.right = new TreeNode(12);
        root.left.left = new TreeNode(2);
        root.left.right = new TreeNode(6);
        root.right.left = new TreeNode(10);
        root.right.right = new TreeNode(14);

        BSTInsert bstInsert = new BSTInsert();
        int key = 5;
        bstInsert.insertNode(root, key);

        System.out.print("In-order Traversal After Insertion: ");
        bstInsert.inorderTraversal(root); // Output: 2 4 5 6 8 10 12 14
    }
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
```
### Inserting `key = 5`
1. Start at root (`8`).
   - `5 < 8` → Move to the **left subtree**.
2. At node `4`.
   - `5 > 4` → Move to the **right subtree**.
3. At node `6`.
   - `5 < 6` → Insert `5` as the **left child of node 6**.

**Final Tree Structure:**
```
       8
     /   \
    4     12
   / \    / \
  2   6 10  14
     /
    5
```

---

## ✅ Final Output
```
In-order Traversal After Insertion: 2 4 5 6 8 10 12 14
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST).
- **Space Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST) due to recursion stack.

---

# 🌳 Delete a Node in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and an integer value `key`, delete the node with the given `key` from the BST while maintaining its properties.

### BST Property
- Left subtree nodes contain values **less than** the root.
- Right subtree nodes contain values **greater than** the root.
- Each subtree must also be a valid BST.

### Example:
**Input:**
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
 /     \
6       13
```
`key = 15`

**Output:**
```
       17
     /   \
    10    20
   / \      \
  8  12     25
 /     \
6       13
```

---

## 💡 Approach
### 🔎 Key Observations
1. **Find the node to delete.**
   - If `key < root.val`, search in the **left subtree**.
   - If `key > root.val`, search in the **right subtree**.
2. **Delete the node:**
   - **Node has no children:** Simply delete the node.
   - **Node has one child:** Replace the node with its child.
   - **Node has two children:**
     - Find the **in-order successor** (minimum value in the right subtree).
     - Replace the node's value with the successor's value.
     - Recursively delete the successor from the right subtree.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTDelete {

    // Function to delete a node in BST
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null; // Base case

        // Locate the node to delete
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            // Node found - handle deletion cases
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            // Node with two children - find the in-order successor
            TreeNode successor = findMin(root.right);
            root.val = successor.val;  // Replace value
            root.right = deleteNode(root.right, successor.val); // Delete successor
        }
        return root;
    }

    // Helper function to find the minimum node in the tree
    private TreeNode findMin(TreeNode node) {
        while (node.left != null) node = node.left;
        return node;
    }

    // In-order Traversal to Print the BST
    public void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.print(root.val + " ");
            inorderTraversal(root.right);
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.left.left.left = new TreeNode(6);
        root.left.right.right = new TreeNode(13);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        BSTDelete bstDelete = new BSTDelete();
        int key = 15;
        bstDelete.deleteNode(root, key);

        System.out.print("In-order Traversal After Deletion: ");
        bstDelete.inorderTraversal(root); // Output: 6 8 10 12 13 17 20 25
    }
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
 /     \
6       13
```
### Deleting `key = 15`
1. Start at root (`15`).
   - Node `15` has **two children**.
2. Find the **in-order successor** (smallest node in the right subtree → `17`).
3. Replace `15` with `17`.
4. Delete node `17` from the right subtree.

**Final Tree Structure:**
```
       17
     /   \
    10    20
   / \      \
  8  12     25
 /     \
6       13
```

---

## ✅ Final Output
```
In-order Traversal After Deletion: 6 8 10 12 13 17 20 25
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST).
- **Space Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST) due to recursion stack.

---


# 🌳 Kth Smallest / Largest Element in a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a **Binary Search Tree (BST)** and an integer `k`, find the **kth smallest** or **kth largest** element in the BST.

### Example:
**Input:**
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
 /     \
6       13
```
`k = 3` (for kth smallest)

**Output:** `10`

`k = 3` (for kth largest)

**Output:** `20`

---

## 💡 Approach
### 🔎 Key Observations
1. **In-order Traversal** gives the BST elements in **sorted order** (ascending).
2. For the **kth smallest** element:
   - Perform an **in-order traversal** and track the count until `k` elements are visited.
3. For the **kth largest** element:
   - Perform a **reverse in-order traversal** (right-root-left) and track the count until `k` elements are visited.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class KthElementInBST {

    int count = 0;
    int result = -1;

    // Function to find kth smallest element
    public int kthSmallest(TreeNode root, int k) {
        inorderTraversal(root, k);
        return result;
    }

    // In-order Traversal (left-root-right)
    private void inorderTraversal(TreeNode root, int k) {
        if (root == null) return;

        inorderTraversal(root.left, k);
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        inorderTraversal(root.right, k);
    }

    // Function to find kth largest element
    public int kthLargest(TreeNode root, int k) {
        reverseInorderTraversal(root, k);
        return result;
    }

    // Reverse In-order Traversal (right-root-left)
    private void reverseInorderTraversal(TreeNode root, int k) {
        if (root == null) return;

        reverseInorderTraversal(root.right, k);
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        reverseInorderTraversal(root.left, k);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.left.left.left = new TreeNode(6);
        root.left.right.right = new TreeNode(13);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        KthElementInBST bst = new KthElementInBST();
        int k = 3;
        System.out.println("Kth Smallest Element: " + bst.kthSmallest(root, k)); // Output: 10
        bst.count = 0; // Reset count for kth largest search
        System.out.println("Kth Largest Element: " + bst.kthLargest(root, k));   // Output: 20
    }
}
```

---

## 🧪 Dry Run
### Example Tree:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
 /     \
6       13
```
### Finding the `3rd Smallest` Element
- In-order Traversal (ascending): `[6, 8, 10, 12, 13, 15, 17, 20, 25]`
- **3rd Smallest:** `10`

### Finding the `3rd Largest` Element
- Reverse In-order Traversal (descending): `[25, 20, 17, 15, 13, 12, 10, 8, 6]`
- **3rd Largest:** `20`

---

## ✅ Final Output
```
Kth Smallest Element: 10
Kth Largest Element: 20
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST).
- **Space Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST) due to recursion stack.

---

## 🔎 Key Notes
- The code efficiently handles both the **kth smallest** and **kth largest** elements using in-order and reverse in-order traversals, respectively.
- Resetting the `count` variable before the second function ensures the logic works independently for both cases.
- This approach leverages BST properties for optimal search performance.


# 🌳 Check if a Tree is a Binary Search Tree (BST)

## 📜 Problem Statement
Given the root of a binary tree, determine if the tree is a **Binary Search Tree (BST)**.

### Example 1: (Valid BST)
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Output:** `True`

### Example 2: (Not a BST)
```
       10
     /   \
    5    15
       /  \
      6   20
```
**Output:** `False`

---

## 💡 Approach
### 🔎 Key Observations
A **Binary Search Tree (BST)** must satisfy these conditions:
1. The **left subtree** of a node contains only nodes with values **less than** the node's value.
2. The **right subtree** of a node contains only nodes with values **greater than** the node's value.
3. Both left and right subtrees must also be **BSTs**.

### ✅ Algorithm
- Use a **recursive approach** with **min** and **max** boundaries to verify each node.
- Initially, set the boundaries as:
  - `min = Integer.MIN_VALUE`
  - `max = Integer.MAX_VALUE`
- For each node:
  - If the node's value is **out of range**, return `false`.
  - Recursively check:
    - Left subtree within the range `[min, node.val)`
    - Right subtree within the range `(node.val, max]`

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class CheckBST {

    // Function to check if the tree is a BST
    public boolean isBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    // Helper function for validation
    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true; // Empty tree is a valid BST

        if (node.val <= min || node.val >= max) return false;

        // Check left and right subtrees with updated ranges
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }

    public static void main(String[] args) {
        TreeNode root1 = new TreeNode(15);
        root1.left = new TreeNode(10);
        root1.right = new TreeNode(20);
        root1.left.left = new TreeNode(8);
        root1.left.right = new TreeNode(12);
        root1.right.left = new TreeNode(17);
        root1.right.right = new TreeNode(25);

        TreeNode root2 = new TreeNode(10);
        root2.left = new TreeNode(5);
        root2.right = new TreeNode(15);
        root2.right.left = new TreeNode(6);
        root2.right.right = new TreeNode(20);

        CheckBST bstChecker = new CheckBST();
        System.out.println("Tree 1 is BST: " + bstChecker.isBST(root1)); // True
        System.out.println("Tree 2 is BST: " + bstChecker.isBST(root2)); // False
    }
}
```

---

## 🧪 Dry Run
### Example Tree 1 (Valid BST)
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Step-by-Step Traversal:**
- Node 15 → Range [-∞, ∞] → ✅
- Node 10 → Range [-∞, 15] → ✅
- Node 8 → Range [-∞, 10] → ✅
- Node 12 → Range [10, 15] → ✅
- Node 20 → Range [15, ∞] → ✅
- Node 17 → Range [15, 20] → ✅
- Node 25 → Range [20, ∞] → ✅

**Output:** `True`

### Example Tree 2 (Not a BST)
```
       10
     /   \
    5    15
       /  \
      6   20
```
**Step-by-Step Traversal:**
- Node 10 → Range [-∞, ∞] → ✅
- Node 5 → Range [-∞, 10] → ✅
- Node 15 → Range [10, ∞] → ✅
- Node 6 → Range [10, 15] → ❌ (Out of Range)

**Output:** `False`

---

## ✅ Final Output
```
Tree 1 is BST: True
Tree 2 is BST: False
```

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(n)` — Each node is visited once.
- **Space Complexity:** `O(log n)` in a balanced BST (worst case `O(n)` for a skewed BST) due to recursion stack.

---

## 🔎 Key Notes
- The code effectively handles boundary cases by utilizing `Long.MIN_VALUE` and `Long.MAX_VALUE` to avoid integer overflow.
- The algorithm efficiently leverages recursion and range validation to ensure correctness.

# 🌳 Lowest Common Ancestor (LCA) in a Binary Search Tree (BST)

## 📜 Problem Statement
Given a Binary Search Tree (BST) and two node values `p` and `q`, find the **Lowest Common Ancestor (LCA)** of these two nodes.

### Example 1:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Input:** `p = 8`, `q = 12`  
**Output:** `10`

### Example 2:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Input:** `p = 8`, `q = 25`  
**Output:** `15`

---

## 💡 Approach
### 🔎 Key Observations
In a BST, the **Lowest Common Ancestor (LCA)** is the node that satisfies:
- All nodes in the left subtree are **less** than the current node.
- All nodes in the right subtree are **greater** than the current node.

### ✅ Algorithm
1. Start at the **root** node.
2. While the current node is **not null**:
   - If `p` and `q` are both **less than** the current node's value → Move to the **left subtree**.
   - If `p` and `q` are both **greater than** the current node's value → Move to the **right subtree**.
   - Otherwise, the current node is the **LCA**.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class LCAinBST {

    // Function to find the LCA in a BST
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;  // Both nodes are in the left subtree
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right; // Both nodes are in the right subtree
            } else {
                return root; // Found the LCA
            }
        }
        return null; // In case nodes are not found
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        LCAinBST lcaFinder = new LCAinBST();
        TreeNode lca1 = lcaFinder.lowestCommonAncestor(root, new TreeNode(8), new TreeNode(12));
        System.out.println("LCA of 8 and 12: " + (lca1 != null ? lca1.val : "Not found"));

        TreeNode lca2 = lcaFinder.lowestCommonAncestor(root, new TreeNode(8), new TreeNode(25));
        System.out.println("LCA of 8 and 25: " + (lca2 != null ? lca2.val : "Not found"));
    }
}
```

---

## 🧪 Dry Run
### Example 1:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Input:** `p = 8`, `q = 12`

- Start at Node `15` → Both `8` and `12` are less → Move to `10`
- At Node `10` → One node is on the left (`8`), and the other is on the right (`12`) → **Found LCA: 10**

**Output:** `10`

### Example 2:
**Input:** `p = 8`, `q = 25`

- Start at Node `15` → One node is on the left (`8`) and the other is on the right (`25`) → **Found LCA: 15**

**Output:** `15`

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST, `O(n)` in a skewed BST.
- **Space Complexity:** `O(1)` for the iterative approach (no extra space needed).

---

# 🌳 Inorder Successor and Predecessor in a Binary Search Tree (BST)

## 📜 Problem Statement
Given a Binary Search Tree (BST) and a target node `p`, find:
- The **Inorder Successor**: The node with the **smallest value greater** than `p`.
- The **Inorder Predecessor**: The node with the **largest value smaller** than `p`.

---

## 💡 Approach
### 🔎 Key Observations
1. **Inorder Successor:**
   - If `p` has a **right subtree**, the successor is the **leftmost node** in that subtree.
   - If `p` has **no right subtree**, move up the ancestors until we find a node that is the **left child of its parent** — that parent is the successor.

2. **Inorder Predecessor:**
   - If `p` has a **left subtree**, the predecessor is the **rightmost node** in that subtree.
   - If `p` has **no left subtree**, move up the ancestors until we find a node that is the **right child of its parent** — that parent is the predecessor.

---

## ✅ Algorithm
### For **Inorder Successor**
1. If `p` has a **right subtree**, the successor is the **leftmost node** in the right subtree.
2. If no right subtree exists, track the last node where we took a **left turn** — that node is the successor.

### For **Inorder Predecessor**
1. If `p` has a **left subtree**, the predecessor is the **rightmost node** in the left subtree.
2. If no left subtree exists, track the last node where we took a **right turn** — that node is the predecessor.

---

## 🖥️ Java Code Implementation
```java
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class BSTSuccessorPredecessor {

    // Inorder Successor Function
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val < root.val) {
                successor = root;  // Possible successor
                root = root.left;  // Move left
            } else {
                root = root.right; // Move right
            }
        }
        return successor;
    }

    // Inorder Predecessor Function
    public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {
        TreeNode predecessor = null;
        while (root != null) {
            if (p.val > root.val) {
                predecessor = root;  // Possible predecessor
                root = root.right;   // Move right
            } else {
                root = root.left;    // Move left
            }
        }
        return predecessor;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        BSTSuccessorPredecessor finder = new BSTSuccessorPredecessor();
        TreeNode successor = finder.inorderSuccessor(root, new TreeNode(12));
        System.out.println("Successor of 12: " + (successor != null ? successor.val : "Not found"));

        TreeNode predecessor = finder.inorderPredecessor(root, new TreeNode(12));
        System.out.println("Predecessor of 12: " + (predecessor != null ? predecessor.val : "Not found"));
    }
}
```

---

## 🧪 Dry Run
### Example:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
**Input:** `p = 12`

### Inorder Successor:
- Start at Node `15` → Move **left** (since 12 < 15) → Possible successor is `15`
- At Node `10` → Move **right** (since 12 > 10) → Possible successor is `15`
- At Node `12` → **No right subtree**, so the last tracked successor is `15`

**Output:** `15`

### Inorder Predecessor:
- Start at Node `15` → Move **left** (since 12 < 15)
- At Node `10` → Move **right** (since 12 > 10) → Possible predecessor is `10`
- At Node `12` → **No left subtree**, so the last tracked predecessor is `10`

**Output:** `10`

---

## 📋 Complexity Analysis
- **Time Complexity:** `O(log n)` in a balanced BST, `O(n)` in a skewed BST.
- **Space Complexity:** `O(1)` (No extra space required).

---

# 🌳 Two Sum in a Binary Search Tree (BST)

## 📜 Problem Statement
Given a **Binary Search Tree (BST)** and a **target sum**, determine if there exist **two distinct nodes** such that their values add up to the given target.

---

## 💡 Approach
### 🔎 Key Observations
1. The BST property helps in efficient searching — elements in the left subtree are smaller, and elements in the right subtree are larger.
2. We can efficiently check for the sum using two approaches:
   - **Inorder Traversal + Two Pointers** (Optimal)
   - **HashSet Approach** (Easier but less efficient for space)

### Approach 1: Inorder Traversal + Two Pointers (Optimal)
1. Perform an **inorder traversal** to get the elements in sorted order.
2. Use the **two-pointer technique**:
   - One pointer at the **start** and one at the **end**.
   - Move the pointers based on the sum conditions:
     - If the sum is **less** than the target → Move the **left pointer** forward.
     - If the sum is **greater** than the target → Move the **right pointer** backward.
3. If two values match the target, return `true`.

### Approach 2: HashSet (Simpler but Less Efficient for Space)
1. Perform a **DFS traversal**.
2. For each node, check if `target - node.val` exists in the HashSet.
3. If yes, return `true`. Otherwise, add the current node value to the HashSet and continue.

---

## 🖥️ Java Code Implementation
### 🔹 Approach 1: Inorder Traversal + Two Pointers
```java
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class TwoSumBST {

    // Helper method to perform Inorder Traversal
    private void inorderTraversal(TreeNode root, List<Integer> values) {
        if (root == null) return;
        inorderTraversal(root.left, values);
        values.add(root.val);
        inorderTraversal(root.right, values);
    }

    public boolean findTarget(TreeNode root, int k) {
        List<Integer> values = new ArrayList<>();
        inorderTraversal(root, values);

        int left = 0, right = values.size() - 1;
        while (left < right) {
            int sum = values.get(left) + values.get(right);
            if (sum == k) return true;
            else if (sum < k) left++;
            else right--;
        }
        return false;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        TwoSumBST finder = new TwoSumBST();
        System.out.println("Target 27: " + finder.findTarget(root, 27)); // true (15 + 12)
        System.out.println("Target 30: " + finder.findTarget(root, 30)); // false
    }
}
```

---

### 🔹 Approach 2: HashSet Method (Alternative Solution)
```java
import java.util.*;

public class TwoSumBST_HashSet {

    public boolean findTarget(TreeNode root, int k) {
        HashSet<Integer> set = new HashSet<>();
        return dfs(root, set, k);
    }

    private boolean dfs(TreeNode node, HashSet<Integer> set, int k) {
        if (node == null) return false;
        if (set.contains(k - node.val)) return true;
        set.add(node.val);
        return dfs(node.left, set, k) || dfs(node.right, set, k);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(15);
        root.left = new TreeNode(10);
        root.right = new TreeNode(20);
        root.left.left = new TreeNode(8);
        root.left.right = new TreeNode(12);
        root.right.left = new TreeNode(17);
        root.right.right = new TreeNode(25);

        TwoSumBST_HashSet finder = new TwoSumBST_HashSet();
        System.out.println("Target 27: " + finder.findTarget(root, 27)); // true (15 + 12)
        System.out.println("Target 30: " + finder.findTarget(root, 30)); // false
    }
}
```

---

## 🧪 Dry Run
### Example BST:
```
       15
     /   \
    10    20
   / \    / \
  8  12  17  25
```
### Test Cases:
1. **Input:** Target = `27`  → **Output:** `true` (15 + 12)
2. **Input:** Target = `30`  → **Output:** `false`

---

## 📋 Complexity Analysis
| Approach                | Time Complexity | Space Complexity |
|-------------------------|------------------|------------------|
| Inorder + Two Pointers  | `O(n)`            | `O(n)`            |
| HashSet Approach         | `O(n)`            | `O(n)`            |

---









