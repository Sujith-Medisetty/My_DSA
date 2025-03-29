```java
// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}
```

# Linked List Cycle Detection in Java

## Problem Statement
Given the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if some node can be reached again by continuously following the next pointer. Return `true` if there is a cycle; otherwise, return `false`.

### Constraints
- The number of nodes in the list is in the range [0, 10⁴].
- Node values are between [-10⁵, 10⁵].
- `pos` is either -1 (no cycle) or a valid index in the linked list.

---

## Solution 1: Using HashSet (Visited Node Tracking)
```java
import java.util.HashSet;

public class LinkedListCycleHashSet {

    public boolean hasCycle(ListNode head) {
        HashSet<ListNode> visited = new HashSet<>();

        ListNode current = head;
        while (current != null) {
            if (visited.contains(current)) {
                return true; // Cycle detected
            }
            visited.add(current);
            current = current.next;
        }
        return false; // No cycle
    }
}
```

### Pros of HashSet Approach
✅ Easy to understand and implement.  
✅ Useful when you're less concerned about memory constraints.  

### Cons of HashSet Approach
❗ **O(n) space complexity** — Since each visited node is stored, the space usage grows with the list size.  

---

## Solution 2: Using Fast and Slow Pointers (Optimal Approach)
```java
public class LinkedListCycle {

    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}
```

### Why Does Fast Catch Up to Slow?
- **Fast gains 1 step on Slow in each iteration.**
- If Fast is **one step behind** Slow in the current iteration, Fast will land **on Slow's position** in the next iteration.
- If Fast is **exactly on Slow's position**, they meet — cycle confirmed.  

---

## Comparison Table

| Aspect              | HashSet Approach | Fast & Slow Pointers |
|:--------------------|:----------------:|:---------------------:|
| **Time Complexity**  | O(n)              | O(n)                  |
| **Space Complexity** | O(n)              | O(1)                   |
| **Ease of Implementation** | Easier        | Slightly trickier       |
| **Optimal for Large Data** | ❌ No            | ✅ Yes                   |

# Add Two Numbers Represented as Linked Lists in Java

## Problem Statement
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

### Constraints
- The number of nodes in each linked list is in the range [1, 100].
- Each node's value is between **0** and **9**.
- The numbers represented by the linked lists **do not contain leading zeros**, except for the number `0` itself.

---

## Example 1:
**Input:** `l1 = [2,4,3]`, `l2 = [5,6,4]`  
**Output:** `[7,0,8]`  
**Explanation:** 342 + 465 = 807 (in reverse order).

## Example 2:
**Input:** `l1 = [0]`, `l2 = [0]`  
**Output:** `[0]`

## Example 3:
**Input:** `l1 = [9,9,9,9,9,9,9]`, `l2 = [9,9,9,9]`  
**Output:** `[8,9,9,9,0,0,0,1]`

---

## Code Implementation
```java
public class AddTwoNumbers {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // Dummy node to simplify logic
        ListNode current = dummy;         // Pointer to build the result list
        int carry = 0;                    // To track the carry value

        while (l1 != null || l2 != null) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;

            int sum = x + y + carry;      // Calculate sum of digits + carry
            carry = sum / 10;             // Carry for the next step

            current.next = new ListNode(sum % 10); // Create a new node with digit
            current = current.next;

            // Move to the next nodes if available
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        // If carry remains after the final iteration
        if (carry > 0) {
            current.next = new ListNode(carry);
        }

        return dummy.next; // Return the head of the resulting list
    }

    // Utility function to create linked list from array for testing
    public static ListNode createList(int[] values) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        for (int val : values) {
            current.next = new ListNode(val);
            current = current.next;
        }
        return dummy.next;
    }

    // Utility function to print linked list
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val + " ");
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        AddTwoNumbers solution = new AddTwoNumbers();

        ListNode l1 = createList(new int[]{2, 4, 3});
        ListNode l2 = createList(new int[]{5, 6, 4});
        ListNode result = solution.addTwoNumbers(l1, l2);
        System.out.print("Example 1 Output: ");
        printList(result); // Output: 7 0 8

        l1 = createList(new int[]{0});
        l2 = createList(new int[]{0});
        result = solution.addTwoNumbers(l1, l2);
        System.out.print("Example 2 Output: ");
        printList(result); // Output: 0

        l1 = createList(new int[]{9, 9, 9, 9, 9, 9, 9});
        l2 = createList(new int[]{9, 9, 9, 9});
        result = solution.addTwoNumbers(l1, l2);
        System.out.print("Example 3 Output: ");
        printList(result); // Output: 8 9 9 9 0 0 0 1
    }
}
```

