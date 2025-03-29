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