# Merge Two Sorted Linked Lists in Java

## Problem Statement
You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one sorted linked list. The list should be made by **splicing together the nodes** of the first two lists.

### Constraints
- The number of nodes in both lists is in the range [0, 50].
- Node values are between **-100** and **100**.
- Both lists are sorted in **non-decreasing order**.

---

## Example 1:
**Input:** `list1 = [1,2,4]`, `list2 = [1,3,4]`  
**Output:** `[1,1,2,3,4,4]`

## Example 2:
**Input:** `list1 = []`, `list2 = []`  
**Output:** `[]`

## Example 3:
**Input:** `list1 = []`, `list2 = [0]`  
**Output:** `[0]`

---

## Code Implementation
```java
public class MergeSortedLists {

    // Function to merge two sorted linked lists
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1); // Dummy node to simplify logic
        ListNode current = dummy;          // Pointer to build the merged list

        // Iterate through both lists until one of them is exhausted
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next; // Move pointer in the merged list
        }

        // Append the remaining nodes from the non-exhausted list
        if (list1 != null) current.next = list1;
        if (list2 != null) current.next = list2;

        return dummy.next; // Return the merged sorted list
    }

    // Utility function to create linked list from array for testing
    public static ListNode createList(int[] values) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        for (int val : values) {
            current.next = new ListNode(val);
            current = current.next;
        }
        return dummy.next;
    }

    // Utility function to print linked list
    public static void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val + " ");
            head = head.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MergeSortedLists solution = new MergeSortedLists();

        ListNode list1 = createList(new int[]{1, 2, 4});
        ListNode list2 = createList(new int[]{1, 3, 4});
        ListNode result = solution.mergeTwoLists(list1, list2);
        System.out.print("Example 1 Output: ");
        printList(result); // Output: 1 1 2 3 4 4

        list1 = createList(new int[]{});
        list2 = createList(new int[]{});
        result = solution.mergeTwoLists(list1, list2);
        System.out.print("Example 2 Output: ");
        printList(result); // Output: []

        list1 = createList(new int[]{});
        list2 = createList(new int[]{0});
        result = solution.mergeTwoLists(list1, list2);
        System.out.print("Example 3 Output: ");
        printList(result); // Output: 0
    }
}
```

---

## Key Points
✅ Uses a **dummy node** to simplify logic and minimize edge cases.  
✅ Efficiently merges nodes by comparing values in `O(m + n)` time complexity.  
✅ Handles scenarios where one list is empty or one list has additional remaining nodes.  

```java
// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Reverse Linked List in Java

## Problem Statement
1. **Reverse Entire List:** Given the head of a singly linked list, reverse the list and return the new head.
2. **Reverse a Subsection:** Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes from position `left` to position `right` in one pass and return the modified list.

### Solution Explanation
### 1. Reverse Entire List (Iterative Approach)
```java
public class ReverseLinkedList {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}
```

### 2. Reverse a Subsection of the List (One Pass Approach)
```java
public class ReverseLinkedListII {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left == right) return head;

        ListNode dummy = new ListNode(0);  // Dummy node for easier head manipulation
        dummy.next = head;
        ListNode prev = dummy;

        // Step 1: Move `prev` pointer to the node before the reversal starts
        for (int i = 0; i < left - 1; i++) {
            prev = prev.next;
        }

        // Step 2: Pointers to start reversing the segment
        ListNode start = prev.next;
        ListNode then = start.next;

        // Step 3: Reverse nodes between left and right
        for (int i = 0; i < right - left; i++) {
            start.next = then.next;
            then.next = prev.next;
            prev.next = then;
            then = start.next;
        }

        return dummy.next;
    }
}
```

### Dry Run for `reverseBetween`
**Input:** `[1, 2, 3, 4, 5]`, `left = 2`, `right = 4`

**Step 1:** Identify pointers
- `prev` points to node `1` (before position `left`).
- `start` points to node `2` (start of reversal section).
- `then` points to node `3` (node next to `start`).

**Step 2:** Start reversing nodes
- **Iteration 1:** Reverse `2` and `3` → List becomes `[1, 3, 2, 4, 5]`
- **Iteration 2:** Reverse `2` and `4` → List becomes `[1, 4, 3, 2, 5]`

**Step 3:** Return the updated list.

### Key Insights
- **Dummy Node:** Ensures easier edge case handling when reversing from the head.
- **Efficient One-Pass Solution:** Reduces complexity by directly modifying pointers.

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Reverse Nodes in k-Group

## Problem Statement
Given the head of a linked list, reverse the nodes of the list `k` at a time, and return the modified list.
- `k` is a positive integer and is less than or equal to the length of the linked list.
- If the number of nodes is not a multiple of `k`, the remaining nodes should remain as they are.

### Example
**Input:** head = [1, 2, 3, 4, 5], k = 2  
**Output:** [2, 1, 4, 3, 5]  

**Input:** head = [1, 2, 3, 4, 5], k = 3  
**Output:** [3, 2, 1, 4, 5]  

---

## Code Implementation
```java
public class ReverseKGroup {
    public ListNode reverseKGroup(ListNode head, int k) {
        if (head == null || k == 1) return head;

        ListNode dummy = new ListNode(0);  // Dummy node for easier manipulation
        dummy.next = head;
        ListNode prevGroupEnd = dummy;

        while (true) {
            // Step 1: Check if there are at least k nodes to reverse
            ListNode kthNode = prevGroupEnd;
            for (int i = 0; i < k; i++) {
                kthNode = kthNode.next;
                if (kthNode == null) return dummy.next; // Fewer than k nodes remain
            }

            // Step 2: Reverse the k nodes
            ListNode groupStart = prevGroupEnd.next;
            ListNode curr = groupStart;
            ListNode next = null;
            ListNode prev = kthNode.next; // Marks the node after the group

            for (int i = 0; i < k; i++) {
                next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }

            // Step 3: Connect the reversed group to the previous part
            prevGroupEnd.next = prev;
            prevGroupEnd = groupStart;
        }
    }

    // Utility function to print the linked list
    public void printList(ListNode head) {
        while (head != null) {
            System.out.print(head.val + " -> ");
            head = head.next;
        }
        System.out.println("null");
    }
}
```

---

## Approach
1. **Identify Groups:** Traverse the list to check if there are at least `k` nodes in the current group. If not, return the list as it is.
2. **Reverse the Group:** Use a loop to reverse the `k` nodes in the group.
3. **Reconnect Groups:** After reversing, link the reversed segment back to the previous and next parts of the list.

---

## Dry Run
**Input:** `[1, 2, 3, 4, 5]`, `k = 2`

**Step 1:** Initial List: `1 -> 2 -> 3 -> 4 -> 5`
- First Group to Reverse: `[1, 2]`
- After Reversing First Group: `2 -> 1 -> 3 -> 4 -> 5`

**Step 2:** Second Group to Reverse: `[3, 4]`
- After Reversing Second Group: `2 -> 1 -> 4 -> 3 -> 5`

**Step 3:** Remaining Node `[5]` (fewer than `k` nodes, remain as is)

**Final Output:** `[2, 1, 4, 3, 5]`

---

## Key Insights
✅ Efficient O(n) solution with in-place reversal.  
✅ Handles both complete `k` groups and remaining nodes elegantly.  
✅ Uses a `dummy` node for easier head manipulation.  

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Remove Nth Node from End of List

## Problem Statement
Given the head of a linked list, remove the `nth` node from the end of the list and return its head.

### Approach
We can achieve this in **one pass** using the **two-pointer technique**:

### Code Implementation
```java
public class RemoveNthNodeFromEnd {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode first = dummy;
        ListNode second = dummy;

        // Move `first` pointer n+1 steps ahead
        for (int i = 0; i <= n; i++) {
            first = first.next;
        }

        // Move both pointers until `first` reaches the end
        while (first != null) {
            first = first.next;
            second = second.next;
        }

        // Delete the nth node
        second.next = second.next.next;

        return dummy.next;
    }
}
```

### Dry Run
**Input:** `[1, 2, 3, 4, 5]`, `n = 2`

**Step 1:** Initialize pointers
- `first` and `second` both start at dummy (before head).

**Step 2:** Move `first` pointer `n + 1 = 3` steps ahead
- After 3 steps, `first` points to node `3`.

**Step 3:** Move both pointers
- After moving both pointers step by step, `first` reaches `null`, and `second` points to node `3`.

**Step 4:** Remove the node
- `second.next = second.next.next` effectively skips node `4`.

**Final Output:** `[1, 2, 3, 5]`

### Key Insights
✅ Efficient one-pass solution.
✅ Handles edge cases like removing the head node.
✅ Uses constant space (O(1) extra memory).

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Remove Duplicates from Sorted List II

## Problem Statement
Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

### Approach
To remove duplicates efficiently:

1. **Dummy Node:** Create a `dummy` node that points to the head. This simplifies edge cases like when the head itself needs to be removed.
2. **Pointer Tracking:** Use a pointer `prev` starting from the dummy node.
3. **Iterate Through the List:**
   - If you detect duplicates, skip all nodes with that value.
   - Otherwise, move the `prev` pointer forward.
4. **Return Result:** Return `dummy.next` as the updated head.

### Code Implementation
```java
public class RemoveDuplicatesFromSortedListII {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) return null;

        ListNode dummy = new ListNode(0); // Dummy node to simplify head manipulation
        dummy.next = head;
        ListNode prev = dummy;

        while (head != null) {
            if (head.next != null && head.val == head.next.val) {
                // Skip all nodes with duplicate value
                while (head.next != null && head.val == head.next.val) {
                    head = head.next;
                }
                prev.next = head.next; // Skip the entire sequence of duplicates
            } else {
                prev = prev.next; // Move prev pointer forward
            }
            head = head.next; // Move head pointer forward
        }
        return dummy.next;
    }
}
```

### Dry Run
**Input:** `[1, 2, 3, 3, 4, 4, 5]`

**Step 1:** Initialize pointers
- `dummy` points to node `1`
- `prev` points to `dummy`
- `head` starts at node `1`

**Step 2:** Traverse through the list
- Node `1` → No duplicate → `prev` moves forward
- Node `2` → No duplicate → `prev` moves forward
- Node `3` → Duplicate found → Skip both `3`s
- Node `4` → Duplicate found → Skip both `4`s
- Node `5` → No duplicate → `prev` moves forward

**Step 3:** Return result
**Final Output:** `[1, 2, 5]`

### Key Insights
✅ Efficient solution with **O(n)** time complexity.
✅ Uses constant space except for the dummy node.
✅ Ensures only unique elements are retained in sorted order.

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Rotate List

## Problem Statement
Given the head of a linked list, rotate the list to the right by `k` places.

### Approach
To efficiently rotate the linked list:

1. **Handle Edge Cases:** If `head` is `null` or `k` is zero, return the `head` as-is.
2. **Count the Length:** Traverse the list to calculate its length (`n`).
3. **Optimize `k`:** Since rotating `n` times results in the same list, compute `k = k % n`.
4. **Connect the List in a Circular Manner:** Make the list circular by linking the last node to the head.
5. **Find the New Tail:** Traverse `(n - k)` steps to find the new tail. The new head will be `newTail.next`.
6. **Break the Circle:** Set `newTail.next` to `null`.

### Code Implementation
```java
public class RotateList {
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || head.next == null || k == 0) return head;

        // Step 1: Count the length of the list
        ListNode curr = head;
        int length = 1; // Start from 1 since we are already at head
        while (curr.next != null) {
            curr = curr.next;
            length++;
        }

        // Step 2: Form a circular list
        curr.next = head;

        // Step 3: Find the new tail (n - k % n - 1) and new head (n - k % n)
        k = k % length;
        int stepsToNewTail = length - k;
        curr = head;
        for (int i = 1; i < stepsToNewTail; i++) {
            curr = curr.next;
        }

        // Step 4: Break the circle
        ListNode newHead = curr.next;
        curr.next = null;

        return newHead;
    }
}
```

### Dry Run
**Input:** `[1, 2, 3, 4, 5]`, `k = 2`

**Step 1:** Count the length: `n = 5`

**Step 2:** Form a circular list:
```
1 → 2 → 3 → 4 → 5 → [back to 1]
```

**Step 3:** Identify the new head and tail
- `k % n = 2`
- Steps to new tail = `5 - 2 = 3`
- After 3 steps, new tail = `3`, new head = `4`

**Step 4:** Break the circle at node `3`
**Output:** `[4, 5, 1, 2, 3]`

### Key Insights
✅ Efficient O(n) time complexity.
✅ Utilizes constant O(1) extra space.
✅ Properly handles edge cases like `k = 0` or `head = null`.

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

# Partition List

## Problem Statement
Given the head of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`.

You should preserve the original relative order of the nodes in each of the two partitions.

## Approach
1. **Create Two Dummy Lists:**
   - `before` list for nodes with values less than `x`.
   - `after` list for nodes with values greater than or equal to `x`.
2. **Iterate Through the Original List:**
   - Append nodes to their respective lists based on their values.
3. **Connect the Two Lists:**
   - The `before` list’s last node should point to the `after` list’s first node.
   - Ensure the end of the `after` list points to `null` to terminate the list.
4. **Return the New Head:**
   - The new head is `beforeHead.next` since `beforeHead` is a dummy node.

## Code Implementation
```java
public class PartitionList {
    public ListNode partition(ListNode head, int x) {
        ListNode beforeHead = new ListNode(0);
        ListNode before = beforeHead;
        ListNode afterHead = new ListNode(0);
        ListNode after = afterHead;

        while (head != null) {
            if (head.val < x) {
                before.next = head;
                before = before.next;
            } else {
                after.next = head;
                after = after.next;
            }
            head = head.next;
        }

        // End the after list
        after.next = null;
        // Connect before and after lists
        before.next = afterHead.next;

        return beforeHead.next;
    }
}
```

## Dry Run
**Input:** `[1, 4, 3, 2, 5, 2]`, `x = 3`

**Step 1:** Creating Dummy Lists:
```
Before List: []
After List:  []
```

**Step 2:** Iterating through the list:
- Encounter `1` → Add to `before` list.
- Encounter `4` → Add to `after` list.
- Encounter `3` → Add to `after` list.
- Encounter `2` → Add to `before` list.
- Encounter `5` → Add to `after` list.
- Encounter `2` → Add to `before` list.

**Step 3:** Connecting Lists:
```
Before List: [1 → 2 → 2]
After List: [4 → 3 → 5]
Final List: [1 → 2 → 2 → 4 → 3 → 5]
```

## Key Insights
✅ Efficient O(n) time complexity.  
✅ Preserves the original relative order of nodes.  
✅ Simple and intuitive approach using two dummy nodes.  
